# LifeEcho AI - Deployment Guide for Render

This guide will help you deploy the LifeEcho AI application to Render.com.

---

## 📋 Prerequisites

Before deploying, ensure you have:

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **OpenAI API Key**: Get one from [platform.openai.com](https://platform.openai.com/api-keys)
4. **Git**: Installed on your local machine

---

## 🚀 Quick Deployment Steps

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - LifeEcho AI MVP"
```

2. **Create GitHub Repository**:
   - Go to GitHub and create a new repository named `LifeEcho-AI`
   - Don't initialize with README (we already have files)

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/LifeEcho-AI.git
git branch -M main
git push -u origin main
```

---

### Step 2: Deploy to Render

#### Option A: Using render.yaml (Recommended)

1. **Connect GitHub to Render**:
   - Log in to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Blueprint"
   - Connect your GitHub account
   - Select the `LifeEcho-AI` repository
   - Render will detect the `render.yaml` file

2. **Configure Environment Variables**:
   
   After the blueprint is created, you need to set these environment variables manually:

   **For Backend (lifeecho-api)**:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `CORS_ORIGINS`: Your frontend URL (will be `https://lifeecho-frontend.onrender.com`)
   
   **For Frontend (lifeecho-frontend)**:
   - `NEXT_PUBLIC_API_URL`: Your backend URL (will be `https://lifeecho-api.onrender.com`)

3. **Deploy**:
   - Click "Apply" to start the deployment
   - Wait for both services to build and deploy (5-10 minutes)

#### Option B: Manual Deployment

If you prefer manual setup:

**Deploy Database**:
1. Go to Render Dashboard → "New +" → "PostgreSQL"
2. Name: `lifeecho-db`
3. Database: `lifeecho`
4. User: `lifeecho`
5. Region: Oregon (or your preferred region)
6. Plan: Free (for testing) or Starter
7. Click "Create Database"
8. Copy the "Internal Database URL"

**Deploy Backend**:
1. Go to Render Dashboard → "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `lifeecho-api`
   - **Region**: Oregon
   - **Branch**: main
   - **Root Directory**: (leave empty)
   - **Environment**: Python 3
   - **Build Command**: `cd backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free (for testing) or Starter

4. Add Environment Variables:
   ```
   APP_NAME=LifeEcho AI
   APP_ENV=production
   DEBUG=False
   DATABASE_URL=<paste the Internal Database URL>
   SECRET_KEY=<generate a random string>
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   OPENAI_API_KEY=<your OpenAI API key>
   CORS_ORIGINS=https://lifeecho-frontend.onrender.com
   ```

5. Click "Create Web Service"

**Deploy Frontend**:
1. Go to Render Dashboard → "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `lifeecho-frontend`
   - **Region**: Oregon
   - **Branch**: main
   - **Root Directory**: (leave empty)
   - **Environment**: Node
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Start Command**: `cd frontend && npm start`
   - **Plan**: Free (for testing) or Starter

4. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://lifeecho-api.onrender.com
   ```

5. Click "Create Web Service"

---

### Step 3: Update CORS Settings

After both services are deployed:

1. Go to your backend service settings
2. Update the `CORS_ORIGINS` environment variable with your actual frontend URL
3. The service will automatically redeploy

---

### Step 4: Test Your Deployment

1. **Access Frontend**: Go to `https://lifeecho-frontend.onrender.com`
2. **Create Account**: Register a new user
3. **Create Decision**: Test the decision creation flow
4. **Generate Scenarios**: Click "Generate Scenarios" to test AI integration

---

## 🔧 Configuration Details

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `APP_NAME` | Application name | `LifeEcho AI` |
| `APP_ENV` | Environment | `production` |
| `DEBUG` | Debug mode | `False` |
| `DATABASE_URL` | PostgreSQL connection string | Provided by Render |
| `SECRET_KEY` | JWT secret key | Random 32+ character string |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration | `30` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |
| `CORS_ORIGINS` | Allowed origins | `https://lifeecho-frontend.onrender.com` |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://lifeecho-api.onrender.com` |

---

## 💡 Important Notes

### Free Tier Limitations

Render's free tier has some limitations:

1. **Services spin down after 15 minutes of inactivity**
   - First request after inactivity may take 30-60 seconds
   - Consider upgrading to Starter plan for production

2. **750 hours/month free**
   - Enough for testing and demos
   - Multiple services share this quota

3. **Database**:
   - Free tier: 90 days, then expires
   - Starter tier: $7/month for persistent database

### Performance Tips

1. **Keep Services Warm**:
   - Use a service like UptimeRobot to ping your app every 14 minutes
   - Or upgrade to paid plan

2. **Database Connection**:
   - Use connection pooling (already configured)
   - Monitor connection limits

3. **API Keys**:
   - OpenAI API has usage costs
   - Monitor your usage at platform.openai.com
   - Set usage limits to avoid unexpected charges

---

## 🐛 Troubleshooting

### Backend Won't Start

**Check Logs**:
- Go to Render Dashboard → Your Service → Logs
- Look for error messages

**Common Issues**:
1. **Database connection failed**:
   - Verify `DATABASE_URL` is set correctly
   - Check database is running

2. **Module not found**:
   - Ensure `requirements.txt` is complete
   - Check build logs

3. **Port binding error**:
   - Ensure using `--port $PORT` in start command

### Frontend Won't Build

**Common Issues**:
1. **API URL not set**:
   - Verify `NEXT_PUBLIC_API_URL` environment variable

2. **Build timeout**:
   - Free tier has build time limits
   - Optimize dependencies

3. **Module errors**:
   - Clear build cache in Render settings
   - Redeploy

### CORS Errors

If you see CORS errors in browser console:

1. **Check Backend CORS_ORIGINS**:
   - Must include your frontend URL
   - No trailing slash
   - Use comma to separate multiple origins

2. **Redeploy Backend**:
   - After changing CORS settings
   - Wait for deployment to complete

### Database Issues

1. **Connection Pool Exhausted**:
   - Restart backend service
   - Check for connection leaks

2. **Database Not Found**:
   - Verify database name matches
   - Check DATABASE_URL format

---

## 🔄 Updating Your Deployment

### Automatic Deployments

Render automatically deploys when you push to GitHub:

```bash
# Make changes to your code
git add .
git commit -m "Your commit message"
git push origin main
```

Render will detect the push and redeploy automatically.

### Manual Deployment

1. Go to Render Dashboard
2. Select your service
3. Click "Manual Deploy" → "Deploy latest commit"

---

## 📊 Monitoring

### View Logs

1. Go to Render Dashboard
2. Select your service
3. Click "Logs" tab
4. View real-time logs

### Metrics

1. Go to service dashboard
2. View:
   - CPU usage
   - Memory usage
   - Request count
   - Response times

---

## 💰 Cost Estimation

### Free Tier (Testing/Demo)
- **Render**: $0/month (with limitations)
- **OpenAI API**: ~$1-5/month (light usage)
- **Total**: ~$1-5/month

### Production (Starter Plan)
- **Backend**: $7/month
- **Frontend**: $7/month
- **Database**: $7/month
- **OpenAI API**: $10-50/month (depends on usage)
- **Total**: ~$31-71/month

---

## 🎯 Next Steps

After successful deployment:

1. **Custom Domain** (Optional):
   - Go to service settings
   - Add custom domain
   - Update DNS records

2. **SSL Certificate**:
   - Automatically provided by Render
   - No configuration needed

3. **Monitoring**:
   - Set up error tracking (Sentry)
   - Add analytics (Google Analytics)

4. **Backup**:
   - Set up database backups
   - Export data regularly

5. **Scale**:
   - Monitor usage
   - Upgrade plans as needed
   - Add caching (Redis)

---

## 📞 Support

### Render Support
- Documentation: [render.com/docs](https://render.com/docs)
- Community: [community.render.com](https://community.render.com)

### OpenAI Support
- Documentation: [platform.openai.com/docs](https://platform.openai.com/docs)
- Help: [help.openai.com](https://help.openai.com)

---

## ✅ Deployment Checklist

Before showing to customers:

- [ ] Backend deployed and running
- [ ] Frontend deployed and running
- [ ] Database connected
- [ ] OpenAI API key configured
- [ ] CORS configured correctly
- [ ] User registration works
- [ ] User login works
- [ ] Decision creation works
- [ ] Scenario generation works
- [ ] All visualizations display correctly
- [ ] Mobile responsive
- [ ] No console errors
- [ ] SSL certificate active
- [ ] Custom domain configured (optional)

---

**Congratulations!** 🎉 Your LifeEcho AI application is now live and ready to demo to customers!

Access your app at:
- Frontend: `https://lifeecho-frontend.onrender.com`
- Backend API: `https://lifeecho-api.onrender.com`
- API Docs: `https://lifeecho-api.onrender.com/docs`

