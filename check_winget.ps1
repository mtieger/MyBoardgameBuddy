$wg = Get-Command winget -ErrorAction SilentlyContinue
if ($wg) { Write-Host "winget: $($wg.Source)"; & winget --version } else { Write-Host "winget not found" }
