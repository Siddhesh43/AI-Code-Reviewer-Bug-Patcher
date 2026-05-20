# 🚀 AI Code Reviewer - Quick Deploy Guide

Your application is **ready for production**! Here's how to get it online in minutes.

## ⚡ Super Quick Start (Choose One)

### Option A: Deploy Backend Only (5 min)
If you just want to expose the API:
```bash
cd "Backend App"
npm start
```

### Option B: Deploy Full App on Render (10 min) ⭐ RECOMMENDED

#### What You'll Need:
- ✅ GitHub account (free at github.com)
- ✅ Render account (free at render.com)
- ⏱️ 5-10 minutes

#### Step 1️⃣: Connect to GitHub

```bash
# Your code is already committed locally!
# Now push it to GitHub:

git remote add origin https://github.com/YOUR_USERNAME/ai-code-reviewer.git
git branch -M main
git push -u origin main
```

**💡 First time?** 
1. Create repo at [github.com/new](https://github.com/new)
2. Name it: `ai-code-reviewer`
3. Copy the URL and use above commands

---

#### Step 2️⃣: Deploy Backend on Render

1. Go to [render.com](https://render.com) → Sign up with GitHub
2. Click **"New +" → "Web Service"**
3. Select your GitHub repo
4. **Configure:**
   - **Name:** `ai-code-reviewer-api`
   - **Runtime:** Node
   - **Region:** Choose closest
   - **Build Command:** `cd "Backend App" && npm install`
   - **Start Command:** `cd "Backend App" && npm start`

5. **Environment Variables:**
   ```
   MOCK_API_MODE=true
   NODE_ENV=production
   ```

6. Click **"Create Web Service"** 
   
   ✨ Wait 2-3 minutes...
   
   Your API is live! 🎉
   
   **URL:** `https://YOUR-SERVICE-NAME.onrender.com`

---

#### Step 3️⃣: Deploy Frontend on Render

1. In Render, click **"New +" → "Static Site"**
2. Select your GitHub repo again
3. **Configure:**
   - **Name:** `ai-code-reviewer-web`
   - **Publish directory:** `Frontend app`
   - **Build command:** (leave empty)

4. Click **"Create Static Site"**
   
   ✨ Wait 1-2 minutes...
   
   Your website is live! 🎉
   
   **URL:** `https://YOUR-SITE-NAME.onrender.com`

---

#### Step 4️⃣: Connect Frontend to Backend

Edit `Frontend app/popup.js`:

```javascript
// Find this line:
const API_BASE_URL = window.API_BASE_URL || localStorage.getItem('API_BASE_URL') || "http://localhost:5000";

// Replace with:
const API_BASE_URL = "https://YOUR-BACKEND-URL.onrender.com";
```

Then push the change:
```bash
git add .
git commit -m "Update API URL for production"
git push
```

Render will auto-redeploy! ✨

---

## 🎯 Check Your Deployment

### Backend Health Check
Visit: `https://your-backend-url.onrender.com/`

You should see:
```json
{
  "status": "Online",
  "message": "AI Code Reviewer API is running"
}
```

### Frontend is Live
Visit: `https://your-frontend-url.onrender.com/`

Start reviewing code! 🚀

---

## ⚠️ Important Notes

### Free Tier Limitations
- Services go to sleep after 15 minutes of inactivity
- First request takes ~30 seconds to wake up
- Upgrade to paid for always-on ($7/month)

### Making Changes
1. Edit code locally
2. Push to GitHub: `git push`
3. Render auto-deploys! (takes ~2-3 min)

### To Enable Real AI (Optional)
Instead of mock responses:

1. Get API key:
   - [LLaMA API](https://llama-api.com/) (recommended)
   - [Grok API](https://api.groq.com/)

2. Update environment variables on Render:
   - Add: `LLAMA_API_KEY=your_key_here`
   - Set: `MOCK_API_MODE=false`

---

## 🔧 Alternative Hosting Options

### Railway (Similar to Render)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repo
3. Add environment variables
4. Deploy

### Netlify (Frontend Only)
1. Deploy frontend to [netlify.com](https://netlify.com)
2. Set build command: (empty)
3. Publish directory: `Frontend app`

### Vercel (Frontend)
1. Import from [vercel.com](https://vercel.com)
2. Select GitHub repo and `Frontend app` folder
3. Deploy

---

## 🆘 Troubleshooting

**Q: Backend returns 404 errors**
- ✅ Make sure `MOCK_API_MODE=true` is set
- ✅ Check backend URL in frontend code

**Q: "Connection refused" error**
- ✅ Frontend woke up the backend - wait 30 seconds
- ✅ Verify backend URL is correct

**Q: Frontend is blank/white screen**
- ✅ Check browser console (F12) for errors
- ✅ Clear browser cache: Ctrl+Shift+Delete

**Q: CORS errors**
- ✅ Backend has CORS enabled by default
- ✅ Check backend URL doesn't have trailing `/`

---

## 📊 Monitor Your App

**On Render:**
1. Go to your service dashboard
2. Click "Logs" tab for real-time logs
3. Click "Metrics" to see performance

**Check Response Times:**
- Optimal: < 2 seconds
- Free tier first request: ~30 seconds (normal)

---

## 🎉 Success!

You're now live on the internet! Share your URL with others:

```
Frontend: https://your-frontend-url.onrender.com
```

Users can immediately start using your AI Code Reviewer! 🚀

---

## 📞 Need More Help?

- Render Docs: https://render.com/docs
- GitHub Help: https://docs.github.com
- Node.js: https://nodejs.org/docs
- Report Issues: Create GitHub issue

---

**Happy coding! 💻**
