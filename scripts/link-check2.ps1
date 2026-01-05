$errors = @()
Get-ChildItem -Path . -Recurse -Filter '*.html' | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content -Raw -LiteralPath $file
    $parts = $content -split 'href='
    for ($i = 1; $i -lt $parts.Count; $i++) {
        $s = $parts[$i].TrimStart()
        if ($s.Length -eq 0) { continue }
        $first = $s.Substring(0,1)
        if ($first -eq '"' -or $first -eq "'") {
            $quote = $first
            $end = $s.IndexOf($quote,1)
            if ($end -gt 0) {
                $href = $s.Substring(1, $end - 1)
            } else { continue }
        } else { continue }

        # Skip externals
        if ($href -match '^(http|https):') { continue }
        if ($href -match '^mailto:') { continue }

        if ($href -eq '#') {
            $errors += [pscustomobject]@{ File=$file; Href=$href; Issue='Placeholder # href' }
            continue
        }

        if ($href.StartsWith('#')) {
            $anchor = $href.TrimStart('#')
            if (-not ($content -match "id=\"$anchor\"" -or $content -match "id='$anchor'" -or $content -match "name=\"$anchor\"" -or $content -match "name='$anchor'")) {
                $errors += [pscustomobject]@{ File=$file; Href=$href; Issue='Missing anchor in same file' }
            }
            continue
        }

        if ($href -match '#') {
            $ps = $href -split '#'
            $target = $ps[0]; $anchor = $ps[1]
            $targetPath = Join-Path -Path (Split-Path -Path $file -Parent) -ChildPath $target
            if (-not (Test-Path $targetPath)) {
                $errors += [pscustomobject]@{ File=$file; Href=$href; Issue='Target file not found' }
            } else {
                $tcontent = Get-Content -Raw -LiteralPath $targetPath
                if (-not ($tcontent -match "id=\"$anchor\"" -or $tcontent -match "id='$anchor'" -or $tcontent -match "name=\"$anchor\"" -or $tcontent -match "name='$anchor'")) {
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
if ($errors.Count -eq 0) { Write-Output 'No internal link errors found.' } else { $errors | Sort-Object File | Format-Table -AutoSize }
