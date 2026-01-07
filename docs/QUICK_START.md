# 🚀 Quick Start Guide

## Get Up and Running in 1 Minute!

### Step 1: Install & Run

```bash
npm install
npm run dev
```

### Step 2: Open Browser

Visit: **http://localhost:5173**

### Step 3: Login

Enter **any username and password**:
- Username: `demo`
- Password: `demo`

Or use whatever you like - they all work! 🎉

### That's It! No Backend Setup Needed! ✨

---

## Explore the App

### 1. Create a Group (30 seconds)

- Click "**Create Group**" on the Groups page
- Enter name: `Weekend Trip`
- Select type: `Trip`
- Click "**Create Group**"
- ✅ Toast notification appears!

### 2. Add an Expense (30 seconds)

- Click on your group card
- Click "**Add Expense**"
- Description: `Dinner`
- Amount: `50`
- Category: `Food` 🍔
- Click "**Add Expense**"
- ✅ Appears instantly!

### 3. Check Dashboard (15 seconds)

- Click "**Dashboard**" in sidebar
- See your spending stats
- View the monthly chart
- Check recent expenses

### 4. View Analytics (15 seconds)

- Click "**Analytics**" in sidebar
- See category pie chart
- View spending trends

---

## 🎯 Features to Test

### ✅ Authentication
- Login with any credentials
- Logout from sidebar
- Try accessing `/groups` without login (redirects!)
- Refresh page (stays logged in via cookies)

### ✅ Groups
- Create a group (Trip, Home, Couple, Other)
- View all groups
- Delete a group (confirmation dialog)
- See group members and stats

### ✅ Expenses
- Add expense to group
- View expense list with categories
- Delete an expense
- Check automatic balance calculations

### ✅ UI/UX
- Hover over cards (elevation effect)
- Watch toast notifications (3s auto-close)
- Try on mobile browser
- Check empty states

---

## 📱 Test on Mobile

### Get Local IP:
```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

### Open on Phone:
```
http://YOUR_IP_ADDRESS:5173
```

Example: `http://192.168.1.100:5173`

---

## 🎓 5-Minute Demo Script

Perfect for presentations:

**00:00-00:30** - Introduction
> "Smart Splitter - a modern expense splitting app. Built with React & TypeScript, all data in browser localStorage."

**00:30-01:00** - Login
> "Demo mode - any credentials work. Notice the disclaimer. Let me login... success toast!"

**01:00-02:00** - Create Group
> "Create a group for a weekend trip... instant creation with toast feedback."

**02:00-03:00** - Add Expenses
> "Add expenses with emojis... $50 for dinner... appears immediately!"

**03:00-04:00** - Dashboard & Analytics
> "Dashboard shows balances, charts. Analytics breaks down by category."

**04:00-04:30** - Balances
> "Automatic calculations - green means owed, red means owing."

**04:30-05:00** - Responsive & Delete
> "Fully responsive, proper confirmations, instant updates."

---

## 💾 View Stored Data

### Browser DevTools (F12):
1. Go to **Application** tab
2. Expand **Local Storage**
3. Click `http://localhost:5173`
4. See: `users`, `groups`, `expenses`, `currentUser`

### Clear Data:
```javascript
// In browser console
localStorage.clear();
location.reload();
```

---

## 🐛 Quick Troubleshooting

**Port in use?**
```bash
# Change port in vite.config.ts
server: { port: 3000 }
```

**Login not working?**
- Enable cookies in browser
- Check console for errors

**Data not persisting?**
- Check localStorage is enabled
- Try different browser

---

## 🎨 UI Highlights

✨ **Gradients**: Login page, dashboard cards  
🎯 **Animations**: Fade-in, hover elevation  
🔔 **Toasts**: Every action gets feedback  
📱 **Responsive**: Works on all screen sizes  
🎨 **Colors**: Green (owed), Red (owing)  
😀 **Emojis**: Category icons (🍔🏠✈️🛍️)

---

## 📊 Technical Highlights

✅ **No Backend** - All in browser  
⚡ **Instant Updates** - No loading spinners  
🔒 **Type Safe** - Full TypeScript  
🎨 **Modern Stack** - React 19, Vite 7, Tailwind 4  
📦 **Small Bundle** - Fast load times  
🧩 **Zustand** - Simple state management  

---

## 🚀 Deploy & Share

Want others to try it?

```bash
npm run build
vercel --prod
```

Get a live link in seconds!

---

## 💡 Pro Tips

- **Ctrl+Shift+R**: Hard refresh
- **F12**: Open DevTools
- **Mobile Test**: Use Chrome DevTools device mode
- **Clear Data**: `localStorage.clear()` in console
- **Multiple Users**: Use different browsers/incognito

---

## 📚 Next Steps

1. ✅ Read [Setup Guide](SETUP.md) for details
2. ✅ Explore [Features List](FEATURES.md)
3. ✅ Check [Architecture](ARCHITECTURE.md)
4. ✅ Deploy with [Deployment Guide](DEPLOYMENT.md)
5. ✅ Start customizing!

---

**Enjoy Smart Splitter! 🎉**

**Made with ❤️ - 100% Frontend, Zero Backend!**
