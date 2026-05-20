# Deployment Guide - AI Code Reviewer

## Option 1: Deploy on Render (Recommended) ⭐

### Step 1: Prepare Your Code
1. Initialize a Git repository in your project folder:
   ```bash
   cd "AI Code Reviewer & Bug Patcher"
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Push to GitHub:
   - Create a new repository on [github.com](https://github.com/new)
   - Follow GitHub's instructions to push your code
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ai-code-reviewer.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy Backend on Render

1. Go to [render.com](https://render.com) and sign up (free)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `ai-code-reviewer-backend`
   - **Runtime**: Node
   - **Build Command**: `cd "Backend App" && npm install`
   - **Start Command**: `cd "Backend App" && npm start`
   - **Region**: Choose closest to you
   - **Plan**: Free (or Paid for better performance)

5. Add Environment Variables:
   ```
   MOCK_API_MODE=true
   NODE_ENV=production
   PORT=5000
   ```

6. Click **"Deploy"** and wait ~2-3 minutes

7. Your backend URL will be: `https://ai-code-reviewer-backend.onrender.com`

### Step 3: Deploy Frontend on Render

1. Click **"New +"** → **"Static Site"**
2. Connect your GitHub repository again
3. Configure:
   - **Name**: `ai-code-reviewer-frontend`
   - **Publish directory**: `Frontend app`
   - **Build Command**: (leave empty - it's static HTML)

4. Go to **Environment** → Add variable:
   ```
   VITE_API_URL=https://ai-code-reviewer-backend.onrender.com
   ```

5. Deploy and get your frontend URL

### Step 4: Update Frontend API URL

Edit `Frontend app/popup.js`:
```javascript
// Replace this line:
const API_BASE_URL = window.API_BASE_URL || localStorage.getItem('API_BASE_URL') || "http://localhost:5000";

// With your Render backend URL:
const API_BASE_URL = "https://ai-code-reviewer-backend.onrender.com";
```

Then commit and push:
```bash
git add .
git commit -m "Update API URL for production"
git push
```

---

## Option 2: Deploy on Railway

1. Go to [railway.app](https://railway.app) and sign up
2. Create a new project
3. Connect your GitHub repository
4. Select "Backend App" folder as root
5. Set environment variables the same way
6. Deploy

Your URL will be automatically generated.

---

## Option 3: Deploy on Heroku

1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Run:
   ```bash
   heroku login
   heroku create your-app-name
   git push heroku main
   ```

---

## Troubleshooting

### Backend returns 404 errors
- Make sure `MOCK_API_MODE=true` in environment variables
- Check that backend is running: `https://your-backend-url/` should return status "Online"

### Frontend can't connect to backend
- Verify backend URL in `popup.js`
- Check browser console for CORS errors
- Make sure backend has CORS enabled (it does by default)

### Free tier goes to sleep
- Services on free tier sleep after 15 min of inactivity
- First request takes ~30 seconds to wake up
- Upgrade to paid tier for continuous uptime

---

## Next Steps

1. ✅ Deploy backend
2. ✅ Deploy frontend
3. ✅ Share your live URL with users
4. ✅ (Optional) Add real API key to enable actual AI analysis

To enable real AI (instead of mock):
- Get an API key from [LLaMA API](https://llama-api.com/) or [Grok API](https://api.groq.com/)
- Update environment variables with your API key
- Set `MOCK_API_MODE=false`

---

## Monitoring & Logs

### On Render:
1. Go to your service dashboard
2. Click **"Logs"** tab to see real-time output
3. Check for errors

### On Railway:
1. Dashboard shows live logs
2. Click service to see detailed logs

---

**Happy hosting! 🚀**
