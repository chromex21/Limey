# 🚀 Quick Start Guide

Get your Limey Forum up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Git installed
- A Google account (for Firebase)

## Installation

### 1. Clone and Install

```bash
git clone https://github.com/chromex21/Limey.git
cd Limey
npm install
```

### 2. Run Locally (with Mock Data)

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) - The app works with mock data!

### 3. Set Up Firebase (Optional - For Production)

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed Firebase setup instructions.

**Quick version:**

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Copy your Firebase config
3. Edit `src/firebase/firebaseConfig.ts` with your config
4. Update `.firebaserc` with your project ID

### 4. Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

### 5. Deploy

#### Option A: Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only hosting
```

#### Option B: Other Hosting

Deploy the `dist/` folder to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- etc.

## 📁 Key Files to Edit

### For Firebase Configuration:
- `src/firebase/firebaseConfig.ts` - Your Firebase credentials
- `.firebaserc` - Your Firebase project ID

### For Customization:
- `tailwind.config.js` - Theme colors
- `src/data/mockData.ts` - Sample data
- `src/components/` - UI components

## 🎨 Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code (if you add ESLint)
npm run lint
```

## 📚 Next Steps

1. **Read the full README**: See [README.md](./README.md)
2. **Set up Firebase**: See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
3. **Add features**: Authentication, real-time updates, etc.
4. **Customize UI**: Edit Tailwind config and components

## 🆘 Common Issues

### Port already in use

```bash
npm run dev -- --port 3000
```

### Build errors

```bash
rm -rf node_modules package-lock.json
npm install
```

## ✨ Features to Add

The current setup includes:
- ✅ Modern UI with dark mode
- ✅ Mock data for development
- ✅ All components broken down and modular
- ✅ Firebase configuration files ready
- ✅ CI/CD pipeline configured

To make it production-ready, add:
- [ ] Firebase Authentication integration
- [ ] Real Firestore data (replace mock data)
- [ ] User profiles and avatars
- [ ] Comment system
- [ ] Voting system
- [ ] Search functionality
- [ ] Markdown editor for articles
- [ ] Image uploads
- [ ] Notifications

## 📖 Documentation

- [README.md](./README.md) - Full documentation
- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Firebase setup guide

---

**Happy coding!** 🎉
