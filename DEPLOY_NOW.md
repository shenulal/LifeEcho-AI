# 🚀 Deploy LifeEcho AI in 15 Minutes (FREE)

**No credit card required. No payment. 100% free.**

---

## ⚡ Quick Deploy

### Step 1: Push to GitHub (2 min)

```bash
git add .
git commit -m "Ready for deployment"
git push
```

If you haven't set up Git yet:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/LifeEcho-AI.git
git push -u origin main
```

---

### Step 2: Deploy Backend to Railway (8 min)

#### Option A: Using Web UI (Easiest)

1. **Sign up**: Go to [railway.app](https://railway.app)
   - Click "Login with GitHub"
   - No credit card required ✅

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `LifeEcho-AI` repository

3. **Add Database**:
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway auto-connects it to your service

4. **Set Environment Variables**:
   - Click on your service → "Variables"
   - Add these variables:
   
   ```
   APP_NAME=LifeEcho AI
   APP_ENV=production
   DEBUG=false
   SECRET_KEY=your-random-32-character-secret-key-here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   OPENAI_API_KEY=
   CORS_ORIGINS=*
   ```
   
   **Generate SECRET_KEY**:
   ```bash
   openssl rand -hex 32
   ```

5. **Generate Domain**:
   - Click "Settings" → "Networking" → "Generate Domain"
   - Copy your URL: `https://lifeecho-api.up.railway.app`

#### Option B: Using CLI (Faster)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Run deployment script
./deploy-railway.sh  # Linux/Mac
deploy-railway.bat   # Windows
```

---

### Step 3: Deploy Frontend to Vercel (5 min)

📖 **Detailed Visual Guide**: See [VERCEL_SETUP.md](./VERCEL_SETUP.md)

#### Option A: Using Web UI (Easiest)

1. **Sign up**: Go to [vercel.com](https://vercel.com)
   - Click "Sign Up with GitHub"
   - No credit card required ✅

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Select `LifeEcho-AI` repository
   - Click "Import"

3. **Configure Build Settings**:

   **IMPORTANT**: Click "Edit" next to "Root Directory"

   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend` ⚠️ **MUST SET THIS**
   - **Build Command**: Leave as default (`npm run build`)
   - **Output Directory**: Leave as default (`.next`)
   - **Install Command**: Leave as default (`npm install`)

4. **Set Environment Variable**:
   - Expand "Environment Variables" section
   - Add variable:
     - **Name**: `NEXT_PUBLIC_API_URL`
     - **Value**: `https://lifeecho-api.up.railway.app`
     - Replace with your actual Railway URL from Step 2
   - Click "Add"

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Copy your URL: `https://your-app.vercel.app`

#### Option B: Using CLI (Faster)

```bash
# Install Vercel CLI
npm install -g vercel

# Run deployment script
./deploy-vercel.sh  # Linux/Mac
deploy-vercel.bat   # Windows
```

---

### Step 4: Update CORS (1 min)

Go back to Railway and update `CORS_ORIGINS`:

**Via Web UI**:
1. Railway dashboard → Your service → Variables
2. Edit `CORS_ORIGINS`
3. Set to: `https://your-app.vercel.app`
4. Save

**Via CLI**:
```bash
railway variables set CORS_ORIGINS="https://your-app.vercel.app"
```

---

## ✅ Done! Your App is Live

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://lifeecho-api.up.railway.app`
- **API Docs**: `https://lifeecho-api.up.railway.app/docs`

---

## 🧪 Test Your App

1. **Visit your frontend URL**
2. **Sign up** for an account
3. **Create a decision**:
   - Title: "Switch from Finance to Software Engineering"
   - Category: Career
   - Description: "I'm considering a career change..."
4. **Generate scenarios** (takes 10-30 seconds)
5. **Explore results**: Charts, timelines, risks, recommendations

---

## 💰 Cost Breakdown

| Service | Free Tier | Your Cost |
|---------|-----------|-----------|
| Railway | $5/month credit | $0 |
| Vercel | 100 GB bandwidth | $0 |
| PostgreSQL | Included | $0 |
| Mock AI | Unlimited | $0 |
| **Total** | | **$0/month** |

---

## 🐛 Troubleshooting

### Frontend shows "Network Error"

**Fix**: Update `CORS_ORIGINS` in Railway to match your Vercel URL exactly (no trailing slash).

### Backend shows "Database connection failed"

**Fix**: Make sure PostgreSQL is added in Railway and `DATABASE_URL` is set.

### "Service Unavailable" on first load

**Normal**: Free tier services sleep after 15 min. First request takes 30-60 seconds to wake up.

### Build fails on Railway

**Fix**: Make sure these files exist in your repo:
- `nixpacks.toml` ✅
- `Dockerfile` ✅
- `backend/requirements.txt` ✅

### "No Next.js version detected" on Vercel

**Cause**: Vercel is looking in the wrong directory.

**Fix**:
1. Go to Vercel dashboard → Your project → Settings → General
2. Scroll to "Root Directory"
3. Click "Edit"
4. Enter: `frontend`
5. Click "Save"
6. Go to Deployments → Click "..." → "Redeploy"

**Alternative (CLI)**:
```bash
cd frontend
vercel --prod
```

### Build fails on Vercel

**Fix**: Make sure:
- Root Directory is set to `frontend` ⚠️ **CRITICAL**
- `NEXT_PUBLIC_API_URL` is set correctly
- You're deploying from the `frontend` directory if using CLI

---

## 🎯 Next Steps

### Add Real AI (Optional)

1. Get OpenAI API key from [platform.openai.com](https://platform.openai.com)
2. Add to Railway variables:
   ```bash
   railway variables set OPENAI_API_KEY="sk-..."
   ```
3. Cost: ~$0.01-0.05 per scenario

### Custom Domain (Optional)

**Vercel**:
1. Vercel dashboard → Your project → Settings → Domains
2. Add your domain (e.g., `lifeecho.com`)
3. Update DNS records as shown

**Railway**:
1. Railway dashboard → Your service → Settings → Domains
2. Add your domain (e.g., `api.lifeecho.com`)
3. Update DNS records as shown

### Enable Auto-Deploy

Already enabled! Every push to GitHub will auto-deploy:
- Railway: Deploys `main` branch
- Vercel: Deploys all branches (preview for non-main)

---

## 📊 Monitor Your App

### Railway Dashboard
- View logs: Railway → Your service → Logs
- Check usage: Railway → Your service → Metrics
- Monitor costs: Railway → Account → Usage

### Vercel Dashboard
- View deployments: Vercel → Your project → Deployments
- Check analytics: Vercel → Your project → Analytics
- Monitor performance: Vercel → Your project → Speed Insights

---

## 🎉 Share with Customers

Your app is production-ready! Share your Vercel URL:

```
🌟 LifeEcho AI - Your Future, Visualized

Try it now: https://your-app.vercel.app

✨ Features:
- AI-powered decision scenarios
- Interactive timeline visualization
- Risk assessment & recommendations
- 100% free to use
```

---

## 📚 More Help

- **Quick Start**: [QUICK_START_FREE.md](./QUICK_START_FREE.md)
- **Railway Guide**: [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)
- **Full Guide**: [FREE_DEPLOYMENT_GUIDE.md](./FREE_DEPLOYMENT_GUIDE.md)
- **Testing**: [TESTING_GUIDE.md](./TESTING_GUIDE.md)

---

**Ready to deploy? Start with Step 1 above!** 🚀

**Questions? Check the troubleshooting section or read the detailed guides.** 📖

