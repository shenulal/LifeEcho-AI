# LifeEcho AI - MVP

> **"Your future, visualized and optimized before it happens."**

A fully functional MVP of LifeEcho AI - an AI-powered predictive decision companion that helps you visualize and optimize decisions before making them.

---

## ��� Features

- ✅ **User Authentication** - Secure JWT-based registration and login
- ✅ **Decision Management** - Create, view, update, and delete decisions
- ✅ **AI Scenario Generation** - Generate 3-5 future scenarios using OpenAI GPT-4
- ✅ **Financial Projections** - Interactive 5-year income charts
- ✅ **Timeline Visualization** - Key milestones and events
- ✅ **Risk Assessment** - Severity-based risk analysis with mitigation strategies
- ✅ **AI Recommendations** - Actionable advice for each scenario
- ✅ **Responsive Design** - Works beautifully on desktop, tablet, and mobile

---

## 🚀 Quick Deploy (100% FREE - No Credit Card Required!)

### 🆓 Free Deployment Options

**Option 1: Vercel + Railway** ⭐ RECOMMENDED
- **Cost**: $0/month (Railway gives $5 free credit)
- **Time**: 20 minutes
- **No credit card required**

**Option 2: Local + ngrok** (For quick testing)
- **Cost**: $0/month
- **Time**: 5 minutes
- **Perfect for demos**

📖 **Complete Guide**: See [FREE_DEPLOYMENT_GUIDE.md](./FREE_DEPLOYMENT_GUIDE.md)

---

### Quick Start - Vercel + Railway

**Step 1: Deploy Backend to Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Run deployment script
chmod +x deploy-railway.sh
./deploy-railway.sh  # Linux/Mac
deploy-railway.bat   # Windows
```

**Step 2: Deploy Frontend to Vercel**
```bash
# Install Vercel CLI
npm install -g vercel

# Run deployment script
chmod +x deploy-vercel.sh
./deploy-vercel.sh  # Linux/Mac
deploy-vercel.bat   # Windows
```

**Done!** Your app is live at:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-app.up.railway.app`
- API Docs: `https://your-app.up.railway.app/docs`

📖 **Detailed Instructions**: See [FREE_DEPLOYMENT_GUIDE.md](./FREE_DEPLOYMENT_GUIDE.md)

---

## ��� Local Development

### Quick Setup

**Linux/Mac**: `./setup.sh`
**Windows**: `setup.bat`

### Manual Setup

**Backend**:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

**Frontend**:
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

**Access**: http://localhost:3000

---

## ���️ Tech Stack

**Backend**: FastAPI, PostgreSQL, SQLAlchemy, OpenAI GPT-4, JWT
**Frontend**: Next.js 14, TypeScript, TailwindCSS, Recharts, Zustand
**Deployment**: Render, GitHub

---

## ��� Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Testing procedures
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - File structure
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture
- **[TECHNICAL_SPECIFICATIONS.md](./TECHNICAL_SPECIFICATIONS.md)** - API specs
- **[IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md)** - Future roadmap

---

## ��� Cost Estimate

**Free Tier**: ~$1-5/month (Render free + OpenAI API)
**Production**: ~$31-71/month (Render $21 + OpenAI $10-50)

---

## ��� Quick Demo

1. Create account
2. Create decision: "Switch from Finance to Software Engineering"
3. Generate scenarios (10-30 seconds)
4. Explore 3 AI-generated scenarios with charts, timelines, risks, and recommendations

---

**Built with ❤️ for LifeEcho AI**

Ready to visualize your future? [Get Started](#-quick-deploy-to-render-15-minutes) ���
