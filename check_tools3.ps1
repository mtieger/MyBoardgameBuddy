# Check more tools
$more = @("magick","convert","gs","mutool","mupdf","pdftoppm","inkscape","wsl")
foreach ($t in $more) {
    $found = Get-Command $t -ErrorAction SilentlyContinue
    if ($found) { Write-Host "FOUND: $t -> $($found.Source)" }
    else         { Write-Host "missing: $t" }
}

# Check pdftotext version / page count ability
$pdf = "C:\Users\mattt\OneDrive\Documents\GitHub\MyBoardgameBuddy\Original Source Material\High Frontier 4 All Core Rules.pdf"
$out = & "C:\Program Files\Git\mingw64\bin\pdftotext.exe" -v 2>&1
Write-Host "pdftotext version: $out"

# Get page count using pdfinfo if available
$pdfinfo = Get-Command "pdfinfo" -ErrorAction SilentlyContinue
if ($pdfinfo) {
    $info = & pdfinfo $pdf 2>&1
    Write-Host "pdfinfo: $info"
}

# Try Windows.Data.Pdf WinRT
try {
    Add-Type -AssemblyName System.Runtime.WindowsRuntime
    Write-Host "WinRT available"
} catch {
    Write-Host "WinRT not available: $_"
}

# Check if wkhtmltopdf or similar available
$extra = @("wkhtmltoimage","xpdf","pdfimages","pdfinfo")
foreach ($t in $extra) {
    $found = Get-Command $t -ErrorAction SilentlyContinue
    if ($found) { Write-Host "FOUND: $t -> $($found.Source)" }
}

# List all pdf* tools in common tool dirs
$dirs = @("C:\Program Files\Git\mingw64\bin","C:\Program Files\Git\usr\bin","C:\Windows\System32","$env:LOCALAPPDATA\Programs")
foreach ($d in $dirs) {
    if (Test-Path $d) {
        Get-ChildItem $d -Filter "pdf*" -ErrorAction SilentlyContinue | ForEach-Object { Write-Host "  $($_.FullName)" }
    }
}
