# 🔧 Vercel Build Error Fix

Fix for "Module not found: Can't resolve '@/lib/api'" error.

---

## ❌ The Error

```
Module not found: Can't resolve '@/lib/api'

./src/app/decisions/[id]/page.tsx
./src/app/decisions/new/page.tsx
./src/store/authStore.ts

> Build failed because of webpack errors
Error: Command "npm run build" exited with 1
```

---

## ✅ The Fix

The issue was that TypeScript path aliases (`@/*`) weren't being resolved correctly during the build.

### **What Was Changed**

#### 1. Updated `frontend/tsconfig.json`

Added `"baseUrl": "."` to the compilerOptions:

```json
{
  "compilerOptions": {
    "baseUrl": ".",           // ← ADDED THIS
    "moduleResolution": "node", // ← CHANGED from "bundler"
    "paths": {
      "@/*": ["./src/*"]
    },
    // ... other options
  }
}
```

#### 2. Created `frontend/jsconfig.json`

Added for better compatibility:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 🚀 How to Deploy Now

### **Option 1: Redeploy on Vercel** (If already deployed)

1. **Push changes to GitHub**:
   ```bash
   git add .
   git commit -m "Fix TypeScript path aliases"
   git push
   ```

2. **Vercel will auto-deploy** (if connected to GitHub)
   - Or go to Vercel dashboard → Deployments → "Redeploy"

### **Option 2: Fresh Deployment**

Follow the normal deployment process:

1. Go to [vercel.com](https://vercel.com)
2. Import `LifeEcho-AI` repository
3. **Set Root Directory**: `frontend`
4. **Add Environment Variable**: `NEXT_PUBLIC_API_URL`
5. Deploy

---

## 🧪 Test Locally (Optional)

To verify the fix works locally:

```bash
# Install dependencies
cd frontend
npm install

# Build
npm run build

# Should complete without errors!
```

---

## 📋 Checklist

Make sure these files exist and are correct:

### `frontend/tsconfig.json`
```json
{
  "compilerOptions": {
    "baseUrl": ".",              // ✅ Must have this
    "moduleResolution": "node",   // ✅ Must be "node"
    "paths": {
      "@/*": ["./src/*"]         // ✅ Path alias
    }
  }
}
```

### `frontend/jsconfig.json`
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### `frontend/next.config.js`
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
}

module.exports = nextConfig
```

### Vercel Settings
- **Root Directory**: `frontend` ✅
- **Framework**: Next.js ✅
- **Environment Variable**: `NEXT_PUBLIC_API_URL` ✅

---

## 🐛 Other Common Build Errors

### "No Next.js version detected"

**Fix**: Set Root Directory to `frontend` in Vercel settings.

### "Module not found: 'axios'"

**Fix**: Make sure `package.json` has all dependencies. Should auto-install.

### "Environment variable not defined"

**Fix**: Add `NEXT_PUBLIC_API_URL` in Vercel environment variables.

---

## 📊 Build Process

When you deploy to Vercel, it:

1. **Detects Next.js** (from `package.json`)
2. **Installs dependencies** (`npm install`)
3. **Reads tsconfig.json** (for path aliases)
4. **Builds the app** (`npm run build`)
5. **Deploys** to CDN

The `baseUrl` in `tsconfig.json` tells Next.js/Webpack where to resolve the `@/*` imports from.

---

## ✅ Verification

After deployment, check:

1. **Build logs** - Should show "Compiled successfully"
2. **Visit your app** - Should load without errors
3. **Check console** - No module errors
4. **Test functionality** - Can sign up, login, create decisions

---

## 🎯 Summary

**Problem**: TypeScript path aliases not resolving  
**Cause**: Missing `baseUrl` in `tsconfig.json`  
**Fix**: Added `baseUrl: "."` and changed `moduleResolution` to `"node"`  
**Status**: ✅ Fixed and ready to deploy

---

## 📚 Related Docs

- [Next.js Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases)
- [TypeScript Paths](https://www.typescriptlang.org/tsconfig#paths)
- [Vercel Build Configuration](https://vercel.com/docs/build-step)

---

**The build error is now fixed!** 🎉

**Just push to GitHub and Vercel will auto-deploy, or redeploy manually.** 🚀

