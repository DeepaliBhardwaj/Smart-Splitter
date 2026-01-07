# Deploy to Vercel - Step by Step

## ✅ Files Already Configured

Your project now has:
- ✅ `vercel.json` - Routing configuration
- ✅ `.vercelignore` - Ignore unnecessary files
- ✅ `vite.config.ts` - Correct build output (`dist/`)

## 🚀 Deploy Methods

### Method 1: Vercel CLI (Fastest)

1. **Install Vercel CLI** (if not installed):
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel --prod
```

That's it! Your app will be live!

---

### Method 2: GitHub Integration (Recommended)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Build Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Deploy**:
   - Click "Deploy"
   - Wait ~2 minutes
   - Done! ✅

---

### Method 3: Manual Upload

1. **Build locally**:
```bash
npm run build
```

2. **Upload** the `dist/` folder to Vercel dashboard

---

## 🔧 Configuration Explained

### vercel.json
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Why?** This ensures all routes (like `/groups`, `/dashboard`) are handled by React Router, not Vercel's server. Without this, you get 404 errors when refreshing pages.

### Build Settings
- **Build Command**: `npm run build` (runs Vite build)
- **Output Directory**: `dist` (where Vite outputs files)
- **Install Command**: `npm install` (installs dependencies)

---

## 🐛 Troubleshooting

### Issue: 404 on Routes
**Solution**: Make sure `vercel.json` exists with rewrites configuration

### Issue: Build Fails
**Solutions**:
1. Delete `node_modules` and `.vite` folders locally
2. Run `npm install` fresh
3. Test build locally: `npm run build`
4. Check build logs on Vercel dashboard

### Issue: Blank Page
**Solutions**:
1. Check browser console for errors
2. Verify `dist/` folder has `index.html` and assets
3. Make sure vite.config.ts has correct `root` and `outDir`

### Issue: Assets Not Loading
**Solution**: Ensure `base` in vite.config.ts is set correctly:
```typescript
export default defineConfig({
  base: '/', // For custom domain or vercel.app
  // base: '/repo-name/', // For GitHub Pages
});
```

---

## ✅ Post-Deployment Checklist

After deployment, test:
- [ ] Homepage loads
- [ ] Login works (any credentials)
- [ ] Dashboard shows
- [ ] Create group works
- [ ] Add expense works
- [ ] All routes work (try refreshing on different pages)
- [ ] Toast notifications appear
- [ ] Mobile responsive
- [ ] Browser back/forward buttons work

---

## 🌐 Custom Domain

1. **Go to Vercel Dashboard** → Your Project → Settings → Domains
2. **Add Domain**: Enter your domain (e.g., `myapp.com`)
3. **Configure DNS**: Add records as shown by Vercel
4. **Wait**: DNS propagation takes 5-60 minutes
5. **Done**: Visit your custom domain!

---

## 🔄 Auto-Deploy on Push

With GitHub integration:
- **Every push to `main`** → Auto deploys to production
- **Every push to other branches** → Creates preview deployment
- **Pull Requests** → Auto preview link

---

## 📊 Monitor Your App

**Vercel Dashboard provides**:
- Real-time analytics
- Build logs
- Deployment history
- Error tracking
- Performance metrics

---

## 💡 Pro Tips

1. **Environment Variables**: Go to Settings → Environment Variables if you add backend later
2. **Preview Deployments**: Test changes on preview URLs before merging to main
3. **Rollback**: Instantly rollback to previous deployment if something breaks
4. **Custom Headers**: Add security headers in `vercel.json` if needed
5. **Edge Functions**: Add serverless functions later if needed

---

## 📱 Share Your App

After deployment, share:
- Production URL: `https://your-app.vercel.app`
- Or custom domain: `https://yourdomain.com`

Anyone can access and test your Smart Splitter app!

---

## 🎉 You're Live!

Your Smart Splitter app is now:
- ✅ Deployed on Vercel
- ✅ Auto-deploys on push
- ✅ Has HTTPS enabled
- ✅ Has CDN caching
- ✅ Has preview deployments
- ✅ Accessible worldwide!

**Cost**: FREE on Vercel's hobby plan! 🎉

