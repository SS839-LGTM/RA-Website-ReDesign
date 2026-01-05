# Very simple heuristic accessibility checks for static HTML files
$root = Get-Location
$out = @()

$files = Get-ChildItem -Path $root -Filter *.html -Recurse
foreach ($f in $files) {
    $text = Get-Content $f.FullName -Raw
    $issues = @()

    if ($text -notmatch '(?is)<html[^>]*\blang\s*=') { $issues += 'Missing lang attribute on html element' }
    if ($text -notmatch '(?is)<h1\b') { $issues += 'Missing h1 heading' }

    # img tags - simple: check for alt= inside each img tag
    $imgTags = [regex]::Matches($text, '(?is)<img\b[^>]*>')
    foreach ($img in $imgTags) {
        $t = $img.Value
        if ($t -notmatch '\balt\s*=') { $issues += 'img missing alt attribute: ' + $t }
    }

    # links targeting _blank
    $aTags = [regex]::Matches($text, '(?is)<a\b[^>]*>')
    foreach ($a in $aTags) {
        $t = $a.Value
        if ($t -match '_blank') {
            if ($t -notmatch '\brel\s*=') { $issues += 'link with target=_blank missing rel attribute: ' + $t }
        }
    }

    # buttons: naive check for empty button tags
    $buttonTags = [regex]::Matches($text, '(?is)<button\b[^>]*>(.*?)</button>')
    foreach ($b in $buttonTags) {
        $inner = $b.Groups[1].Value.Trim()
        if ($inner -eq '') { $issues += 'button without accessible name or content: ' + $b.Value }
    }

    $out += [PSCustomObject]@{ file = $f.FullName; issues = $issues; issueCount = $issues.Count }
}

# Write report
$reportPath = Join-Path $root 'scripts\accessibility-report.json'
$out | ConvertTo-Json -Depth 5 | Out-File -FilePath $reportPath -Encoding UTF8
Write-Output "Accessibility check completed. Report: $reportPath"
$summary = $out | Sort-Object -Property issueCount -Descending | Select-Object file,issueCount
$summary | Format-Table -AutoSize

$out | Where-Object { $_.issueCount -gt 0 } | ForEach-Object {
    Write-Output "`nFile: $($_.file) - Issues: $($_.issueCount)"
    $_.issues | ForEach-Object { Write-Output (' - {0}' -f $_) }
}