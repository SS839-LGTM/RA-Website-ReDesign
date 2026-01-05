# Enhanced downloader: retries, candidate URL normalization, and filename search across pages
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

$logPath = Join-Path $cwd 'scripts\download-procurement-retry.log'
function Log($s) { $s | Out-File -FilePath $logPath -Append -Encoding UTF8; Write-Output $s }

# Fetch pages and collect content
$pageContents = @{}
foreach ($p in $pages) {
  try { Log "Fetching $p"; $r = Invoke-WebRequest -Uri $p -UseBasicParsing -ErrorAction Stop; $pageContents[$p] = $r.Content } catch { Log ("Failed to fetch page {0}: {1}" -f $p, $_.Exception.Message); $pageContents[$p] = '' }
}

# Extract PDF urls and filenames
$all = @()
foreach ($content in $pageContents.Values) {
  if (-not $content) { continue }
  $matchesAbs = [regex]::Matches($content,'(https?://[^"''\s>]+?\.pdf)','IgnoreCase')
  foreach ($m in $matchesAbs) { $all += $m.Groups[1].Value }
  $matchesRel = [regex]::Matches($content,'((?:/|\.\./)[^"''\s>]+?\.pdf)','IgnoreCase')
  foreach ($m in $matchesRel) { $all += $m.Groups[1].Value }
  # AttachmentFiles('filename.pdf') patterns
  $matchesAtt = [regex]::Matches($content,"AttachmentFiles\('\s*([^'\)]+?\.pdf)\s*'\)", 'IgnoreCase')
  foreach ($m in $matchesAtt) { $all += $m.Groups[1].Value }
}
$all = $all | Where-Object { $_ } | Select-Object -Unique

# Normalize: make absolute URLs when possible (guess base for relative)
$absoluteList = @()
foreach ($h in $all) {
  if ($h -match '^https?://') { $absoluteList += $h; continue }
  # try to make absolute using site root
  try {
    $abs = (New-Object System.Uri((New-Object System.Uri('https://www.ra.org.na/')), $h)).AbsoluteUri
    $absoluteList += $abs
  } catch {
    # fallback: try simple joining
    $absoluteList += ('https://www.ra.org.na/' + ($h -replace '^/',''))
  }
}
$absoluteList = $absoluteList | Select-Object -Unique

# helper: try download candidate url with retries
function Try-Download($url, $target, [int]$retries=3) {
  $attempt=1
  while ($attempt -le $retries) {
    try {
      # Use a desktop-like user agent
      $headers = @{ 'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'; }
      Invoke-WebRequest -Uri $url -OutFile $target -Headers $headers -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop
      return @{ ok=$true; url=$url; attempt=$attempt }
    } catch {
      Log ("Attempt {0} failed for {1}: {2}" -f $attempt, $url, $_.Exception.Message)
      Start-Sleep -Seconds (2 * $attempt)
      $lastEx = $_.Exception.Message
      $attempt++
    }
  }
  return @{ ok=$false; url=$url; attempt=$attempt-1; reason=$lastEx }
}

try {
  $results = @()
  $i = 1
  foreach ($url in $absoluteList) {
    try {
      $uri = $null
      try { $uri = [Uri]$url } catch { }
      $leaf = if ($uri) { [System.IO.Path]::GetFileName($uri.LocalPath) } else { (Split-Path $url -Leaf) }
      if (-not $leaf) { $leaf = "file_$i.pdf" }
      $safe = ($leaf -replace '[^\w\.-]','_')
      $target = Join-Path $outDir $safe

      if (Test-Path $target) {
        Log "Already exists: $safe"
        $results += [PSCustomObject]@{ url=$url; candidate=$url; file=$safe; path=(Join-Path 'assets/forms' $safe); status='exists' }
        $i++ ; continue
      }

      Log "Attempting $url -> $safe"
      $candidates = @($url)

      # Add escaped/unescaped variants
      try { $candidates += [Uri]::EscapeUriString($url) } catch {}
      try { $candidates += [Uri]::UnescapeDataString($url) } catch {}

      # If URL looks like AttachmentFiles(...) or contains a filename, try to find alternative hrefs in page contents
      $filename = $leaf
      if ($filename -and $filename -match '\.pdf$') {
        foreach ($content in $pageContents.Values) {
          if ($content -match [regex]::Escape($filename)) {
            # try to find occurrences of the filename and extract a nearby href
            $idx = $content.IndexOf($filename, [StringComparison]::InvariantCultureIgnoreCase)
            while ($idx -ge 0) {
              $start = [Math]::Max(0, $idx - 200)
              $len = [Math]::Min(400, $content.Length - $start)
              $snippet = $content.Substring($start, $len)
              # find the nearest href= before the filename and extract the quoted href
              $hpos = $snippet.LastIndexOf('href=', [Math]::Max(0, $idx - $start), [StringComparison]::InvariantCultureIgnoreCase)
              if ($hpos -ge 0) {
                $idxDouble = $snippet.IndexOf('\"', $hpos + 5)
                $idxSingle = $snippet.IndexOf("'", $hpos + 5)
                $startQuoteIdx = -1
                if ($idxDouble -ge 0 -and ($idxSingle -lt 0 -or $idxDouble -lt $idxSingle)) { $startQuoteIdx = $idxDouble } elseif ($idxSingle -ge 0) { $startQuoteIdx = $idxSingle }
                if ($startQuoteIdx -ge 0) {
                  $quoteChar = $snippet[$startQuoteIdx]
                  $endQuoteIdx = $snippet.IndexOf($quoteChar, $startQuoteIdx + 1)
                  if ($endQuoteIdx -gt $startQuoteIdx) {
                    $href = $snippet.Substring($startQuoteIdx + 1, $endQuoteIdx - $startQuoteIdx - 1)
                    if ($href -match [regex]::Escape($filename)) { $candidates += $href; break }
                  }
                }
              }
              $idx = $content.IndexOf($filename, $idx + $filename.Length, [StringComparison]::InvariantCultureIgnoreCase)
            }
          }
        }
        # also try site-root candidate paths
        $candidates += ('https://www.ra.org.na/documents/' + $filename)
        $candidates += ('https://www.ra.org.na/media/' + $filename)
        $candidates += ('https://www.ra.org.na/Downloads/' + $filename)
        $candidates += ('https://www.ra.org.na/cms/Lists/Procurement%20Opportunities/Attachments/' + $i + '/' + $filename)
      }

      $candidates = $candidates | Where-Object { $_ } | Select-Object -Unique

      $downloaded = $false
      $attempted = @()
      foreach ($c in $candidates) {
        # normalize relative candidate
        if ($c -notmatch '^https?://') { $c = 'https://www.ra.org.na/' + ($c -replace '^/','') }
        $res = Try-Download -url $c -target $target -retries 3
        $attempted += $c
        if ($res.ok) { $downloaded = $true; Log "Downloaded: $safe via $c"; $results += [PSCustomObject]@{ url=$url; candidate=$c; file=$safe; path=(Join-Path 'assets/forms' $safe); status='downloaded'; attempts=$res.attempt } ; break }
      }
      if (-not $downloaded) {
        Log "FAILED: $url candidates: $([string]::Join(', ', $candidates))"
        $results += [PSCustomObject]@{ url=$url; candidate=[string]::Join(';', $candidates); file=$null; path=$null; status='failed'; attempts=($attempted.Count); reason='All candidates failed' }
      }

      $i++
    } catch {
      Log "ERROR processing $url : $($_.Exception.Message)"
    }
  }
} finally {
  try {
    $outPath = Join-Path $cwd 'scripts\download-procurement-results.json'
    $results | ConvertTo-Json -Depth 5 | Out-File -FilePath $outPath -Encoding UTF8
    Log "Enhanced download complete. Results written to $outPath"
  } catch {
    Log "ERROR writing results: $($_.Exception.Message)"
  }
}

# write results
$outPath = Join-Path $cwd 'scripts\download-procurement-results.json'
$results | ConvertTo-Json -Depth 5 | Out-File -FilePath $outPath -Encoding UTF8
Write-Output "Enhanced download complete. Results written to $outPath"

# summary
$downloaded = $results | Where-Object { $_.status -eq 'downloaded' }
$failed = $results | Where-Object { $_.status -ne 'downloaded' }
Log ("Downloaded: {0} files. Failed: {1}" -f $downloaded.Count, $failed.Count)
$results | Select-Object url,candidate,file,status,attempts | Format-Table -AutoSize | Out-String | Log
