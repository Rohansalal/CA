# AWS Amplify Deployment Script
# Run this script after configuring Amplify Console redirects

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "AWS Amplify Deployment Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to frontend directory
$frontendPath = "C:\Users\Rohan Salal\OneDrive\Desktop\CA website\Frontend2\CA"
Set-Location $frontendPath

Write-Host "Current Directory: $frontendPath" -ForegroundColor Yellow
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "ERROR: Git repository not found!" -ForegroundColor Red
    Write-Host "Initialize git first with: git init" -ForegroundColor Yellow
    exit 1
}

# Check current git status
Write-Host "Checking Git Status..." -ForegroundColor Green
git status

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Files to be deployed:" -ForegroundColor Cyan
Write-Host "  ✓ amplify.yml (Build config)" -ForegroundColor Green
Write-Host "  ✓ public/_redirects (SPA routing)" -ForegroundColor Green
Write-Host "  ✓ public/redirects.json (Backup)" -ForegroundColor Green
Write-Host "  ✓ .env.production (Environment)" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Prompt for confirmation
$confirmation = Read-Host "Do you want to commit and push these changes? (yes/no)"

if ($confirmation -ne "yes") {
    Write-Host "Deployment cancelled." -ForegroundColor Yellow
    exit 0
}

# Add files
Write-Host ""
Write-Host "Adding files to git..." -ForegroundColor Green
git add amplify.yml
git add public/_redirects
git add public/redirects.json
git add AWS_AMPLIFY_FIX.md

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Green
$commitMessage = "fix: AWS Amplify SPA routing and 404 errors"
git commit -m $commitMessage

# Push to main branch
Write-Host ""
Write-Host "Pushing to remote repository..." -ForegroundColor Green
git push origin main

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT: Now configure AWS Amplify Console:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to AWS Amplify Console" -ForegroundColor White
Write-Host "2. Navigate to: Rewrites and redirects" -ForegroundColor White
Write-Host "3. Add this rule:" -ForegroundColor White
Write-Host ""
Write-Host "   Source: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>" -ForegroundColor Cyan
Write-Host "   Target: /index.html" -ForegroundColor Cyan
Write-Host "   Type:   200 (Rewrite)" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Save and wait for automatic redeployment" -ForegroundColor White
Write-Host ""
Write-Host "Build will start automatically in AWS Amplify (~3-5 minutes)" -ForegroundColor Green
Write-Host ""
Write-Host "Monitor build progress at:" -ForegroundColor Yellow
Write-Host "https://console.aws.amazon.com/amplify/" -ForegroundColor Cyan
Write-Host ""
