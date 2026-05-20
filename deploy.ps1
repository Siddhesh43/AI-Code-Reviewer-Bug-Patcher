# ============================================
# AI Code Reviewer - Deployment Helper
# ============================================

Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  AI Code Reviewer - Deployment Setup                          ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    $gitVersion = git --version
    Write-Host "✓ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git is not installed. Please install from https://git-scm.com/" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Yellow
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Yellow
Write-Host ""

Write-Host "1️⃣  CREATE GITHUB REPOSITORY" -ForegroundColor Cyan
Write-Host "   • Go to: https://github.com/new" -ForegroundColor White
Write-Host "   • Name: ai-code-reviewer" -ForegroundColor White
Write-Host "   • Create repository" -ForegroundColor White
Write-Host ""

$username = Read-Host "📝 Enter your GitHub username"
$repo = Read-Host "📝 Enter repository name (default: ai-code-reviewer)"

if ([string]::IsNullOrWhiteSpace($repo)) {
    $repo = "ai-code-reviewer"
}

$gitUrl = "https://github.com/$username/$repo.git"

Write-Host ""
Write-Host "2️⃣  PUSH YOUR CODE" -ForegroundColor Cyan
Write-Host "   Running: git remote add origin $gitUrl" -ForegroundColor White

try {
    git remote add origin $gitUrl
    Write-Host "   ✓ Remote added" -ForegroundColor Green
} catch {
    Write-Host "   • Remote might already exist (that's OK)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "   Running: git branch -M main && git push -u origin main" -ForegroundColor White

try {
    git branch -M main
    git push -u origin main
    Write-Host "   ✓ Code pushed to GitHub successfully!" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Push failed. Make sure:" -ForegroundColor Red
    Write-Host "     • Repository exists on GitHub" -ForegroundColor White
    Write-Host "     • You have git credentials configured" -ForegroundColor White
    Write-Host "     • You have internet connection" -ForegroundColor White
    exit
}

Write-Host ""
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Yellow
Write-Host "3️⃣  DEPLOY ON RENDER" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Yellow
Write-Host ""
Write-Host "✓ Your code is on GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Go to: https://render.com" -ForegroundColor White
Write-Host "  2. Sign up with GitHub" -ForegroundColor White
Write-Host "  3. Create Web Service" -ForegroundColor White
Write-Host "  4. Select: $repo" -ForegroundColor White
Write-Host ""
Write-Host "  Build Command: cd ""Backend App"" && npm install" -ForegroundColor White
Write-Host "  Start Command: cd ""Backend App"" && npm start" -ForegroundColor White
Write-Host ""
Write-Host "  Environment Variable:" -ForegroundColor White
Write-Host "    MOCK_API_MODE=true" -ForegroundColor White
Write-Host ""
Write-Host "  Then click Deploy!" -ForegroundColor White
Write-Host ""

Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Yellow
Write-Host "✨ LINKS:" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Yellow
Write-Host "  📚 Deployment Guide: DEPLOY_NOW.md (in your folder)" -ForegroundColor Cyan
Write-Host "  🔗 GitHub: https://github.com/$username/$repo" -ForegroundColor Cyan
Write-Host "  🚀 Render: https://render.com" -ForegroundColor Cyan
Write-Host ""

Write-Host "Press any key to continue..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
