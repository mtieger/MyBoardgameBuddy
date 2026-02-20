$binDir = "C:\Program Files\Git\mingw64\bin"
Get-ChildItem $binDir | Where-Object { $_.Name -like "pdf*" } | Select-Object Name | Sort-Object Name
