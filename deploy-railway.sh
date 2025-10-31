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

echo ""
echo "⚠️  IMPORTANT: You need to set these variables manually:"
echo ""
echo "   1. OPENAI_API_KEY - Your OpenAI API key (or leave empty for mock data)"
echo "   2. CORS_ORIGINS - Your frontend URL (e.g., https://your-app.vercel.app)"
echo ""
echo "   Run these commands:"
echo "   railway variables set OPENAI_API_KEY=\"your-key-here\""
echo "   railway variables set CORS_ORIGINS=\"https://your-app.vercel.app\""
echo ""

read -p "Press Enter to continue with deployment..."

echo ""
echo "🚀 Deploying to Railway..."
railway up

echo ""
echo "✅ Backend deployed successfully!"
echo ""
echo "📝 Next steps:"
echo "   1. Get your backend URL: railway domain"
echo "   2. Set OPENAI_API_KEY and CORS_ORIGINS variables"
echo "   3. Deploy frontend to Vercel using deploy-vercel.sh"
echo ""

