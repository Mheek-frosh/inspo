$ErrorActionPreference = 'Continue'
$base = 'https://www.mp2collective.com'
$root = 'c:\Users\musid\Desktop\inspo'
$dirs = @(
  'public/assets/images',
  'public/assets/icons',
  'public/assets/logos',
  'public/assets/graphics',
  'public/assets/fonts'
)
foreach ($d in $dirs) { New-Item -ItemType Directory -Path (Join-Path $root $d) -Force | Out-Null }

$pages = @('/', '/about', '/services', '/contact')
$htmlFiles = @()
foreach ($p in $pages) {
  $name = if ($p -eq '/') { '_homepage.html' } else { ("_page{0}.html" -f ($p -replace '/','')) }
  $out = Join-Path $root $name
  try {
    Invoke-WebRequest -Uri ($base + $p) -OutFile $out -UseBasicParsing
    $htmlFiles += $out
  } catch { Write-Host "FAIL page $p : $_" }
}

$allText = ($htmlFiles | ForEach-Object { Get-Content $_ -Raw }) -join "`n"

# script/css urls from html
$chunkUrls = [regex]::Matches($allText, '(?:href|src)=\"([^\"]+)\"') | ForEach-Object { $_.Groups[1].Value } |
  Where-Object { $_ -match '\.(js|css)(\?|$)' -or $_ -match '/_next/static/' } | Select-Object -Unique

$chunkFiles = @()
foreach ($rel in $chunkUrls) {
  if ($rel -match '^https?://') { $url = $rel } else { $url = $base + ($rel -replace '^/','/') ; if (-not $rel.StartsWith('/')) { $url = $base + '/' + $rel } ; if ($rel.StartsWith('/')) { $url = $base + $rel } }
  $safe = ($rel -replace '[\\/?=&:*<>|\"]','_')
  if ($safe.Length -gt 120) { $safe = $safe.Substring(0,120) }
  $out = Join-Path $root ("_chunk_" + $safe)
  try {
    Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing
    $chunkFiles += $out
  } catch { Write-Host "FAIL chunk $url" }
}

$chunkText = ($chunkFiles | ForEach-Object { try { Get-Content $_ -Raw -ErrorAction Stop } catch { '' } }) -join "`n"
$combined = $allText + "`n" + $chunkText

# asset path patterns
$pathMatches = [regex]::Matches($combined, '/(?:mp2|MP2|PATTERN|testimonial|quote)[^\"''\s\)]*\.(?:jpg|jpeg|png|svg|webp|gif|woff2?|ttf|otf|ico)(?:\?[^\"''\s\)]*)?') | ForEach-Object { $_.Value } | Select-Object -Unique
$fullUrlMatches = [regex]::Matches($combined, 'https?://[^\"''\s\)]+\.(?:jpg|jpeg|png|svg|webp|gif|woff2?|ttf|otf|css)(?:\?[^\"''\s\)]*)?') | ForEach-Object { $_.Value } | Select-Object -Unique

$required = @(
  '/mp2-home-hero.jpg','/mp2-about.jpg','/mp2-services.jpg','/mp2-cara-portrait.jpg','/mp2-people.jpg',
  '/testimonial-keith-schroeder.jpg','/testimonial-mark-allan.jpg','/testimonial-noel-leatherbury.jpg','/testimonial-katie-malone.jpg',
  '/mp2-logo.svg','/mp2-logomark.svg','/mp2-wordmark.svg','/quote.svg','/PATTERN.jpg','/mp2-walking.jpg','/MP2-OG.jpg','/MP2-Favicon.png'
)
$assetPaths = @($pathMatches + $required + ($fullUrlMatches | ForEach-Object { if ($_ -like ($base + '*')) { $_.Substring($base.Length) } })) | Where-Object { $_ } | Select-Object -Unique

# fonts from css
$fontUrls = [regex]::Matches($combined, 'url\(([^\)]+)\)') | ForEach-Object { $_.Groups[1].Value.Trim('"', "'") } |
  Where-Object { $_ -match '\.(woff2?|ttf|otf)' } | Select-Object -Unique

$cssPath = Join-Path $root '_site.css'
$cssUrl = ($chunkUrls | Where-Object { $_ -match '\.css' } | Select-Object -First 1)
if ($cssUrl) {
  if ($cssUrl.StartsWith('/')) { $cssFull = $base + $cssUrl } else { $cssFull = $cssUrl }
  try { Invoke-WebRequest -Uri $cssFull -OutFile $cssPath -UseBasicParsing } catch {}
  if (Test-Path $cssPath) {
    $css = Get-Content $cssPath -Raw
    $combined += "`n" + $css
    $fontUrls += [regex]::Matches($css, 'url\(([^\)]+)\)') | ForEach-Object { $_.Groups[1].Value.Trim('"', "'") } | Where-Object { $_ -match '\.(woff2?|ttf|otf)' }
    $fontUrls = $fontUrls | Select-Object -Unique
    $cssAssets = [regex]::Matches($css, '/[^\)\"''\s]+\.(?:woff2?|ttf|otf|svg|png|jpg)') | ForEach-Object { $_.Value }
    $assetPaths += $cssAssets
    $assetPaths = $assetPaths | Select-Object -Unique
  }
}

function Get-DestPath([string]$pathOrUrl) {
  $p = $pathOrUrl
  if ($p -match '^https?://') {
    if ($p -like ($base + '*')) { $p = $p.Substring($base.Length) }
    else { return $null }
  }
  if (-not $p.StartsWith('/')) { $p = '/' + $p }
  $file = Split-Path $p -Leaf
  $ext = [IO.Path]::GetExtension($file).ToLower()
  $sub = switch -Regex ($file) {
    'logo|wordmark|logomark|favicon' { 'logos' }
    'quote|icon' { 'icons' }
    'woff|ttf|otf' { 'fonts' }
    'svg' { if ($file -match 'logo|mark|wordmark') { 'logos' } else { 'graphics' } }
    default { 'images' }
  }
  if ($ext -in '.woff','.woff2','.ttf','.otf') { $sub = 'fonts' }
  Join-Path $root ("public/assets/$sub/$file")
}

$manifest = New-Object System.Collections.Generic.List[string]
$manifest.Add('# ASSET_MANIFEST')
$manifest.Add('')
$manifest.Add('Downloaded from https://www.mp2collective.com/')
$manifest.Add('')

$downloaded = @{}
foreach ($ap in $assetPaths) {
  $dest = Get-DestPath $ap
  if (-not $dest) { continue }
  $url = if ($ap.StartsWith('http')) { $ap } else { $base + ($(if ($ap.StartsWith('/')) { $ap } else { '/' + $ap })) }
  $dir = Split-Path $dest -Parent
  New-Item -ItemType Directory -Path $dir -Force | Out-Null
  try {
    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
    $len = (Get-Item $dest).Length
    if ($len -gt 0) {
      $rel = $dest.Replace($root + '\','').Replace('\','/')
      $manifest.Add("- **$rel**")
      $manifest.Add("  - Original: $url")
      $manifest.Add("  - Size: $len bytes")
      $manifest.Add('')
      $downloaded[$url] = $rel
    } else { Remove-Item $dest -Force }
  } catch {
    $manifest.Add("- **FAILED**: $url")
    $manifest.Add("  - Error: $($_.Exception.Message)")
    $manifest.Add('')
  }
}

foreach ($fu in $fontUrls) {
  $dest = Get-DestPath $fu
  if (-not $dest) {
    if ($fu -match '^/') { $dest = Join-Path $root ('public/assets/fonts/' + (Split-Path $fu -Leaf)) }
    elseif ($fu -match '^https?://') { continue }
    else { $dest = Join-Path $root ('public/assets/fonts/' + (Split-Path $fu -Leaf)) }
  }
  $url = if ($fu -match '^https?://') { $fu } elseif ($fu.StartsWith('/')) { $base + $fu } else { $base + '/' + $fu }
  $dir = Split-Path $dest -Parent
  New-Item -ItemType Directory -Path $dir -Force | Out-Null
  if ($downloaded.ContainsKey($url)) { continue }
  try {
    Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
    $len = (Get-Item $dest).Length
    if ($len -gt 0) {
      $rel = $dest.Replace($root + '\','').Replace('\','/')
      $manifest.Add("- **$rel**")
      $manifest.Add("  - Original: $url")
      $manifest.Add("  - Size: $len bytes")
      $manifest.Add('')
    }
  } catch {}
}

# colors from css
$colors = @()
if (Test-Path $cssPath) {
  $css = Get-Content $cssPath -Raw
  $colors += [regex]::Matches($css, '--[a-zA-Z0-9-]+:\s*[^;]+;') | ForEach-Object { $_.Value.Trim() }
  $colors += [regex]::Matches($css, '#[0-9A-Fa-f]{3,8}') | ForEach-Object { $_.Value } | Select-Object -Unique
  $colors += [regex]::Matches($css, 'rgb[a]?\([^\)]+\)') | ForEach-Object { $_.Value } | Select-Object -Unique
}
$colors = $colors | Select-Object -Unique

$manifestPath = Join-Path $root 'ASSET_MANIFEST.md'
$manifest | Set-Content -Path $manifestPath -Encoding UTF8

# summary json for agent
$summary = [ordered]@{
  assetPathsFound = @($assetPaths | Sort-Object)
  fontUrls = @($fontUrls | Sort-Object)
  cssVariablesAndColors = @($colors)
  downloadedCount = $downloaded.Count
  manifest = $manifestPath
}
$summary | ConvertTo-Json -Depth 5 | Set-Content (Join-Path $root '_asset_summary.json') -Encoding UTF8
Write-Output 'SCRIPT_DONE'
