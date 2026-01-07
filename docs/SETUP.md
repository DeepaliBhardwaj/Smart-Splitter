# Smart Splitter - Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Modern web browser

## Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd Smart-Splitter
```

2. **Install dependencies:**
```bash
npm install
```

## Running the Application

### Start Development Server

Run the application in development mode:

```bash
npm run dev
```

The app will automatically open at `http://localhost:5173`

### That's It! 

**No backend setup needed!** Everything runs in your browser. 🎉

## Demo Login

The application is in demo mode with the following features:

- ✅ Enter **any username and password** to login
- ✅ Users are auto-created on first login
- ✅ All data stored in browser localStorage
- ✅ Authentication uses cookies for demonstration

### Example Login
- Username: `john`
- Password: `test123`

**Or any other combination you prefer!**

## Features Available

### 1. Dashboard
- View your expense overview
- See who owes you and who you owe
- Monthly spending charts
- Quick stats

### 2. Groups
- Create new groups
- View all your groups
- Delete groups
- See group members

### 3. Group Details
- Add expenses to a group
- View all group expenses
- See balance calculations
- Delete expenses

### 4. Analytics
- Spending by category
- Visual charts and graphs
- Monthly trends

## Data Storage

All data is stored locally in your browser:
- **localStorage**: Groups, expenses, users
- **Cookies**: Authentication state (`isAuthenticated`)

### Reset All Data

To clear all data and start fresh:

**Method 1: Browser DevTools**
1. Open browser DevTools (F12)
2. Go to Application tab
3. Expand "Local Storage"
4. Right-click on `http://localhost:5173`
5. Click "Clear"
6. Also clear Cookies

**Method 2: Browser Console**
```javascript
localStorage.clear();
document.cookie.split(";").forEach(c => {
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});
location.reload();
```

## Building for Production

Build the optimized production bundle:

```bash
npm run build
```

This creates optimized files in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Port Configuration

The default port is **5173**. To change it:

Edit `vite.config.ts`:

```typescript
export default defineConfig({
  // ... other config
  server: {
    port: 3000, // Change to any available port
  },
});
```

## Troubleshooting

### Port Already in Use

If port 5173 is already in use:

**Option 1**: Kill the process using the port
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

**Option 2**: Change the port in `vite.config.ts` (see above)

### Data Not Persisting

**Issue**: Data disappears on page refresh

**Solutions**:
- Ensure browser allows localStorage for localhost
- Check browser settings - localStorage should be enabled
- Try incognito/private mode to test
- Check browser console for storage errors

### Toast Notifications Not Showing

**Issue**: No success/error messages appear

**Solution**:
- Verify Sonner Toaster is in App.tsx:
```tsx
<Toaster position="top-right" />
```
- Check browser console for errors
- Refresh the page

### Blank Screen After Build

**Issue**: Production build shows blank page

**Solutions**:
- Check browser console for errors
- Verify base path in `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/', // or '/your-repo-name/' for GitHub Pages
});
```
- Run `npm run preview` to test production build locally

### TypeScript Errors

**Issue**: Type errors during development

**Solution**:
```bash
npm run check
```

This runs TypeScript type checking without building.

## Browser DevTools Tips

### View Stored Data

1. Open DevTools (F12)
2. Go to **Application** tab
3. Expand **Local Storage**
4. Click on `http://localhost:5173`
5. See all stored data:
   - `users`
   - `currentUser`
   - `groups`
   - `expenses`

### View Cookies

1. In **Application** tab
2. Expand **Cookies**
3. Click on `http://localhost:5173`
4. See `isAuthenticated` cookie

### Monitor Network (For Learning)

Even though we don't make API calls, you can:
1. Go to **Network** tab
2. See Vite HMR (Hot Module Replacement) WebSocket
3. No API calls - everything is instant!

## Environment Variables

This demo app doesn't require environment variables.

For production with a real backend, create `.env`:

```env
VITE_API_URL=https://your-api.com
VITE_APP_NAME=Smart Splitter
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## IDE Setup

### VS Code (Recommended)

Install these extensions:
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **TypeScript Vue Plugin** - Better TypeScript support

### Settings

Add to `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## Common Tasks

### Add a New Page

1. Create file in `client/src/pages/NewPage.tsx`
2. Add route in `client/src/App.tsx`:
```tsx
<Route path="/new" element={
  <PrivateRoute>
    <NewPage />
  </PrivateRoute>
} />
```
3. Add link in sidebar (`client/src/components/layout/AppLayout.tsx`)

### Add a New Feature

1. Update store (`client/src/store/useExpenseStore.ts`)
2. Add UI components
3. Add toast notifications
4. Test in browser

## Performance Tips

- Use React DevTools to profile components
- Check bundle size with `npm run build`
- Lazy load routes if app grows large
- Optimize images in `public/` folder

## Next Steps

After setup:

1. ✅ Read [Quick Start Guide](QUICK_START.md)
2. ✅ Explore [Features Documentation](FEATURES.md)
3. ✅ Check [Architecture Details](ARCHITECTURE.md)
4. ✅ See [Deployment Guide](DEPLOYMENT.md)
5. ✅ Start building!

## Getting Help

- Check browser console for errors
- Read error messages carefully
- Search GitHub issues
- Ask in discussions
- Read the comprehensive docs

Happy coding! 🚀
