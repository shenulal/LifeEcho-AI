@echo off
echo ========================================
echo LifeEcho AI - Vercel Deployment Script
echo ========================================
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Installing Vercel CLI...
    npm install -g vercel
)

echo Logging into Vercel...
vercel login

echo.
set /p BACKEND_URL="Enter your Railway backend URL (e.g., https://lifeecho-api.up.railway.app): "

echo.
echo Deploying frontend to Vercel...
cd frontend

REM Create .env.production file
echo NEXT_PUBLIC_API_URL=%BACKEND_URL% > .env.production

echo.
echo Deploying to production...
REM Deploy to production with environment variable
vercel --prod -e NEXT_PUBLIC_API_URL="%BACKEND_URL%"

echo.
echo Frontend deployed successfully!
echo.
echo Next steps:
echo   1. Copy your Vercel URL from above
echo   2. Update CORS_ORIGINS in Railway:
echo      railway variables set CORS_ORIGINS="https://your-app.vercel.app"
echo.
echo Your app is now live!
echo.

pause

