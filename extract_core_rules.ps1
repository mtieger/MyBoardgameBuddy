Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ── Paths ────────────────────────────────────────────────────────────────────
$root       = "C:\Users\mattt\OneDrive\Documents\GitHub\MyBoardgameBuddy"
$srcDir     = Join-Path $root "Original Source Material"
$outImages  = Join-Path $root "rules\images\core_rules"
$outJson    = Join-Path $root "rules\core_rules.json"
$pdftotext  = "C:\Program Files\Git\mingw64\bin\pdftotext.exe"

# ── Find PDF automatically ───────────────────────────────────────────────────
$pdfFile = Get-ChildItem -Path $srcDir -Filter "*.pdf" | Select-Object -First 1
if (-not $pdfFile) { throw "No PDF file found in '$srcDir'" }
$pdfPath = $pdfFile.FullName
Write-Host "Found PDF: $($pdfFile.Name)" -ForegroundColor Cyan

New-Item -Path $outImages -ItemType Directory -Force | Out-Null

# ────────────────────────────────────────────────────────────────────────────
# STEP 1 — Extract text with pdftotext (page-by-page via form-feed splits)
# ────────────────────────────────────────────────────────────────────────────
Write-Host "`nSTEP 1: Extracting text..." -ForegroundColor Yellow

$rawLines  = & $pdftotext -layout $pdfPath - 2>&1
$rawText   = $rawLines -join "`n"
$pageTexts = $rawText -split ([char]12)   # form-feed = ASCII 12 = page break

if ($pageTexts.Count -gt 0 -and -not $pageTexts[-1].Trim()) {
    $pageTexts = $pageTexts[0..($pageTexts.Count - 2)]
}
Write-Host "  Text pages found: $($pageTexts.Count)"

# ────────────────────────────────────────────────────────────────────────────
# STEP 2 — Load WinRT types for PDF rendering
# ────────────────────────────────────────────────────────────────────────────
Write-Host "`nSTEP 2: Loading Windows.Data.Pdf (WinRT)..." -ForegroundColor Yellow

Add-Type -AssemblyName System.Runtime.WindowsRuntime
Add-Type -AssemblyName System.Drawing
$null = [System.Reflection.Assembly]::LoadWithPartialName("System.Runtime.WindowsRuntime")

$null = [Windows.Data.Pdf.PdfDocument,          Windows.Data.Pdf,           ContentType=WindowsRuntime]
$null = [Windows.Data.Pdf.PdfPageRenderOptions, Windows.Data.Pdf,           ContentType=WindowsRuntime]
$null = [Windows.Storage.StorageFile,           Windows.Storage,            ContentType=WindowsRuntime]
$null = [Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Storage.Streams, ContentType=WindowsRuntime]

# Universal WinRT async wait: poll Status until done, then call GetResults() if available.
# Works for both IAsyncOperation<T> (returns result) and IAsyncAction (returns void).
# Status enum: Started=0, Completed=1, Canceled=2, Error=3
function Await {
    param($Op)
    while ($Op.Status -eq 0) { [System.Threading.Thread]::Sleep(5) }
    if ($Op.Status -eq 3) { throw "WinRT async error: $($Op.ErrorCode)" }
    if ($Op.Status -eq 2) { throw "WinRT async operation was canceled" }
    try { return $Op.GetResults() } catch { }   # void for IAsyncAction; T for IAsyncOperation<T>
}

# Open PDF via Windows Storage (needs absolute path)
Write-Host "  Loading PDF document..."
$storageFile = Await([Windows.Storage.StorageFile]::GetFileFromPathAsync($pdfPath))
$pdfDoc      = Await([Windows.Data.Pdf.PdfDocument]::LoadAsync($storageFile))
$pageCount   = $pdfDoc.PageCount
Write-Host "  WinRT page count: $pageCount"

# JPEG encoder
$jpgCodec  = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" } | Select-Object -First 1
$jpgParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$jpgParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality, [long]85)

# ────────────────────────────────────────────────────────────────────────────
# STEP 3 — Render each page to JPEG + collect text
# ────────────────────────────────────────────────────────────────────────────
Write-Host "`nSTEP 3: Rendering $pageCount pages..." -ForegroundColor Yellow

$pagesArray = @()

for ($i = 0; $i -lt $pageCount; $i++) {
    $n = $i + 1
    Write-Host "  [$n / $pageCount]" -NoNewline

    $pdfPage = $pdfDoc.GetPage($i)

    $opts = [Windows.Data.Pdf.PdfPageRenderOptions]::new()
    $opts.DestinationWidth = 1200   # ~150 DPI for a standard 8" wide page

    $ras = [Windows.Storage.Streams.InMemoryRandomAccessStream]::new()
    Await($pdfPage.RenderToStreamAsync($ras, $opts))

    # WinRT IRandomAccessStream → .NET Stream → Bitmap → JPEG file
    $netStream = [System.IO.WindowsRuntimeStreamExtensions]::AsStream($ras)
    $bmp       = [System.Drawing.Bitmap]::new($netStream)
    $imgPath   = Join-Path $outImages "$n.jpeg"
    $bmp.Save($imgPath, $jpgCodec, $jpgParams)
    $bmp.Dispose()
    $netStream.Dispose()
    $ras.Dispose()
    $pdfPage.Dispose()

    Write-Host " -> $imgPath" -ForegroundColor Green

    $text = if ($i -lt $pageTexts.Count) { $pageTexts[$i].Trim() } else { "" }

    $pagesArray += [ordered]@{
        page  = $n
        text  = $text
        image = "images/core_rules/$n.jpeg"
    }
}

# ────────────────────────────────────────────────────────────────────────────
# STEP 4 — Write core_rules.json
# ────────────────────────────────────────────────────────────────────────────
Write-Host "`nSTEP 4: Writing JSON..." -ForegroundColor Yellow

$doc = [ordered]@{
    id          = "core_rules"
    title       = "Core Rulebook"
    module      = "core"
    total_pages = $pageCount
    pages       = $pagesArray
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$jsonStr   = $doc | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText($outJson, $jsonStr, $utf8NoBom)

Write-Host "  Saved: $outJson" -ForegroundColor Green
Write-Host "`nDone! $pageCount pages processed." -ForegroundColor Cyan
