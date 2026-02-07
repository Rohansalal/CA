Write-Host "Starting wrapper script..."
$path = "c:\Users\Rohan Salal\OneDrive\Desktop\CA website\backend"
Write-Host "Navigating to $path"
Set-Location $path
Write-Host "Running node seedServices.js"
node seedServices.js
Write-Host "Done."
