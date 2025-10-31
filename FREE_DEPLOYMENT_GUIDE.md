# 🆓 Free Deployment Guide - LifeEcho AI

This guide provides **100% free deployment options** that don't require payment information.

---

## 🎯 Best Free Options (No Credit Card Required)

### **Option 1: Vercel + Railway** ⭐ RECOMMENDED
- **Frontend**: Vercel (Free forever)
- **Backend + Database**: Railway (Free $5/month credit)
- **Total Cost**: $0/month
- **Setup Time**: 20 minutes

### **Option 2: Netlify + Supabase**
- **Frontend**: Netlify (Free forever)
- **Backend**: Netlify Functions (Free tier)
- **Database**: Supabase (Free tier)
- **Total Cost**: $0/month
- **Setup Time**: 30 minutes

### **Option 3: GitHub Pages + PythonAnywhere**
- **Frontend**: GitHub Pages (Free)
- **Backend**: PythonAnywhere (Free tier)
- **Database**: SQLite (File-based)
- **Total Cost**: $0/month
- **Setup Time**: 25 minutes

---

## 🚀 Option 1: Vercel + Railway (RECOMMENDED)

### **Step 1: Deploy Backend to Railway**

1. **Sign up for Railway**:
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub (no credit card required)
   - Get $5 free credit per month

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your LifeEcho-AI repository

3. **Configure Backend Service**:
   - Railway will auto-detect Python
   - Add these environment variables:
     ```
     APP_NAME=LifeEcho AI
     APP_ENV=production
     DEBUG=false
     SECRET_KEY=your-secret-key-min-32-characters
     ALGORITHM=HS256
     ACCESS_TOKEN_EXPIRE_MINUTES=30
     OPENAI_API_KEY=your-openai-api-key
     CORS_ORIGINS=https://your-app.vercel.app
     ```

4. **Add PostgreSQL Database**:
   - Click "+ New" → "Database" → "PostgreSQL"
   - Railway will auto-create `DATABASE_URL` variable
   - Link it to your backend service

5. **Configure Build Settings**:
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

6. **Deploy**:
   - Click "Deploy"
   - Copy your backend URL (e.g., `https://lifeecho-api.up.railway.app`)

### **Step 2: Deploy Frontend to Vercel**

1. **Sign up for Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub (no credit card required)

2. **Import Project**:
   - Click "Add New" → "Project"
   - Import your LifeEcho-AI repository

3. **Configure Build Settings**:
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Add Environment Variable**:
   ```
   NEXT_PUBLIC_API_URL=https://lifeecho-api.up.railway.app
   ```

5. **Deploy**:
   - Click "Deploy"
   - Your app will be live at `https://your-app.vercel.app`

6. **Update Backend CORS**:
   - Go back to Railway
   - Update `CORS_ORIGINS` to your Vercel URL

### **Done! 🎉**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://lifeecho-api.up.railway.app`
- API Docs: `https://lifeecho-api.up.railway.app/docs`

---

## 🚀 Option 2: Netlify + Supabase

### **Step 1: Setup Supabase Database**

1. **Sign up for Supabase**:
   - Go to [supabase.com](https://supabase.com)
   - Sign up with GitHub (no credit card required)

2. **Create New Project**:
   - Click "New Project"
   - Choose a name and password
   - Select region (closest to you)

3. **Get Database URL**:
   - Go to Settings → Database
   - Copy "Connection String" (URI format)
   - Replace `[YOUR-PASSWORD]` with your database password

4. **Create Tables**:
   - Go to SQL Editor
   - Run this SQL:
   ```sql
   CREATE TABLE users (
       id VARCHAR PRIMARY KEY,
       email VARCHAR UNIQUE NOT NULL,
       hashed_password VARCHAR NOT NULL,
       full_name VARCHAR,
       is_active BOOLEAN DEFAULT true,
       created_at TIMESTAMP DEFAULT NOW(),
       updated_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE decisions (
       id VARCHAR PRIMARY KEY,
       user_id VARCHAR REFERENCES users(id),
       title VARCHAR(500) NOT NULL,
       description TEXT,
       category VARCHAR(100),
       context JSONB,
       status VARCHAR(50) DEFAULT 'draft',
       created_at TIMESTAMP DEFAULT NOW(),
       updated_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE scenarios (
       id VARCHAR PRIMARY KEY,
       decision_id VARCHAR REFERENCES decisions(id),
       title VARCHAR(500) NOT NULL,
       description TEXT,
       probability FLOAT,
       timeline_data JSONB,
       outcomes JSONB,
       risks JSONB,
       recommendations TEXT,
       rank INTEGER,
       created_at TIMESTAMP DEFAULT NOW()
   );
   ```

### **Step 2: Deploy to Netlify**

1. **Sign up for Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub (no credit card required)

2. **Deploy Frontend**:
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select your repository
   - Build settings:
     - Base directory: `frontend`
     - Build command: `npm run build`
     - Publish directory: `frontend/.next`
   - Add environment variable:
     ```
     NEXT_PUBLIC_API_URL=https://your-site.netlify.app/.netlify/functions
     ```

3. **Deploy Backend as Netlify Functions**:
   - This requires converting FastAPI to serverless functions
   - See "Converting to Serverless" section below

---

## 🚀 Option 3: Local Deployment (For Testing)

If you just want to test locally and share via ngrok:

### **Step 1: Setup Local Environment**

```bash
# Run setup script
./setup.sh  # Linux/Mac
setup.bat   # Windows

# Start backend
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn main:app --reload

# Start frontend (new terminal)
cd frontend
npm run dev
```

### **Step 2: Expose with ngrok**

1. **Install ngrok**:
   - Download from [ngrok.com](https://ngrok.com)
   - Sign up for free account

2. **Expose Backend**:
   ```bash
   ngrok http 8000
   ```
   - Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)

3. **Update Frontend**:
   - Edit `frontend/.env.local`:
     ```
     NEXT_PUBLIC_API_URL=https://abc123.ngrok.io
     ```
   - Restart frontend

4. **Expose Frontend**:
   ```bash
   ngrok http 3000
   ```
   - Share this URL with customers

**Note**: ngrok free tier URLs change on restart. For permanent URLs, use Option 1 or 2.

---

## 🔧 Quick Setup Scripts

### **Railway Deployment Script**

Create `deploy-railway.sh`:

```bash
#!/bin/bash

echo "🚀 Deploying to Railway..."

# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Create new project
railway init

# Add PostgreSQL
railway add --plugin postgresql

# Set environment variables
railway variables set APP_NAME="LifeEcho AI"
railway variables set APP_ENV="production"
railway variables set DEBUG="false"
railway variables set SECRET_KEY="$(openssl rand -hex 32)"
railway variables set ALGORITHM="HS256"
railway variables set ACCESS_TOKEN_EXPIRE_MINUTES="30"

echo "⚠️  Please set these manually:"
echo "  - OPENAI_API_KEY"
echo "  - CORS_ORIGINS"

# Deploy
railway up

echo "✅ Backend deployed!"
echo "📝 Copy your backend URL and use it in Vercel"
```

### **Vercel Deployment Script**

Create `deploy-vercel.sh`:

```bash
#!/bin/bash

echo "🚀 Deploying to Vercel..."

# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod

echo "✅ Frontend deployed!"
echo "📝 Update CORS_ORIGINS in Railway with your Vercel URL"
```

---

## 💡 Tips for Free Tier

### **Reduce Costs**:
1. **Use Mock Data**: Set `OPENAI_API_KEY=""` to use mock scenarios (no API costs)
2. **Optimize Images**: Use Next.js Image optimization
3. **Enable Caching**: Cache API responses
4. **Limit Requests**: Add rate limiting

### **Free Tier Limitations**:

**Railway**:
- $5/month credit (usually enough for small apps)
- Services sleep after inactivity
- 500 hours/month execution time

**Vercel**:
- 100 GB bandwidth/month
- Unlimited deployments
- Serverless function timeout: 10 seconds

**Supabase**:
- 500 MB database
- 2 GB bandwidth/month
- Unlimited API requests

---

## 🎯 Recommended Setup for Demo

For showing to customers without any costs:

1. **Frontend**: Vercel (free, fast, reliable)
2. **Backend**: Railway (free $5 credit)
3. **Database**: Railway PostgreSQL (included in $5 credit)
4. **AI**: Use mock data (set `OPENAI_API_KEY=""`)

**Total Cost**: $0/month  
**Setup Time**: 20 minutes  
**Reliability**: High

---

## 📞 Need Help?

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)

---

**Ready to deploy for free? Start with Option 1 (Vercel + Railway)!** 🚀

