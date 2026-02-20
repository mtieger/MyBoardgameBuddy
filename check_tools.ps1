# Check available tools
$tools = @("node", "npm", "npx", "python", "python3", "py", "java", "pdftotext", "pdftoppm", "gs", "ghostscript")
foreach ($t in $tools) {
    $found = Get-Command $t -ErrorAction SilentlyContinue
    if ($found) { Write-Host "FOUND: $t -> $($found.Source)" }
    else         { Write-Host "missing: $t" }
}

# Check nodejs in common paths
$nodePaths = @(
    "C:\Program Files\nodejs\node.exe",
    "C:\Program Files (x86)\nodejs\node.exe",
    "$env:APPDATA\npm\node.exe",
    "$env:LOCALAPPDATA\Programs\nodejs\node.exe"
)
foreach ($p in $nodePaths) {
    if (Test-Path $p) { Write-Host "Node found at: $p"; & $p --version }
}

# Get file size and first bytes of PDF to confirm it's a real PDF
$pdf = "C:\Users\mattt\OneDrive\Documents\GitHub\MyBoardgameBuddy\Original Source Material\High Frontier 4 All Core Rules.pdf"
$info = Get-Item $pdf
Write-Host "PDF size: $($info.Length) bytes"
$bytes = [System.IO.File]::ReadAllBytes($pdf) | Select-Object -First 8
Write-Host "First bytes (hex): $($bytes | ForEach-Object { $_.ToString('X2') })"
$header = [System.Text.Encoding]::ASCII.GetString($bytes)
Write-Host "Header: $header"
