@echo off
REM LifeEcho AI - Local Setup Script for Windows

echo ========================================
echo LifeEcho AI - Local Setup
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed. Please install Python 3.10 or higher.
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18 or higher.
    exit /b 1
)

echo [OK] Prerequisites check passed
echo.

REM Setup Backend
echo Setting up Backend...
cd backend

REM Create virtual environment
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment and install dependencies
echo Installing Python dependencies...
call venv\Scripts\activate.bat
pip install -r requirements.txt

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo Creating .env file...
    copy .env.example .env
    echo.
    echo [WARNING] Please edit backend\.env and add your configuration:
    echo    - DATABASE_URL
    echo    - SECRET_KEY
    echo    - OPENAI_API_KEY
)

cd ..

REM Setup Frontend
echo.
echo Setting up Frontend...
cd frontend

REM Install dependencies
echo Installing Node.js dependencies...
call npm install

REM Create .env.local file if it doesn't exist
if not exist ".env.local" (
    echo Creating .env.local file...
    copy .env.local.example .env.local
)

cd ..

echo.
echo ========================================
echo Setup complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit backend\.env with your configuration
echo 2. Create PostgreSQL database
echo 3. Start backend: cd backend ^&^& venv\Scripts\activate ^&^& uvicorn main:app --reload
echo 4. Start frontend: cd frontend ^&^& npm run dev
echo.
echo Access the app at: http://localhost:3000
echo API docs at: http://localhost:8000/docs
echo.
pause

