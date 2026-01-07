# Deployment Guide - Smart Splitter

## Overview

Smart Splitter can be deployed in multiple ways depending on your needs.

## Option 1: Frontend-Only Deployment (Vercel/Netlify) ⭐ Recommended

Since the app uses localStorage, you can deploy just the frontend as a static site.

### Vercel Deployment

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Build the project:**
```bash
npm run build
```

3. **Deploy:**
```bash
vercel --prod
```

Or connect your GitHub repository to Vercel:
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Configure build settings:
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist/public`
  - **Install Command**: `npm install`

### Netlify Deployment

1. **Create `netlify.toml` in project root:**
```toml
[build]
  command = "npm run build"
  publish = "dist/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. **Deploy via Netlify CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

Or use Netlify's GitHub integration:
- Go to [netlify.com](https://netlify.com)
- Click "Add new site"
- Connect your repository
- Settings are auto-detected from `netlify.toml`

## Option 2: Full-Stack Deployment

If you want to add backend functionality in the future:

### Railway

1. Create `railway.json`:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

2. Deploy:
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Render

1. Create `render.yaml`:
```yaml
services:
  - type: web
    name: smart-splitter
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

2. Connect repository to Render dashboard

### Heroku

1. Create `Procfile`:
```
web: npm start
```

2. Deploy:
```bash
heroku login
heroku create smart-splitter-app
git push heroku main
```

## Option 3: Docker Deployment

1. **Create `Dockerfile`:**
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 5000
CMD ["npm", "start"]
```

2. **Build and run:**
```bash
docker build -t smart-splitter .
docker run -p 5000:5000 smart-splitter
```

## Environment Variables for Production

If adding backend functionality, set these environment variables:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=your_mongodb_connection_string
SESSION_SECRET=your_secret_key_here
```

## Post-Deployment Checklist

- [ ] Test authentication flow
- [ ] Verify localStorage works
- [ ] Check all CRUD operations
- [ ] Test on mobile devices
- [ ] Verify toast notifications
- [ ] Test group creation and deletion
- [ ] Check expense adding and deletion
- [ ] Verify balance calculations
- [ ] Test logout functionality

## Current Limitations

Since this is a demo app using localStorage:

1. **Data is per-device**: Different browsers/devices won't share data
2. **No real-time sync**: Changes don't sync across sessions
3. **Browser storage limits**: ~5-10MB depending on browser
4. **No backup**: Clearing browser data loses everything

## Future Backend Integration

To connect to a real backend:

1. Update `useAuthStore.ts` and `useExpenseStore.ts`
2. Replace localStorage calls with API calls
3. Add authentication headers
4. Deploy backend separately
5. Update frontend API base URL

Example:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// In stores
const response = await fetch(`${API_URL}/api/groups`, {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

## Monitoring

For production deployments, consider adding:

- Error tracking (Sentry)
- Analytics (Google Analytics, Plausible)
- Performance monitoring (Web Vitals)
- Uptime monitoring (UptimeRobot)

## Cost Estimates

- **Vercel/Netlify**: Free for hobby projects
- **Railway**: ~$5/month with usage-based pricing
- **Render**: Free tier available, $7/month for paid
- **Heroku**: $5-7/month per dyno

## Support

For deployment issues:
1. Check build logs
2. Verify environment variables
3. Test locally first with `npm run build && npm start`
4. Check browser console for errors

