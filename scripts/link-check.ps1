$errors = @()
Get-ChildItem -Path . -Recurse -Filter '*.html' | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content -Raw -LiteralPath $file
    $re = [regex] 'href\s*=\s*["\']([^"\']+)["\']'
    foreach ($m in $re.Matches($content)) {
        $href = $m.Groups[1].Value
        if ($href -match '^(http|https):') { continue }
        if ($href -match '^mailto:') { continue }
        if ($href -eq '#') {
            $errors += [pscustomobject]@{ File=$file; Href=$href; Issue='Placeholder # href' }
            continue
        }
        if ($href -match '^#') {
            $anchor = $href.TrimStart('#')
            if (-not ($content -match "[\s>](?:id|name)\s*=\s*['\"]$anchor['\"]")) {
                $errors += [pscustomobject]@{ File=$file; Href=$href; Issue='Missing anchor in same file' }
            }
            continue
        }
        if ($href -match '#') {
            $parts = $href -split '#'
            $target = $parts[0]
            $anchor = $parts[1]
            $targetPath = Join-Path -Path (Split-Path -Path $file -Parent) -ChildPath $target
            if (-not (Test-Path -Path $targetPath)) {
                $errors += [pscustomobject]@{ File=$file; Href=$href; Issue='Target file not found' }
            } else {
                $tcontent = Get-Content -Raw -LiteralPath $targetPath
                if (-not ($tcontent -match "[\s>](?:id|name)\s*=\s*['\"]$anchor['\"]")) {
                    $errors += [pscustomobject]@{ File=$file; Href=$href; Issue='Anchor missing in target file' }
                }
            }
            continue
        }
        $targetPath = Join-Path -Path (Split-Path -Path $file -Parent) -ChildPath $href
        if (-not (Test-Path -Path $targetPath)) {
            $errors += [pscustomobject]@{ File=$file; Href=$href; Issue='Target file not found' }
        }
    }
}
if ($errors.Count -eq 0) {
    Write-Output 'No internal link errors found.'
} else {
    $errors | Sort-Object File | Format-Table -AutoSize
}
