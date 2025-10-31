# 🚂 Railway Deployment Guide - LifeEcho AI

Complete guide to deploy your backend to Railway for **FREE** (no credit card required).

---

## 🎯 What You'll Get

- ✅ **Free Hosting** - $5/month credit (enough for small apps)
- ✅ **PostgreSQL Database** - Included in free tier
- ✅ **Automatic SSL** - HTTPS by default
- ✅ **Auto Deployments** - Push to GitHub = auto deploy
- ✅ **No Credit Card** - Required to sign up

---

## 🚀 Quick Deploy (5 minutes)

### Method 1: Using Deployment Script (Easiest)

```bash
# Linux/Mac
chmod +x deploy-railway.sh
./deploy-railway.sh

# Windows
deploy-railway.bat
```

The script will:
1. Install Railway CLI
2. Login to Railway
3. Create new project
4. Add PostgreSQL database
5. Set environment variables
6. Deploy your app
7. Generate public URL

### Method 2: Manual Deployment

#### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

#### Step 2: Login

```bash
railway login
```

This will open your browser. Sign up with GitHub (no credit card required).

#### Step 3: Initialize Project

```bash
railway init
```

Choose "Empty Project" and give it a name (e.g., "lifeecho-api").

#### Step 4: Add PostgreSQL

```bash
railway add --plugin postgresql
```

This creates a PostgreSQL database and automatically sets `DATABASE_URL`.

#### Step 5: Set Environment Variables

```bash
# Required variables
railway variables set APP_NAME="LifeEcho AI"
railway variables set APP_ENV="production"
railway variables set DEBUG="false"
railway variables set SECRET_KEY="$(openssl rand -hex 32)"
railway variables set ALGORITHM="HS256"
railway variables set ACCESS_TOKEN_EXPIRE_MINUTES="30"

# Optional (can set later)
railway variables set OPENAI_API_KEY=""  # Leave empty for mock data
railway variables set CORS_ORIGINS="*"   # Update after deploying frontend
```

#### Step 6: Deploy

```bash
railway up
```

Railway will:
- Detect `nixpacks.toml` (preferred) or `Dockerfile`
- Install Python and dependencies
- Start your FastAPI app

#### Step 7: Generate Public URL

```bash
railway domain
```

This creates a public URL like `https://lifeecho-api.up.railway.app`.

---

## 📁 Build Configuration Files

Railway supports multiple build methods. We've included all of them:

### 1. nixpacks.toml (Preferred)

```toml
[phases.setup]
nixPkgs = ["python311", "postgresql"]

[phases.install]
cmds = ["cd backend && pip install -r requirements.txt"]

[start]
cmd = "cd backend && uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"
```

**Pros**: Fast builds, Railway's native builder
**Cons**: None

### 2. Dockerfile (Fallback)

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
```

**Pros**: Full control, works everywhere
**Cons**: Slower builds

### 3. Procfile (Alternative)

```
web: cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
```

**Pros**: Simple, Heroku-compatible
**Cons**: Requires Railway to detect Python automatically

Railway will use them in this order:
1. `nixpacks.toml` (if present)
2. `Dockerfile` (if present)
3. Auto-detection (Procfile + requirements.txt)

---

## ⚙️ Environment Variables

### Required Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `DATABASE_URL` | Auto-generated | PostgreSQL connection string |
| `SECRET_KEY` | Random 32+ chars | JWT signing key |
| `APP_NAME` | LifeEcho AI | Application name |
| `APP_ENV` | production | Environment |
| `DEBUG` | false | Debug mode |
| `ALGORITHM` | HS256 | JWT algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | 30 | Token expiry |

### Optional Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `OPENAI_API_KEY` | sk-... | OpenAI API key (leave empty for mock data) |
| `CORS_ORIGINS` | https://your-app.vercel.app | Frontend URL (set after deploying frontend) |

### How to Set Variables

**Via CLI**:
```bash
railway variables set KEY="value"
```

**Via Dashboard**:
1. Go to [railway.app](https://railway.app)
2. Select your project
3. Click "Variables"
4. Add/edit variables

---

## 🔧 Troubleshooting

### Error: "pip: command not found"

**Cause**: Railway didn't detect Python correctly.

**Fix**: Make sure you have one of these files in your root directory:
- `nixpacks.toml` ✅ (included)
- `Dockerfile` ✅ (included)
- `requirements.txt` in root (not in backend/)

**Quick Fix**:
```bash
# Copy requirements.txt to root
cp backend/requirements.txt .

# Redeploy
railway up
```

### Error: "Database connection failed"

**Cause**: `DATABASE_URL` not set or incorrect.

**Fix**:
```bash
# Check if DATABASE_URL is set
railway variables

# If missing, add PostgreSQL
railway add --plugin postgresql
```

### Error: "Module not found"

**Cause**: Dependencies not installed correctly.

**Fix**: Check build logs:
```bash
railway logs --build
```

Make sure `pip install -r requirements.txt` succeeded.

### Error: "Port already in use"

**Cause**: Railway sets `PORT` environment variable dynamically.

**Fix**: Make sure your start command uses `$PORT`:
```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

This is already configured in `nixpacks.toml` and `Dockerfile`.

### Error: "CORS policy blocked"

**Cause**: `CORS_ORIGINS` doesn't match your frontend URL.

**Fix**:
```bash
# Update CORS_ORIGINS with your exact Vercel URL
railway variables set CORS_ORIGINS="https://your-app.vercel.app"

# No trailing slash!
```

### Slow First Load (30-60 seconds)

**Cause**: Free tier services sleep after 15 minutes of inactivity.

**Fix**: This is normal for free tier. Options:
1. Accept the delay (fine for demos)
2. Use a ping service (e.g., UptimeRobot) to keep it awake
3. Upgrade to paid plan ($5/month)

---

## 📊 Monitoring

### View Logs

```bash
# Real-time logs
railway logs

# Build logs
railway logs --build

# Last 100 lines
railway logs --tail 100
```

### Check Status

```bash
# Service status
railway status

# Resource usage
railway metrics
```

### Dashboard

Go to [railway.app](https://railway.app) to see:
- Deployment history
- Resource usage
- Environment variables
- Database metrics

---

## 💰 Free Tier Limits

| Resource | Free Tier | Notes |
|----------|-----------|-------|
| **Credit** | $5/month | Resets monthly |
| **Execution Time** | 500 hours/month | ~16 hours/day |
| **Memory** | 512 MB | Per service |
| **Storage** | 1 GB | Database |
| **Bandwidth** | Unlimited | No limits |

### Typical Usage

For a small demo app:
- **Backend**: ~$2-3/month
- **Database**: ~$1-2/month
- **Total**: ~$3-5/month (within free tier!)

### Tips to Stay Free

1. **Use mock data** - Set `OPENAI_API_KEY=""` to avoid API costs
2. **Optimize queries** - Reduce database load
3. **Enable caching** - Cache API responses
4. **Monitor usage** - Check Railway dashboard regularly

---

## 🔄 Continuous Deployment

### Connect to GitHub

1. Go to Railway dashboard
2. Select your project
3. Click "Settings" → "Connect to GitHub"
4. Select your repository

Now every push to `main` branch will auto-deploy!

### Manual Deployment

```bash
# Deploy current directory
railway up

# Deploy specific branch
railway up --branch main
```

---

## 🌐 Custom Domain (Optional)

### Add Custom Domain

1. Go to Railway dashboard
2. Select your project
3. Click "Settings" → "Domains"
4. Click "Add Domain"
5. Enter your domain (e.g., `api.yourdomain.com`)
6. Add CNAME record to your DNS:
   ```
   CNAME api.yourdomain.com -> your-app.up.railway.app
   ```

SSL certificate is automatically generated!

---

## 📝 Next Steps

After deploying to Railway:

1. ✅ **Copy your backend URL**:
   ```bash
   railway domain
   ```

2. ✅ **Test your API**:
   - Visit `https://your-app.up.railway.app/docs`
   - Try the endpoints

3. ✅ **Deploy frontend to Vercel**:
   ```bash
   ./deploy-vercel.sh
   ```

4. ✅ **Update CORS**:
   ```bash
   railway variables set CORS_ORIGINS="https://your-app.vercel.app"
   ```

5. ✅ **Test the full app**:
   - Visit your Vercel URL
   - Create account, make decisions, generate scenarios

---

## 🆘 Need Help?

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Railway Discord**: [discord.gg/railway](https://discord.gg/railway)
- **Our Guide**: [FREE_DEPLOYMENT_GUIDE.md](./FREE_DEPLOYMENT_GUIDE.md)

---

**Your backend is now deployed for FREE on Railway!** 🎉

Next: Deploy frontend to Vercel using [deploy-vercel.sh](./deploy-vercel.sh) 🚀

