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

## ��� Quick Deploy to Render (15 minutes)

### Prerequisites
- GitHub account
- Render account (free tier works)
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Steps

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "LifeEcho AI MVP"
   git remote add origin https://github.com/shenulal/LifeEcho-AI.git
   git push -u origin main
   ```

2. **Deploy on Render**:
   - Go to [render.com](https://render.com)
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will auto-detect `render.yaml`

3. **Configure Environment Variables**:
   
   **Backend**: `OPENAI_API_KEY`, `CORS_ORIGINS`
   **Frontend**: `NEXT_PUBLIC_API_URL`

4. **Access Your App**:
   - Frontend: `https://lifeecho-frontend.onrender.com`
   - API Docs: `https://lifeecho-api.onrender.com/docs`

��� **Detailed Instructions**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

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
