# 🔧 CRITICAL FIX: AWS Amplify 404 White Screen Error

## ⚠️ PROBLEM SUMMARY
- **White screen** in production (`https://caavinash.in`)
- **404 errors** in browser console
- **Admin login failing**
- **All routes returning 404**

## ✅ ROOT CAUSE
AWS Amplify is treating your React SPA as a static website. When you visit `/admin/login`, Amplify looks for a file at that path (which doesn't exist), resulting in 404.

## 🚀 STEP-BY-STEP FIX

### STEP 1: Configure AWS Amplify Console (MOST IMPORTANT)

1. **Open AWS Amplify Console:**
   - Go to: https://console.aws.amazon.com/amplify/
   - Sign in with your AWS account
   
2. **Select Your App:**
   - Click on your app (should be named `caavinash` or similar)
   
3. **Navigate to Rewrites and Redirects:**
   - In the left sidebar, click: **App settings** → **Rewrites and redirects**
   
4. **Delete All Existing Rules:**
   - Click **Edit**
   - If there are any existing rules, delete them
   
5. **Add New Rule:**
   - Click **Add rule**
   - Configure **EXACTLY** as follows:

   ```
   ┌─────────────────────────────────────────────────────────────┐
   │ Source address (select "Custom" from dropdown):             │
   │ </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2│
   │ |ttf|map|json|webp)$)([^.]+$)/>                           │
   ├─────────────────────────────────────────────────────────────┤
   │ Target address:                                             │
   │ /index.html                                                 │
   ├─────────────────────────────────────────────────────────────┤
   │ Type:                                                       │
   │ 200 (Rewrite)                                              │
   └─────────────────────────────────────────────────────────────┘
   ```

6. **Save the Rule:**
   - Click **Save**
   - Amplify will automatically trigger a redeployment

### STEP 2: Verify Build Configuration

1. **In Amplify Console, go to Build settings:**
   - Click: **App settings** → **Build settings**
   
2. **Verify the build specification:**
   
   Should look like this:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **If it's different, click Edit and paste the above configuration**

### STEP 3: Check Environment Variables

1. **Go to Environment variables:**
   - Click: **App settings** → **Environment variables**
   
2. **Verify these variables exist:**
   ```
   VITE_API_BASE_URL = https://wybui613ll.execute-api.ap-south-1.amazonaws.com/prod/api
   VITE_APP_NAME = Precision Associates
   VITE_ENABLE_ADMIN_PANEL = true
   VITE_RAZORPAY_KEY_ID = rzp_test_S8VGOfGXpXIMJV
   ```

3. **If missing, add them:**
   - Click **Add variable**
   - Enter key and value
   - Click **Save**

### STEP 4: Deploy Code Changes

Run this command in PowerShell:

```powershell
cd "C:\Users\Rohan Salal\OneDrive\Desktop\CA website\Frontend2\CA"
.\deploy-amplify.ps1
```

OR manually:

```powershell
# Navigate to frontend
cd "C:\Users\Rohan Salal\OneDrive\Desktop\CA website\Frontend2\CA"

# Add new files
git add amplify.yml public/_redirects public/redirects.json

# Commit
git commit -m "fix: AWS Amplify SPA routing configuration"

# Push to trigger deployment
git push origin main
```

### STEP 5: Wait for Deployment

1. **Monitor Build Progress:**
   - In Amplify Console, you'll see the build start automatically
   - This takes about **3-5 minutes**
   
2. **Wait for these stages to complete:**
   ```
   ✓ Provision
   ✓ Build
   ✓ Deploy
   ✓ Verify
   ```

### STEP 6: Test the Fix

#### Test 1: Frontend Routes
1. Open browser and navigate to: `https://caavinash.in/admin/login`
2. **Expected:** Admin login page loads (NO white screen)
3. **Check Console (F12):** Should be NO 404 errors

#### Test 2: Admin Login API
1. Open browser console (F12)
2. Run this test:
   ```javascript
   fetch('https://wybui613ll.execute-api.ap-south-1.amazonaws.com/prod/api/auth/admin/login', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       email: 'admin@precisionassociates.com',
       password: 'admin123'
     })
   })
   .then(r => r.json())
   .then(data => {
     console.log('Login Success:', data);
     // Save token for next test
     window.adminToken = data.token;
   })
   .catch(err => console.error('Login Error:', err))
   ```

#### Test 3: Admin Token Verification
1. After getting token from Test 2, run:
   ```javascript
   fetch('https://wybui613ll.execute-api.ap-south-1.amazonaws.com/prod/api/admin/verify-token', {
     method: 'GET',
     headers: {
       'Authorization': `Bearer ${window.adminToken}`
     }
   })
   .then(r => r.json())
   .then(data => console.log('Verification Success:', data))
   .catch(err => console.error('Verification Error:', err))
   ```

#### Test 4: Full Login Flow
1. Visit: `https://caavinash.in/admin/login`
2. Enter credentials:
   - **Email:** `admin@precisionassociates.com`
   - **Password:** `admin123`
3. Click **Admin Login**
4. **Expected:** Should redirect to `/admin/dashboard`
5. **Expected:** Should see "Welcome, Admin!" message

## 🎯 TROUBLESHOOTING

### Issue: Still Getting 404 After Deployment

**Solution:**
1. Clear browser cache:
   - Press `Ctrl + Shift + Delete`
   - Select "Cached images and files"
   - Click "Clear data"
2. Try in Incognito/Private browsing mode
3. Wait 5-10 minutes for CloudFront CDN cache to clear

### Issue: White Screen but No Console Errors

**Solution:**
1. Check if `dist` folder is being deployed (not `build`)
2. Verify `amplify.yml` has `baseDirectory: dist`
3. Check Amplify build logs for errors

### Issue: CORS Error When Calling API

**Solution:**
Your backend needs to allow requests from Amplify.

1. Find your Amplify URL:
   - In Amplify Console, look for the default domain (e.g., `main.d3xyz.amplifyapp.com`)

2. Update backend CORS:
   ```powershell
   cd "C:\Users\Rohan Salal\OneDrive\Desktop\CA website\backend"
   ```

3. Edit `serverless.yml` line 24 to include your Amplify domain:
   ```yaml
   CORS_ORIGIN: "https://caavinash.in,https://www.caavinash.in,https://main.d3xyz.amplifyapp.com"
   ```

4. Redeploy backend:
   ```powershell
   npm run deploy
   ```

### Issue: Admin Login Returns 401

**Solution:**
Admin account might not exist in database.

```powershell
cd "C:\Users\Rohan Salal\OneDrive\Desktop\CA website\backend"
node scripts/create-admin.js
```

## 📋 CHECKLIST

Before marking this as complete, verify:

- [ ] AWS Amplify rewrite rule configured (Source: regex pattern, Target: /index.html, Type: 200)
- [ ] Environment variables set in Amplify Console
- [ ] Code changes pushed to repository
- [ ] Amplify build completed successfully
- [ ] `https://caavinash.in/admin/login` loads without 404
- [ ] No 404 errors in browser console
- [ ] Admin login API test successful
- [ ] Full admin login flow works end-to-end

## 🎉 SUCCESS CRITERIA

You'll know this is fixed when:

1. ✅ No white screen on any route
2. ✅ No 404 errors in console
3. ✅ Admin login page loads correctly
4. ✅ Can log in and access admin dashboard
5. ✅ Can refresh any page without getting 404

## 📞 SUPPORT

If issues persist:

1. **Check Amplify Build Logs:**
   - Amplify Console → Your App → Build (latest)
   - Look for errors in the build output

2. **Check Browser Console:**
   - Press F12 → Console tab
   - Look for specific error messages

3. **Test Backend Directly:**
   - Use the API tests in STEP 6 above
   - Verify backend is responding correctly

---

**Created:** 2026-02-08  
**Last Updated:** 2026-02-08T20:32:30+05:30  
**Status:** Ready to deploy
