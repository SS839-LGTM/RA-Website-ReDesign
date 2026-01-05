$faqs = Get-Content -Raw 'assets/faqs-500.json' | ConvertFrom-Json

function Score-Match($a, $b) {
    if ($a -ne $null) { $a = $a.ToLower() } else { $a = '' }
    if ($b -ne $null) { $b = $b.ToLower() } else { $b = '' }
    $words = ($b -split '\s+') | Where-Object { $_ -ne '' }
    if ($words.Count -eq 0) { return 0 }
    $hits = 0
    foreach ($w in $words) { if ($a -like "*$w*") { $hits++ } }
    return [double]$hits / $words.Count
}

$queries = @("How do I apply for a road access permit?", "How long do permits take to process?", "Where can I book a NATIS appointment?", "How do I report a pothole with photos?", "What documents to register a vehicle?", "How do I get a weighbridge certificate?", "How do I arrange a site inspection?", "Can I request traffic data for my area?", "How do I apply for a temporary road closure for an event?", "How can I report a damaged bridge?", "How do I pay for a permit online?", "Who do I contact for media inquiries?", "Are any tenders currently open?", "Can I get a duplicate licence?", "What are the axle load limits?")

foreach ($q in $queries) {
    $bestScore = 0; $bestIdx = -1
    for ($i=0; $i -lt $faqs.Count; $i++) {
        $f = $faqs[$i]
        $s = [Math]::Max((Score-Match $f.question $q), (Score-Match $f.answer $q))
        if ($s -gt $bestScore) { $bestScore = $s; $bestIdx = $i }
    }
    $item = if ($bestIdx -ge 0) { $faqs[$bestIdx] } else { $null }
    Write-Host "Query: $q"
    Write-Host ("Best score: {0:N3}" -f $bestScore)
    if ($item) { Write-Host "Matched Q: $($item.question)"; Write-Host "Matched A: $($item.answer)" }
    else { Write-Host "Matched: NONE" }
    Write-Host "---"
}
