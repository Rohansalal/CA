# BACKEND COMMUNICATION FIXES - DEPLOYMENT SCRIPT
# Fixes: Consultation Form +  Admin Ticket Reply

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Backend Communication Fixes Deployment" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$frontendPath = "C:\Users\Rohan Salal\OneDrive\Desktop\CA website\Frontend2\CA"
Set-Location $frontendPath

Write-Host "📍 Current Directory: $frontendPath" -ForegroundColor Yellow
Write-Host ""

# Show what was fixed
Write-Host "🔧 FIXES APPLIED:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Consultation Form (ConsultingFormNew.tsx)" -ForegroundColor White
Write-Host "   ✓ Changed localhost:5000 → Production API URL" -ForegroundColor Green
Write-Host "   ✓ Resolves: ERR_BLOCKED_BY_CLIENT" -ForegroundColor Green
Write-Host ""
Write-Host "2. Admin Ticket Reply (AdminTickets.tsx)" -ForegroundColor White
Write-Host "   ✓ Changed POST /reply → PUT /:id" -ForegroundColor Green
Write-Host "   ✓ Fixed payload format" -ForegroundColor Green
Write-Host "   ✓ Resolves: TypeError f is not iterable" -ForegroundColor Green
Write-Host ""

# Check git status
Write-Host "📝 Git Status:" -ForegroundColor Yellow
git status --short

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
$confirmation = Read-Host "Deploy these fixes? (yes/no)"

if ($confirmation -ne "yes") {
    Write-Host "❌ Deployment cancelled." -ForegroundColor Red
    exit 0
}

# Add and commit
Write-Host ""
Write-Host "📦 Adding files..." -ForegroundColor Green
git add src/components/ConsultingFormNew.tsx
git add src/components/pages/Admin Tickets.tsx
git add BACKEND_COMMUNICATION_FIX.md

Write-Host "💾 Committing..." -ForegroundColor Green
git commit -m "fix: resolve consultation form and admin ticket errors

- Fixed consultation form ERR_BLOCKED_BY_CLIENT (localhost → prod API)
- Fixed admin ticket reply endpoint (PUT /:id instead of POST /reply)
- Changed payload format to match backend (adminReply, status)
- Resolves TypeError: f is not iterable

Critical fixes for backend communication."

Write-Host ""
Write-Host "🚀 Pushing to repository..." -ForegroundColor Green
git push origin main

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "✅ DEPLOYMENT INITIATED!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

Write-Host "📊 WHAT'S HAPPENING:" -ForegroundColor Yellow
Write-Host "1. Code pushed to GitHub" -ForegroundColor White
Write-Host "2. AWS Amplify build starting (~3-5 min)" -ForegroundColor White
Write-Host "3. Production deployment" -ForegroundColor White
Write-Host ""

Write-Host "🔗 Monitor Build:" -ForegroundColor Yellow
Write-Host "https://console.aws.amazon.com/amplify/" -ForegroundColor Cyan
Write-Host ""

Write-Host "✅ AFTER DEPLOYMENT, TEST:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Test 1: Consultation Form" -ForegroundColor White
Write-Host "  → Visit: https://caavinash.in" -ForegroundColor Cyan
Write-Host "  → Fill consultation form" -ForegroundColor Cyan
Write-Host "  → Should submit without errors" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test 2: Admin Ticket Reply" -ForegroundColor White
Write-Host "  → Login: https://caavinash.in/admin/login" -ForegroundColor Cyan
Write-Host "  → Go to Tickets tab" -ForegroundColor Cyan
Write-Host "  → Click 'View & Reply' on a ticket" -ForegroundColor Cyan
Write-Host "  → Send a reply" -ForegroundColor Cyan
Write-Host "  → Should work without errors" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test 3: Verify Data Saved" -ForegroundColor White
Write-Host "  → Admin Dashboard → Consultations tab" -ForegroundColor Cyan
Write-Host "  → Should see new consultation request" -ForegroundColor Cyan
Write-Host ""

Write-Host "================================================" -ForegroundColor Green
Write-Host "📖 Full Documentation:" -ForegroundColor Yellow
Write-Host "See: BACKEND_COMMUNICATION_FIX.md" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Green
