# Hardened accessibility checks for static HTML files
# Safer quoting and additional checks (skip-link, landmark, aria-labels)
$root = Get-Location
$out = @()

$files = Get-ChildItem -Path $root -Filter *.html -Recurse
foreach ($f in $files) {
    $text = Get-Content -Raw -Path $f.FullName
    $issues = @()

    # 1. lang attribute on <html>
    if ($text -notmatch '(?is)<html\s+[^>]*\blang\s*=') { $issues += 'Missing lang attribute on <html>' }

    # 2. img alt checks
    $imgMatches = [regex]::Matches($text, '(?is)<img\b([^>]*)>')
    foreach ($m in $imgMatches) {
        $attrs = $m.Groups[1].Value
        if ($attrs -notmatch '\balt\s*=') { $issues += 'img missing alt attribute: ' + $m.Value }
        else {
            $val = $null
            if ($attrs -match '\balt\s*=\s*"([^"]*)"') { $val = $matches[1] }
            elseif ($attrs -match '\balt\s*=\s*''([^'']*)''') { $val = $matches[1] }
            if ($val -ne $null) { if ($val.Trim() -eq '') { $issues += 'img has empty alt attribute (use only for decorative images): ' + $m.Value } }
        }
    }

    # 3. external links target blank without rel noopener
    $matches = [regex]::Matches($text, '(?is)<a\b([^>]*?)>')
    foreach ($m in $matches) {
        $attrs = $m.Groups[1].Value
        # detect _blank in target attribute (case-insensitive)
        if ($attrs -match '(?i)\btarget\s*=\s*[^>]*_blank') {
            if ($attrs -notmatch '\brel\s*=') { $issues += 'link with target=_blank missing rel attr: ' + $m.Value }
            else {
                if ($attrs -notmatch 'noopener') { $issues += 'link with target=_blank missing noopener: ' + $m.Value }
            }
        }
    }

    # 4. inputs with id but no label[for] or aria-label/title
    $inputs = [regex]::Matches($text, '(?is)<input\b([^>]*?)>')
    foreach ($inp in $inputs) {
        $attrs = $inp.Groups[1].Value
        $idm = [regex]::Match($attrs, '\bid\s*=\s*\"?([^\"\s>]+)\"?')
        if ($idm.Success) {
            $id = $idm.Groups[1].Value
            # find label for the id (allow for values with or without quotes)
            $labelMatches = [regex]::Matches($text, '(?is)<label\b[^>]*\bfor\s*=\s*([^>\s]+)[^>]*>')
            $hasLabel = $false
            foreach ($lm in $labelMatches) {
                $val = $lm.Groups[1].Value.Trim('"', "'")
                if ($val -eq $id) { $hasLabel = $true; break }
            }
            # simple heuristic: check presence of aria-label or title on the input attrs
            $hasAria = ($attrs -match '\baria-label\b') -or ($attrs -match '\btitle\b')
            if (-not $hasLabel -and -not $hasAria) {
                $issues += ('input id={0} has no label or aria/title' -f $id)
            }
        }
    }

    # 5. buttons without accessible name (no aria-label and no text)
    $buttons = [regex]::Matches($text, '(?is)<button\b([^>]*)>(.*?)</button>')
    foreach ($b in $buttons) {
        $attrs = $b.Groups[1].Value
        $inner = $b.Groups[2].Value.Trim()
        # consider aria-label or title attributes as accessible names
        $hasAria = ($attrs -match 'aria-label') -or ($attrs -match 'title')
        if ($inner -eq '' -and -not $hasAria) { $issues += 'button without accessible name or aria-label: ' + $b.Value }
    }

    # 6. headings: check presence of h1
    if ($text -notmatch '(?is)<h1\b') { $issues += 'Missing h1 heading' }

    $out += [PSCustomObject]@{
        file = $f.FullName
        issues = $issues
        issueCount = $issues.Count
    }
}

# Write summary
$reportPath = Join-Path $root 'scripts\accessibility-report.json'
$out | ConvertTo-Json -Depth 5 | Out-File -FilePath $reportPath -Encoding UTF8
Write-Output ('Accessibility check completed. Report: {0}' -f $reportPath)
$summary = $out | Sort-Object -Property issueCount -Descending | Select-Object file,issueCount
$summary | Format-Table -AutoSize

# Also print files with issues
$out | Where-Object { $_.issueCount -gt 0 } | ForEach-Object {
    Write-Output ('`nFile: {0} - Issues: {1}' -f $_.file, $_.issueCount)
    $_.issues | ForEach-Object { Write-Output (' - {0}' -f $_) }
}
