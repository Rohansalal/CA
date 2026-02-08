# AWS Amplify Deployment Fix Guide

## Problem
You're experiencing:
- **White screen** in production
- **404 errors** in console
- Admin login API failing
- SPA routing not working

## Root Cause
AWS Amplify doesn't automatically handle Single Page Application (SPA) routing. When users navigate to routes like `/admin/login`, Amplify tries to find those files on the server (which don't exist because React handles routing client-side), resulting in 404 errors.

## Solutions Applied

### 1. Created `amplify.yml` (Build Configuration)
This file tells Amplify how to build your React application properly.

### 2. Created `public/redirects.json` (SPA Routing Fix)
This file configures redirects to handle all routes and point them to `index.html`.

## Manual AWS Amplify Console Configuration

Since AWS Amplify requires manual configuration in the console, follow these steps:

### Step 1: Configure Rewrites and Redirects

1. Go to **AWS Amplify Console**: https://console.aws.amazon.com/amplify/
2. Select your **Frontend app** (caavinash)
3. Click on **Rewrites and redirects** in the left sidebar
4. Click **Edit**
5. **DELETE ALL EXISTING RULES** (if any)
6. Add the following rules **IN THIS EXACT ORDER**:

#### Rule 1: SPA Fallback (MOST IMPORTANT)
```
Source address:    </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>
Target address:    /index.html
Type:              200 (Rewrite)
```

This regex pattern ensures:
- All requests WITHOUT file extensions → serve `index.html`
- Requests WITH static file extensions (js, css, images) → serve actual files
- Type `200` = Rewrite (not redirect, keeps URL in browser)

#### Rule 2: Catch-All Fallback (Backup)
```
Source address:    /<*>
Target address:    /index.html
Type:              200 (Rewrite)
```

7. Click **Save**

### Step 2: Configure Environment Variables

1. In AWS Amplify Console, go to **Environment variables**
2. Verify these variables are set for **production**:

```
VITE_API_BASE_URL=https://wybui613ll.execute-api.ap-south-1.amazonaws.com/prod/api
VITE_APP_NAME=Precision Associates
VITE_ENABLE_ADMIN_PANEL=true
VITE_RAZORPAY_KEY_ID=rzp_test_S8VGOfGXpXIMJV
```

3. Click **Save**

### Step 3: Redeploy Application

After configuring the redirects:

1. Go to **All apps** → Your app
2. Click **Run build** or **Redeploy this version**
3. Wait for deployment to complete (~3-5 minutes)

## Backend API Configuration

### Update Lambda CORS Settings

Your backend serverless.yml needs to allow requests from Amplify:

**File:** `backend/serverless.yml`

Update line 24:
```yaml
CORS_ORIGIN: "https://caavinash.in,https://www.caavinash.in,https://main.d3o8vqz7qxqxqx.amplifyapp.com"
```

Add your Amplify domain to the CORS list.

### Redeploy Backend

```powershell
cd "C:\Users\Rohan Salal\OneDrive\Desktop\CA website\backend"
npm run deploy
```

## Verification Steps

After redeployment:

### 1. Test Frontend Routes
- Visit: `https://caavinash.in/admin/login`
- Should load the admin login page (NO 404)
- Check browser console (F12) → Should be NO 404 errors

### 2. Test Admin Login
```javascript
// Open browser console (F12) and run:
fetch('https://wybui613ll.execute-api.ap-south-1.amazonaws.com/prod/api/auth/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@precisionassociates.com',
    password: 'admin123'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

Expected response:
```json
{
  "message": "Admin login successful",
  "admin": { ... },
  "token": "eyJ..."
}
```

### 3. Test Admin Verification
```javascript
// After getting token from login, test verification:
const token = "YOUR_TOKEN_FROM_LOGIN";
fetch('https://wybui613ll.execute-api.ap-south-1.amazonaws.com/prod/api/admin/verify-token', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

Expected response:
```json
{
  "valid": true,
  "admin": { "id": 1, "name": "Admin", "email": "admin@precisionassociates.com", "role": "SUPER_ADMIN" },
  "user": { "id": 1, "name": "Admin", "email": "admin@precisionassociates.com", "role": "SUPER_ADMIN" }
}
```

## Common Issues & Solutions

### Issue 1: Still Getting 404
**Solution:** 
- Clear browser cache (Ctrl + Shift + Delete)
- Try incognito/private browsing mode
- Wait 5 minutes after redeployment (CDN cache)

### Issue 2: CORS Errors
**Solution:**
- Check backend `serverless.yml` line 24 includes your Amplify domain
- Redeploy backend with `npm run deploy`

### Issue 3: White Screen but No Errors
**Solution:**
- Check AWS Amplify build logs for errors
- Verify `.env.production` has correct `VITE_API_BASE_URL`
- Check that `dist` folder is being deployed (not `build`)

### Issue 4: Admin Login Returns 401
**Solution:**
- Verify admin exists in database:
```powershell
cd backend
node scripts/create-admin.js
```

## Quick Reference

### Admin Credentials
```
Email:    admin@precisionassociates.com
Password: admin123
```

### Production URLs
```
Frontend: https://caavinash.in
Backend:  https://wybui613ll.execute-api.ap-south-1.amazonaws.com/prod/api
```

### Required Files
```
✅ amplify.yml (Build config)
✅ public/redirects.json (SPA routing)
✅ .env.production (Environment variables)
✅ vercel.json (Alternative deployment)
✅ netlify.toml (Alternative deployment)
```

## Next Steps

1. ✅ Configure Amplify rewrites (see Step 1 above)
2. ✅ Verify environment variables (see Step 2 above)
3. ✅ Redeploy application (see Step 3 above)
4. ✅ Test admin login endpoint
5. ✅ Test full login flow in production

## Support

If issues persist after following this guide:
1. Check AWS Amplify build logs
2. Check browser console for specific error messages
3. Test API endpoints directly (see Verification Steps)
4. Verify backend deployment succeeded

---

**Last Updated:** 2026-02-08
**Status:** Ready for deployment
