Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [System.Reflection.Assembly]::LoadWithPartialName("System.Runtime.WindowsRuntime")
$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime]
$null = [Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType=WindowsRuntime]

$pdfPath = "C:\Users\mattt\OneDrive\Documents\GitHub\MyBoardgameBuddy\Original Source Material\High Frontier 4 All Core Rules.pdf"

Write-Host "--- Calling GetFileFromPathAsync ---"
$op = [Windows.Storage.StorageFile]::GetFileFromPathAsync($pdfPath)
Write-Host "Op type: $($op.GetType().FullName)"
Write-Host "Op interfaces:"
$op.GetType().GetInterfaces() | ForEach-Object { Write-Host "  $_" }
Write-Host "Op members:"
$op | Get-Member | ForEach-Object { Write-Host "  $($_.MemberType) $($_.Name)" }

Write-Host "--- Trying direct property access (no strictmode) ---"
try { Write-Host "Status: $($op.Status)" } catch { Write-Host "Status error: $_" }
try {
    $r = $op.GetResults()
    Write-Host "GetResults OK: $r"
} catch {
    Write-Host "GetResults error: $($_.Exception.HResult) - $_"
}

# Try AsTask via linq/reflection
Write-Host "--- Trying AsTask via explicit method lookup ---"
$methods = [System.WindowsRuntimeSystemExtensions].GetMethods("Static,Public") | Where-Object { $_.Name -eq "AsTask" }
Write-Host "AsTask overloads: $($methods.Count)"
$methods | ForEach-Object {
    Write-Host "  $($_.ToString())"
    $params = $_.GetParameters()
    $params | ForEach-Object { Write-Host "    param: $($_.ParameterType.FullName)" }
}
