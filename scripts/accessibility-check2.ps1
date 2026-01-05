# Heuristic accessibility checks for static HTML files (improved, simpler quoting)
$root = Get-Location
$out = @()

$files = Get-ChildItem -Path $root -Filter *.html -Recurse
foreach ($f in $files) {
    $text = Get-Content $f.FullName -Raw
    $issues = @()

    # 1. lang attribute
    if ($text -notmatch '(?is)<html[^>]*\blang\s*=') { $issues += 'Missing lang attribute on html element' }

    # 2. img alt checks
    $imgTags = [regex]::Matches($text, '(?is)<img\b[^>]*>')
    foreach ($tag in $imgTags) {
        $tagText = $tag.Value
        if ($tagText -notmatch '\balt\s*=') { $issues += 'img missing alt attribute: ' + $tagText }
        elseif ($tagText -match '\balt\s*=\s*"([^"]*)"') { if ($matches[1].Trim() -eq '') { $issues += 'img has empty alt attribute: ' + $tagText } }
        elseif ($tagText -match "\balt\s*=\s*'([^']*)'") { if ($matches[1].Trim() -eq '') { $issues += 'img has empty alt attribute: ' + $tagText } }
    }

    # 3. links with target=_blank should include rel=noopener
    $aTags = [regex]::Matches($text, '(?is)<a\b[^>]*>')
    foreach ($a in $aTags) {
        $aText = $a.Value
        if (($aText -match '(?i)\btarget\b') -and ($aText -match '_blank')) {
            if ($aText -notmatch '\brel\s*=') { $issues += 'link with target=_blank missing rel attribute: ' + $aText }
            elseif ($aText -notmatch 'noopener') { $issues += 'link with target=_blank missing noopener: ' + $aText }
        }
    }

    # 4. inputs with id should have labels or aria/title
    $inputTags = [regex]::Matches($text, '(?is)<input\b[^>]*>')
    foreach ($inp in $inputTags) {
        $tag = $inp.Value
        if ($tag -match '\bid\s*=\s*([^>\s]+)') {
            $id = $matches[1].Trim("'\"")
            $labelPattern = '(?is)<label\b[^>]*\bfor\s*=\s*' + [regex]::Escape($id)
            if ($text -notmatch $labelPattern) {
                if ($tag -notmatch 'aria-label' -and $tag -notmatch 'title') { $s = 'input id='; $s += $id; $s += ' has no label or aria/title'; $issues += $s }
            }
        }
    }

    # 5. buttons without accessible name
    $buttonTags = [regex]::Matches($text, '(?is)<button\b[^>]*>(.*?)</button>')
    foreach ($btn in $buttonTags) {
        $inner = $btn.Groups[1].Value.Trim()
        $btnTag = $btn.Value
        if ($inner -eq '' -and $btnTag -notmatch 'aria-label' -and $btnTag -notmatch 'title') { $issues += 'button without accessible name or aria-label: ' + $btnTag }
    }

    # 6. headings: check presence of h1
    if ($text -notmatch '(?is)<h1\b') { $issues += 'Missing h1 heading' }

    $out += [PSCustomObject]@{
        file = $f.FullName
        issues = $issues
        issueCount = $issues.Count
    }
}

# Write report
$reportPath = Join-Path $root 'scripts\accessibility-report.json'
$out | ConvertTo-Json -Depth 5 | Out-File -FilePath $reportPath -Encoding UTF8
Write-Output "Accessibility check completed. Report: $reportPath"
$summary = $out | Sort-Object -Property issueCount -Descending | Select-Object file,issueCount
$summary | Format-Table -AutoSize

# Print file details
$out | Where-Object { $_.issueCount -gt 0 } | ForEach-Object {
    Write-Output "`nFile: $($_.file) - Issues: $($_.issueCount)"
    $_.issues | ForEach-Object { Write-Output (' - {0}' -f $_) }
}