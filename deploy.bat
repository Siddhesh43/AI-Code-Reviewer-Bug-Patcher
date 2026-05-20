@echo off
REM ============================================
REM AI Code Reviewer - Deployment Script
REM ============================================

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║  AI Code Reviewer - One-Click Deployment Setup                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed. Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

echo ✓ Git is installed
echo.

REM Get GitHub username
set /p GITHUB_USERNAME="📝 Enter your GitHub username: "
if "%GITHUB_USERNAME%"=="" (
    echo ❌ GitHub username cannot be empty
    pause
    exit /b 1
)

REM Get repository name
set /p REPO_NAME="📝 Enter repository name (default: ai-code-reviewer): "
if "%REPO_NAME%"=="" set REPO_NAME=ai-code-reviewer

REM Set the remote URL
set GITHUB_URL=https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

echo.
echo ════════════════════════════════════════════════════════════════
echo 🔧 DEPLOYMENT STEPS:
echo ════════════════════════════════════════════════════════════════
echo.
echo Step 1: Push to GitHub
echo ─────────────────────────
echo Run these commands in your terminal:
echo.
echo   git remote add origin %GITHUB_URL%
echo   git branch -M main
echo   git push -u origin main
echo.
echo Step 2: Deploy on Render
echo ─────────────────────────
echo   1. Go to https://render.com
echo   2. Sign up with GitHub account
echo   3. Click "New +" → "Web Service"
echo   4. Select your GitHub repository
echo   5. Configure:
echo      - Build Command: cd "Backend App" ^&^& npm install
echo      - Start Command: cd "Backend App" ^&^& npm start
echo      - Add env variable: MOCK_API_MODE=true
echo   6. Deploy!
echo.
echo Step 3: Deploy Frontend
echo ───────────────────────
echo   1. Create another Static Site service on Render
echo   2. Publish directory: Frontend app
echo   3. Your frontend will be live!
echo.
echo ════════════════════════════════════════════════════════════════
echo.
echo 💡 QUICK LINKS:
echo   • GitHub: https://github.com
echo   • Render: https://render.com
echo   • LLaMA API: https://llama-api.com
echo.
echo For detailed guide, see DEPLOYMENT.md
echo.
pause
