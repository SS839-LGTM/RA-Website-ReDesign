# Crawl RA procurement pages, download all linked PDFs to assets/forms, and update local pages to link to local copies
$cwd = (Get-Location).Path
$outDir = Join-Path $cwd 'assets\forms'
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

$pages = @(
  'https://www.ra.org.na/legislation',
  'https://www.ra.org.na/procurement-plan',
  'https://www.ra.org.na/open-bids',
  'https://www.ra.org.na/register',
  'https://www.ra.org.na/awards'
)

$all = @()
foreach ($page in $pages) {
  try {
    Write-Output "Fetching $page"
    $r = Invoke-WebRequest -Uri $page -UseBasicParsing -ErrorAction Stop
    $content = $r.Content
    $hrefs = @()

    # Regex extraction for .pdf urls (absolute and relative)
    $matchesAbs = [regex]::Matches($content,'(https?://\S+?\.pdf)','IgnoreCase')
    foreach ($m in $matchesAbs) { $hrefs += $m.Groups[1].Value }
    $matchesRel = [regex]::Matches($content,'(/\S+?\.pdf)','IgnoreCase')
    foreach ($m in $matchesRel) { $hrefs += $m.Groups[1].Value }

    # Also use parsed links from Invoke-WebRequest as a fallback
    if ($r.Links) {
      $r.Links | ForEach-Object { if ($_.href -and $_.href -match '\.pdf') { $hrefs += $_.href } }
    }

    $hrefs = $hrefs | Where-Object { $_ } | Select-Object -Unique
    foreach ($h in $hrefs) {
      $abs = $h
      if ($abs -notmatch '^https?://') {
        try { $abs = (New-Object System.Uri((New-Object System.Uri($page)), $h)).AbsoluteUri } catch { continue }
      }
      $all += $abs
    }
  } catch {
    Write-Warning ("Failed to fetch {0} - {1}" -f $page, $_)
  }
}

$all = $all | Select-Object -Unique

$results = @()
$i = 1
foreach ($url in $all) {
  try {
    $uri = [Uri]$url
    $leaf = [System.IO.Path]::GetFileName($uri.LocalPath)
    if (-not $leaf) { $leaf = "file_$i.pdf" }
    $safe = ($leaf -replace '[^\w\.\-]','_')
    $target = Join-Path $outDir $safe
    if (-not (Test-Path $target)) {
      Write-Output "Downloading $url -> $safe"
      Invoke-WebRequest -Uri $url -OutFile $target -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop
    } else {
      Write-Output "Already exists: $safe"
    }
    $results += [PSCustomObject]@{ url=$url; file=$safe; path=(Join-Path 'assets/forms' $safe); status='downloaded' }
  } catch {
    Write-Warning ("Failed to download {0} - {1}" -f $url, $_)
    $results += [PSCustomObject]@{ url=$url; file=$null; path=$null; status='failed'; reason=$_.Exception.Message }
  }
  $i++
}

# Save results
$results | ConvertTo-Json -Depth 4 | Out-File -FilePath ".\scripts\download-procurement-results.json" -Encoding UTF8
Write-Output "Download complete. Results written to scripts\download-procurement-results.json"

# Update local procurement pages to point to local copies when possible
$pagesLocal = @('legislation.html','procurement-plan.html','open-bids.html','register.html','awards.html')
foreach ($page in $pagesLocal) {
  if (Test-Path $page) {
    Write-Output "Updating links in $page"
    $text = Get-Content -Raw -Path $page
    foreach ($r in $results) {
      if ($r.status -eq 'downloaded' -and $r.url) {
        $oldEscaped = [regex]::Escape($r.url)
        if ($text -match [regex]::Escape($r.url)) {
          $text = $text -replace $oldEscaped, $r.path
        }
      }
    }
    Set-Content -Path $page -Value $text -Encoding UTF8
  }
}

Write-Output "Link updates complete."

# Summary to console
$downloaded = $results | Where-Object { $_.status -eq 'downloaded' }
$failed = $results | Where-Object { $_.status -ne 'downloaded' }
Write-Output "Downloaded: $($downloaded.Count) files. Failed: $($failed.Count)"
$results | Select-Object url,file,status | Format-Table -AutoSize
