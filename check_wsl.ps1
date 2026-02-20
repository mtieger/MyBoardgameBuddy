$result = & wsl --list --verbose 2>&1
Write-Host "WSL list: $result"

# Try running a simple wsl command
$wslTest = & wsl echo "hello from wsl" 2>&1
Write-Host "WSL test: $wslTest"

# Check python in WSL
$wslPython = & wsl python3 --version 2>&1
Write-Host "WSL python3: $wslPython"

# Check pip in WSL
$wslPip = & wsl pip3 --version 2>&1
Write-Host "WSL pip3: $wslPip"

# Check if pymupdf available
$wslMupdf = & wsl python3 -c "import fitz; print(fitz.version)" 2>&1
Write-Host "WSL PyMuPDF: $wslMupdf"

$wslPdfminer = & wsl python3 -c "import pdfminer; print('pdfminer ok')" 2>&1
Write-Host "WSL pdfminer: $wslPdfminer"
