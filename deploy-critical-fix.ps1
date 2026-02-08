# CRITICAL FIX DEPLOYMENT SCRIPT
# Fixes: BookOpen reference error + Font loading issues

Write-Host "================================================" -ForegroundColor Red
Write-Host "CRITICAL FIX: White Screen Error Deployment" -ForegroundColor Red
Write-Host "================================================" -ForegroundColor Red
Write-Host ""

$frontendPath = "C:\Users\Rohan Salal\OneDrive\Desktop\CA website\Frontend2\CA"
Set-Location $frontendPath

Write-Host "📍 Current Directory: $frontendPath" -ForegroundColor Cyan
Write-Host ""

# Show what was fixed
Write-Host "🔧 FIXES APPLIED:" -ForegroundColor Green
Write-Host "  ✓ Added BookOpen import to Navigation.tsx" -ForegroundColor White
Write-Host "  ✓ Fixed Google Fonts loading in index.html" -ForegroundColor White
Write-Host "  ✓ Added proper preconnect tags" -ForegroundColor White
Write-Host ""

# Check git status
Write-Host "📝 Checking Git Status..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Ready to deploy fixes?" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
$confirmation = Read-Host "Type 'yes' to continue"

if ($confirmation -ne "yes") {
    Write-Host "❌ Deployment cancelled." -ForegroundColor Red
    exit 0
}

# Add and commit
Write-Host ""
Write-Host "📦 Adding files..." -ForegroundColor Green
git add src/components/Navigation.tsx
git add index.html
git add CRITICAL_WHITE_SCREEN_FIX.md

Write-Host "💾 Committing changes..." -ForegroundColor Green
git commit -m "fix: resolve BookOpen reference error and font loading issues

- Added BookOpen import to Navigation.tsx (fixes ReferenceError)
- Added Google Fonts preconnect tags to index.html
- Fixed font loading OTS parsing errors
- Resolves white screen in production

Critical fixes for production deployment."

Write-Host ""
Write-Host "🚀 Pushing to repository..." -ForegroundColor Green
git push origin main

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "✅ DEPLOYMENT INITIATED!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

Write-Host "📊 NEXT STEPS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Monitor AWS Amplify Build:" -ForegroundColor White
Write-Host "   https://console.aws.amazon.com/amplify/" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Build will take ~3-5 minutes" -ForegroundColor White
Write-Host ""
Write-Host "3. After build completes:" -ForegroundColor White
Write-Host "   - Visit: https://caavinash.in" -ForegroundColor Cyan
Write-Host "   - Hard refresh: Ctrl + Shift + R" -ForegroundColor Cyan
Write-Host "   - Open Console (F12) - should be NO errors" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Test Admin Login:" -ForegroundColor White
Write-Host "   - Visit: https://caavinash.in/admin/login" -ForegroundColor Cyan
Write-Host "   - Should load WITHOUT white screen" -ForegroundColor Cyan
Write-Host ""

Write-Host "================================================" -ForegroundColor Yellow
Write-Host "⏳ Waiting for deployment..." -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key when deployment completes to run verification tests..." -ForegroundColor White
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""
Write-Host "🧪 VERIFICATION CHECKLIST:" -ForegroundColor Green
Write-Host ""
Write-Host "[ ] Visit https://caavinash.in" -ForegroundColor White
Write-Host "[ ] Page loads (NO white screen)" -ForegroundColor White
Write-Host "[ ] Open Console (F12)" -ForegroundColor White
Write-Host "[ ] NO 'BookOpen is not defined' error" -ForegroundColor White
Write-Host "[ ] NO font decode errors" -ForegroundColor White
Write-Host "[ ] Navigation dropdown works" -ForegroundColor White
Write-Host "[ ] Resources & Blogs visible" -ForegroundColor White
Write-Host "[ ] Visit /admin/login - loads correctly" -ForegroundColor White
Write-Host ""

Write-Host "================================================" -ForegroundColor Green
Write-Host "🎉 DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "For detailed documentation, see:" -ForegroundColor Yellow
Write-Host "  - CRITICAL_WHITE_SCREEN_FIX.md" -ForegroundColor Cyan
Write-Host ""
