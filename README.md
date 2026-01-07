# 🧾 Smart Splitter

A beautiful, modern expense splitting application built with React, TypeScript, and localStorage. Split bills, track expenses, and manage group finances with ease - **all in your browser!**

## 🌐 [**Live Demo →**](https://smart-splitter.vercel.app/login)

**Try it now:** [https://smart-splitter.vercel.app/login](https://smart-splitter.vercel.app/login)

![Demo Mode](https://img.shields.io/badge/Mode-Demo-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Frontend Only](https://img.shields.io/badge/Frontend-Only-orange)
![Live](https://img.shields.io/badge/Live-Vercel-black)

## ✨ Features

- 🔐 **Cookie-Based Authentication** (Demo Mode)
  - Login with any credentials
  - Auto-creates users
  - Persistent sessions

- 💰 **Complete Expense Management**
  - Create and manage groups
  - Add expenses with categories
  - Track who owes whom
  - Calculate balances automatically

- 📊 **Beautiful Analytics**
  - Monthly spending charts
  - Category breakdowns
  - Balance overview
  - Recent transactions

- 🎨 **Modern UI/UX**
  - Responsive design
  - Smooth animations
  - Toast notifications
  - Dark mode ready

- 💾 **LocalStorage Based**
  - All data stored in browser
  - No backend required
  - Instant updates
  - Zero API calls

## 🚀 Quick Start

### 🌟 Try Live Demo (No Installation Needed!)

**Visit:** [https://smart-splitter.vercel.app/login](https://smart-splitter.vercel.app/login)

Just open the link and login with **any credentials** - it works instantly! Perfect for:
- ✅ Testing the app without setup
- ✅ Sharing with others
- ✅ Mobile testing
- ✅ Portfolio demonstrations

### 💻 Run Locally

If you want to run it on your machine:

#### Prerequisites
- Node.js 18+
- npm or yarn

#### Installation & Run

```bash
# Clone the repository
git clone <your-repo-url>
cd Smart-Splitter

# Install dependencies
npm install

# Run the app
npm run dev
```

Visit `http://localhost:5173` and start splitting expenses!

### 🔑 Demo Login

Enter **any username and password** to login. The app is in demo mode - perfect for showcasing!

```
Username: demo
Password: demo123
```

Or use any credentials you like - they all work! 🎉

## 📖 Documentation

Comprehensive documentation is available in the `docs/` folder:

- **[Quick Start](docs/QUICK_START.md)** - Get running in 2 minutes
- **[Setup Guide](docs/SETUP.md)** - Detailed installation and running instructions
- **[Architecture](docs/ARCHITECTURE.md)** - Technical architecture and design decisions
- **[Features](docs/FEATURES.md)** - Complete feature list with descriptions
- **[Deployment](docs/DEPLOYMENT.md)** - Deploy to Vercel, Netlify, and more

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript 5.6** - Type safety
- **Vite 7** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Zustand** - Simple state management
- **React Router 7** - Client-side routing
- **Recharts** - Beautiful data visualization
- **Sonner** - Toast notifications
- **js-cookie** - Cookie management
- **LocalStorage API** - Data persistence

## 📦 Available Scripts

```bash
npm run dev      # Start development server (port 5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run check    # TypeScript type checking
```

## 🎯 Key Features

### 1. Authentication
- Login/Register with any credentials
- Cookie-based session management
- Protected routes
- Auto-logout functionality

### 2. Group Management
- Create groups (Trip, Home, Couple, Other)
- View all groups with member info
- Delete groups (cascades to expenses)
- Beautiful card-based layout

### 3. Expense Tracking
- Add expenses with categories (🍔🏠✈️🛍️🎬💡)
- Split equally among members
- Track who paid what
- Delete expenses with confirmation

### 4. Balance Calculations
- Automatic balance calculations
- See who owes whom
- Net balance per user
- Color-coded displays (green/red)

### 5. Analytics Dashboard
- Monthly spending trends
- Category-wise breakdown
- Recent transactions feed
- Quick stats overview

## 🎨 UI Highlights

- **Gradient backgrounds** for modern look
- **Smooth animations** with fade-in effects
- **Toast notifications** for user feedback (auto-close in 3s)
- **Responsive sidebar** for navigation
- **Card-based layouts** for better organization
- **Icon-based categories** for visual appeal
- **Color-coded balances** (green for owed, red for owing)
- **Empty states** with helpful messages

## 📱 Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Any modern browser with ES6+ support

## 🚢 Deployment

### Quick Deploy to Vercel

```bash
npm run build
vercel --prod
```

### Other Options

Deploy to any static hosting service:
- **Vercel** - Best for frontend (Recommended)
- **Netlify** - Excellent alternative
- **GitHub Pages** - Free for public repos
- **Cloudflare Pages** - Fast global CDN
- **Surge.sh** - Simple deployment

See [Deployment Guide](docs/DEPLOYMENT.md) for detailed instructions!

## 📂 Project Structure

```
Smart-Splitter/
├── client/              # Frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   │   ├── ui/      # Radix UI components
│   │   │   ├── layout/  # Layout components
│   │   │   ├── groups/  # Group CRUD dialogs
│   │   │   └── expenses/# Expense components
│   │   ├── pages/       # Route pages
│   │   ├── store/       # Zustand stores
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions
│   └── public/          # Static assets
├── docs/                # Documentation
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS config
└── package.json         # Dependencies & scripts
```

## 🤝 Contributing

This is a demo project, but contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this project for your portfolio or learning!

## 🎓 Learning Resources

This project demonstrates:
- React Hooks (useState, useEffect, useMemo)
- TypeScript interfaces and types
- Zustand state management
- React Router v7 patterns
- Tailwind CSS utility classes
- Radix UI components
- Form validation with Zod
- Toast notifications with Sonner
- LocalStorage API usage
- Cookie management with js-cookie
- Responsive design patterns
- Component composition

## 🐛 Known Limitations

Since this is a **frontend-only** demo app:

- **Per-Device Storage**: Data stored in browser localStorage (not synced across devices)
- **No Real-Time Sync**: Changes don't sync between tabs/browsers
- **Storage Limits**: ~5-10MB depending on browser
- **No Backup**: Clearing browser data will lose everything
- **Single User per Browser**: Each browser/device has its own data

**For Production**: Consider integrating with a real backend API and database for multi-device sync and data persistence.

## 💡 Why Frontend-Only?

This architecture is perfect for:
- 📚 Learning React and TypeScript
- 🎨 Portfolio projects
- 🚀 Quick prototyping
- 📱 Personal expense tracking
- 🎓 Educational demos
- 🧪 Testing UI concepts

## 🔮 Future Enhancements

Want to take it further?

- [ ] Add real backend API integration
- [ ] Implement user authentication (JWT/OAuth)
- [ ] Add WebSocket for real-time updates
- [ ] Export data to CSV/PDF
- [ ] Receipt image uploads
- [ ] Multiple currency support
- [ ] Email notifications
- [ ] Progressive Web App (PWA)
- [ ] Mobile app with React Native

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Note**: This is a demonstration application using localStorage and cookie-based authentication for showcasing purposes. Perfect for learning, portfolios, and prototyping!

**Made with ❤️ using React, TypeScript, and Vite**

⭐ **Star this repo if you find it helpful!**
