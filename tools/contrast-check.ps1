# Contrast check in PowerShell
$colors=@(
  @{name='tile1-top'; hex='#0077b4'},
  @{name='tile1-bottom'; hex='#0066a0'},
  @{name='tile2-top'; hex='#0076b8'},
  @{name='tile2-bottom'; hex='#006fa9'},
  @{name='tile3-top'; hex='#0078c1'},
  @{name='tile3-bottom'; hex='#006aa8'},
  @{name='tile4-top'; hex='#0062a8'},
  @{name='tile4-bottom'; hex='#00528f'},
  @{name='tile5-top'; hex='#005092'},
  @{name='tile5-bottom'; hex='#003f72'}
)

function HexToRgb($hex){
  $h = $hex.TrimStart('#')
  [int]::Parse($h.Substring(0,2), 'AllowHexSpecifier'), [int]::Parse($h.Substring(2,2),'AllowHexSpecifier'), [int]::Parse($h.Substring(4,2),'AllowHexSpecifier')
}

function SrgbToLin($c){
  $c = $c / 255.0
  if ($c -le 0.03928) { return $c / 12.92 }
  return [math]::Pow((($c + 0.055)/1.055),2.4)
}

function Luminance($hex){
  $rgb = HexToRgb $hex
  $r = SrgbToLin $rgb[0]
  $g = SrgbToLin $rgb[1]
  $b = SrgbToLin $rgb[2]
  return 0.2126*$r + 0.7152*$g + 0.0722*$b
}

function Contrast($hexA,$hexB){
  $L1 = Luminance $hexA
  $L2 = Luminance $hexB
  $light = [math]::Max($L1,$L2)
  $dark = [math]::Min($L1,$L2)
  return ($light + 0.05)/($dark + 0.05)
}

$fg = '#ffffff'
Write-Host "Contrast report vs white ($fg)"
Write-Host "Thresholds: AA normal >=4.5, AA large >=3.0"
Write-Host '---'
foreach ($c in $colors){
  $ratio = [math]::Round((Contrast $c.hex $fg),2)
  if ($ratio -ge 4.5){ $flag = 'AA normal' }
  elseif ($ratio -ge 3.0){ $flag = 'AA large only' }
  else { $flag = 'Fails AA' }
  Write-Host ("{0} {1} - contrast {2} :1 {3}" -f $c.name, $c.hex, $ratio, $flag)
}