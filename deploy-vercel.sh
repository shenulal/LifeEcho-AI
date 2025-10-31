#!/bin/bash

echo "🚀 LifeEcho AI - Vercel Deployment Script"
echo "========================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "🔐 Logging into Vercel..."
vercel login

echo ""
echo "⚙️  Please enter your Railway backend URL:"
echo "   (e.g., https://lifeecho-api.up.railway.app)"
read -p "Backend URL: " BACKEND_URL

echo ""
echo "📁 Deploying frontend to Vercel..."
cd frontend

# Set environment variable
vercel env add NEXT_PUBLIC_API_URL production <<< "$BACKEND_URL"

# Deploy to production
vercel --prod

echo ""
echo "✅ Frontend deployed successfully!"
echo ""
echo "📝 Next steps:"
echo "   1. Copy your Vercel URL from above"
echo "   2. Update CORS_ORIGINS in Railway:"
echo "      railway variables set CORS_ORIGINS=\"https://your-app.vercel.app\""
echo ""
echo "🎉 Your app is now live!"
echo ""

