# Limey Forum - Modern Discussion Platform

A modern, production-ready forum and blog platform built with React, TypeScript, and Firebase. Features a beautiful UI with dark mode support, topic discussions, article publishing, and real-time interactions.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Dark Mode**: Seamless theme switching
- **Topics & Articles**: Create and browse community discussions and long-form content
- **Categories**: Organized content by categories
- **Real-time Search**: Search across topics, articles, and users
- **Firebase Ready**: Pre-configured for Firebase Authentication, Firestore, and Hosting
- **CI/CD Pipeline**: Automatic deployment to Firebase on push to main

## 📁 Project Structure

```
limey-forum/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopHeader.tsx          # Main navigation header
│   │   │   ├── LeftSidebar.tsx        # Navigation sidebar
│   │   │   └── RightSmartPanel.tsx    # Quick actions & trending
│   │   └── ui/
│   │       └── ContentCard.tsx        # Reusable content card
│   ├── pages/
│   │   ├── HomePage.tsx               # Home feed
│   │   ├── ExplorePage.tsx            # Explore content
│   │   ├── CategoriesPage.tsx         # Browse categories
│   │   ├── ArticlesPage.tsx           # Articles list
│   │   ├── CreateTopicPage.tsx        # Create new topic
│   │   └── CreateArticlePage.tsx      # Write new article
│   ├── data/
│   │   └── mockData.ts                # Mock data for development
│   ├── context/
│   │   └── ThemeContext.tsx           # Theme state management
│   ├── firebase/
│   │   ├── firebaseConfig.ts          # Firebase configuration
│   │   └── firestore.ts               # Firestore helper functions
│   ├── App.tsx                        # Main app component
│   ├── main.tsx                       # Entry point
│   └── index.css                      # Global styles
├── public/
│   └── index.html                     # HTML template
├── .github/
│   └── workflows/
│       └── firebase.yml               # CI/CD pipeline
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
├── vite.config.ts                     # Vite bundler config
├── tailwind.config.js                 # Tailwind CSS config
├── firebase.json                      # Firebase hosting config
└── .firebaserc                        # Firebase project config
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ installed
- A Google/Firebase account
- Git installed

### Step 1: Clone the Repository

```bash
git clone https://github.com/chromex21/Limey.git
cd Limey
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Firebase

#### 3.1 Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

#### 3.2 Enable Firebase Services

In your Firebase project:

1. **Authentication**: 
   - Go to "Build" → "Authentication" → "Get started"
   - Enable your desired sign-in methods (Email/Password, Google, etc.)

2. **Firestore Database**:
   - Go to "Build" → "Firestore Database" → "Create database"
   - Start in **test mode** for development (remember to add security rules later!)
   - Choose a location close to your users

3. **Storage** (optional, for user uploads):
   - Go to "Build" → "Storage" → "Get started"
   - Start in test mode for development

#### 3.3 Get Your Firebase Configuration

1. In Firebase Console, go to Project Settings (⚙️ icon)
2. Scroll down to "Your apps" section
3. Click the Web icon (`</>`) to add a web app
4. Register your app with a nickname (e.g., "Limey Forum")
5. Copy the `firebaseConfig` object

#### 3.4 Configure Your App

Edit `src/firebase/firebaseConfig.ts` and replace the placeholder values with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

#### 3.5 Update Firebase Project ID

Edit `.firebaserc` and replace with your project ID:

```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

### Step 4: Run Locally

```bash
# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Step 5: Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 🔥 Firebase Deployment

### Manual Deployment

#### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

#### 2. Login to Firebase

```bash
firebase login
```

#### 3. Initialize Firebase Hosting (if not already done)

```bash
firebase init hosting
```

When prompted:
- Select your Firebase project
- Set public directory to: `dist`
- Configure as single-page app: `Yes`
- Don't overwrite existing files

#### 4. Deploy to Firebase

```bash
# Build and deploy
npm run build
firebase deploy --only hosting
```

Your site will be live at: `https://your-project-id.web.app`

### Automatic Deployment with GitHub Actions

#### 1. Generate Firebase Token

```bash
firebase login:ci
```

Copy the generated token.

#### 2. Add Token to GitHub Secrets

1. Go to your GitHub repository
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Name: `FIREBASE_TOKEN`
5. Value: Paste the token from step 1
6. Click "Add secret"

#### 3. Auto-Deploy on Push

The CI/CD pipeline is already configured in `.github/workflows/firebase.yml`. 

Now, every time you push to the `main` branch:
1. GitHub Actions will automatically build your project
2. Deploy it to Firebase Hosting
3. Your changes will be live in minutes!

```bash
git add .
git commit -m "Your changes"
git push origin main
```

## 🔐 Firebase Security Rules

**IMPORTANT**: Before going to production, update your Firestore security rules!

In Firebase Console → Firestore Database → Rules, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Topics collection
    match /topics/{topicId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.authorId;
    }
    
    // Articles collection
    match /articles/{articleId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.authorId;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js` to customize colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      // ... add more colors
    }
  }
}
```

### Add More Features

- **React Router**: Add routing for proper URLs
- **Firebase Auth**: Implement user authentication
- **Real-time Updates**: Use Firestore real-time listeners
- **Image Uploads**: Use Firebase Storage for user uploads
- **Comments System**: Add nested comments using Firestore
- **Voting System**: Implement upvote/downvote functionality

## 📚 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Firebase** - Backend services
  - Authentication
  - Firestore (Database)
  - Hosting
  - Storage

## 🚢 Deployment Checklist

- [ ] Replace Firebase config with your project details
- [ ] Update `.firebaserc` with your project ID
- [ ] Set up Firebase Authentication
- [ ] Create Firestore database
- [ ] Configure Firestore security rules
- [ ] Add `FIREBASE_TOKEN` to GitHub Secrets
- [ ] Test local build with `npm run build`
- [ ] Deploy to Firebase: `firebase deploy`
- [ ] Verify deployment at your Firebase URL

## 📝 Environment Variables (Optional)

For sensitive data, create a `.env` file:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Then update `src/firebase/firebaseConfig.ts`:

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ... etc
};
```

**Note**: Don't commit `.env` to Git! It's already in `.gitignore`.

## 🆘 Troubleshooting

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Firebase Deployment Issues

```bash
# Re-login to Firebase
firebase logout
firebase login

# Check your project
firebase projects:list

# Deploy with verbose logging
firebase deploy --only hosting --debug
```

### Port Already in Use

```bash
# Use a different port
npm run dev -- --port 3000
```

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Support

For issues or questions, please open a GitHub issue in this repository.

---

**Ready to build your community?** 🚀

Follow the setup instructions above and you'll have a production-ready forum live in minutes!
