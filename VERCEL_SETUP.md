# 🎨 Vercel Deployment - Visual Guide

Step-by-step visual guide to deploy your frontend to Vercel.

---

## 🚀 Quick Deploy

### Step 1: Sign Up

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your repositories

✅ **No credit card required!**

---

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Find `LifeEcho-AI` in the list
3. Click **"Import"**

---

### Step 3: Configure Project ⚠️ IMPORTANT

You'll see a configuration screen. Here's what to set:

#### **Framework Preset**
- Should auto-detect as **"Next.js"**
- If not, select it from dropdown

#### **Root Directory** ⚠️ CRITICAL
```
┌─────────────────────────────────────┐
│ Root Directory                      │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ frontend                        │ │ ← Type this!
│ └─────────────────────────────────┘ │
│                                     │
│ [Edit]                              │
└─────────────────────────────────────┘
```

**Steps**:
1. Click **"Edit"** next to "Root Directory"
2. Type: `frontend`
3. Click **"Continue"**

#### **Build Settings**
Leave these as default:
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

#### **Environment Variables**
Click to expand, then add:

```
┌─────────────────────────────────────────────────────┐
│ Environment Variables                               │
│                                                     │
│ Name:  NEXT_PUBLIC_API_URL                         │
│ Value: https://lifeecho-api.up.railway.app         │
│                                                     │
│ [Add]                                               │
└─────────────────────────────────────────────────────┘
```

**Steps**:
1. Click **"Add"** under Environment Variables
2. **Name**: `NEXT_PUBLIC_API_URL`
3. **Value**: Your Railway URL (from Railway deployment)
4. Click **"Add"**

---

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll see:
   ```
   🎉 Congratulations!
   Your project has been deployed.
   
   https://your-app.vercel.app
   ```

---

## ✅ Verify Deployment

### Check Build Logs

If deployment fails:
1. Click on the failed deployment
2. Click **"Building"** to see logs
3. Look for errors

### Common Issues

#### ❌ "No Next.js version detected"

**Problem**: Root Directory not set to `frontend`

**Fix**:
1. Go to **Settings** → **General**
2. Find **"Root Directory"**
3. Click **"Edit"**
4. Enter: `frontend`
5. Click **"Save"**
6. Go to **Deployments** → Click **"..."** → **"Redeploy"**

#### ❌ "Module not found: Can't resolve 'axios'"

**Problem**: Dependencies not installed

**Fix**: This shouldn't happen, but if it does:
1. Check `frontend/package.json` exists
2. Redeploy

#### ❌ Frontend loads but shows "Network Error"

**Problem**: Backend URL not set or CORS issue

**Fix**:
1. **Check Environment Variable**:
   - Settings → Environment Variables
   - Verify `NEXT_PUBLIC_API_URL` is set correctly
   
2. **Update CORS in Railway**:
   ```bash
   railway variables set CORS_ORIGINS="https://your-app.vercel.app"
   ```

---

## 🔧 Update Environment Variables

### After Deployment

If you need to change the backend URL:

1. Go to **Settings** → **Environment Variables**
2. Find `NEXT_PUBLIC_API_URL`
3. Click **"Edit"**
4. Update the value
5. Click **"Save"**
6. Go to **Deployments** → **"Redeploy"**

⚠️ **Important**: You must redeploy for changes to take effect!

---

## 🌐 Custom Domain (Optional)

### Add Your Own Domain

1. Go to **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain (e.g., `lifeecho.com`)
4. Follow DNS instructions:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
5. Wait for DNS propagation (5-60 minutes)

✅ **SSL certificate is automatic!**

---

## 📊 Monitor Your App

### Analytics

1. Go to **Analytics** tab
2. See:
   - Page views
   - Unique visitors
   - Top pages
   - Countries

### Speed Insights

1. Go to **Speed Insights** tab
2. See:
   - Performance score
   - Load times
   - Core Web Vitals

### Logs

1. Go to **Deployments**
2. Click on a deployment
3. Click **"Functions"** to see runtime logs

---

## 🔄 Continuous Deployment

### Auto-Deploy from GitHub

Already enabled! Every push to GitHub will:
- **Main branch** → Deploy to production
- **Other branches** → Create preview deployment

### Preview Deployments

When you push to a non-main branch:
1. Vercel creates a preview URL
2. Comment appears on GitHub PR
3. Test changes before merging

---

## 💰 Free Tier Limits

| Feature | Free Tier |
|---------|-----------|
| **Deployments** | Unlimited |
| **Bandwidth** | 100 GB/month |
| **Build Time** | 6000 minutes/month |
| **Serverless Functions** | 100 GB-hours |
| **Team Members** | 1 (just you) |

**Typical Usage**: 1-5 GB/month for small apps ✅

---

## 🎯 Next Steps

After deploying to Vercel:

1. ✅ **Copy your Vercel URL**
2. ✅ **Update CORS in Railway**:
   ```bash
   railway variables set CORS_ORIGINS="https://your-app.vercel.app"
   ```
3. ✅ **Test your app**:
   - Visit your Vercel URL
   - Sign up for an account
   - Create a decision
   - Generate scenarios

---

## 🆘 Need Help?

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Our Guide**: [DEPLOY_NOW.md](./DEPLOY_NOW.md)

---

## 📝 Quick Reference

### Correct Settings

```yaml
Framework: Next.js
Root Directory: frontend          # ⚠️ MUST SET
Build Command: npm run build
Output Directory: .next
Install Command: npm install

Environment Variables:
  NEXT_PUBLIC_API_URL: https://your-railway-url.up.railway.app
```

### Deployment Checklist

- [ ] Root Directory set to `frontend`
- [ ] Environment variable `NEXT_PUBLIC_API_URL` added
- [ ] Railway backend URL is correct
- [ ] CORS updated in Railway
- [ ] Deployment successful
- [ ] App loads without errors
- [ ] Can create account and login
- [ ] Can create decisions
- [ ] Can generate scenarios

---

**Your frontend is now deployed on Vercel!** 🎉

**Visit your app**: `https://your-app.vercel.app` 🚀

