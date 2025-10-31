#!/bin/bash

echo "🚀 LifeEcho AI - Railway Deployment Script"
echo "=========================================="
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

echo "🔐 Logging into Railway..."
echo "   (This will open your browser)"
railway login

echo ""
echo "📁 Creating new Railway project..."
railway init

echo ""
echo "🗄️  Adding PostgreSQL database..."
railway add --plugin postgresql

echo ""
echo "⚙️  Setting environment variables..."

# Generate a secure secret key
SECRET_KEY=$(openssl rand -hex 32)

railway variables set APP_NAME="LifeEcho AI"
railway variables set APP_ENV="production"
railway variables set DEBUG="false"
railway variables set SECRET_KEY="$SECRET_KEY"
railway variables set ALGORITHM="HS256"
railway variables set ACCESS_TOKEN_EXPIRE_MINUTES="30"
railway variables set OPENAI_API_KEY=""
railway variables set CORS_ORIGINS="*"

echo ""
echo "✅ Environment variables set!"
echo ""
echo "📦 Note: Railway will auto-detect the build method:"
echo "   - Using nixpacks.toml (preferred)"
echo "   - Or Dockerfile as fallback"
echo ""

read -p "Press Enter to continue with deployment..."

echo ""
echo "🚀 Deploying to Railway..."
railway up

echo ""
echo "🌐 Generating public URL..."
railway domain

echo ""
echo "✅ Backend deployed successfully!"
echo ""
echo "📝 Your backend URL:"
railway domain | grep "https://"

echo ""
echo "📝 Next steps:"
echo "   1. Copy your backend URL from above"
echo "   2. (Optional) Set OPENAI_API_KEY: railway variables set OPENAI_API_KEY=\"sk-...\""
echo "   3. Deploy frontend to Vercel using deploy-vercel.sh"
echo "   4. Update CORS_ORIGINS: railway variables set CORS_ORIGINS=\"https://your-app.vercel.app\""
echo ""

