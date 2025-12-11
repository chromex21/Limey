# 🔥 Firebase Setup Guide for Limey Forum

This guide walks you through setting up Firebase for your Limey Forum application step-by-step.

## Table of Contents

1. [Create Firebase Project](#1-create-firebase-project)
2. [Enable Firebase Services](#2-enable-firebase-services)
3. [Get Firebase Configuration](#3-get-firebase-configuration)
4. [Configure Your Application](#4-configure-your-application)
5. [Set Up Firebase CLI](#5-set-up-firebase-cli)
6. [Deploy to Firebase Hosting](#6-deploy-to-firebase-hosting)
7. [Set Up GitHub Actions CI/CD](#7-set-up-github-actions-cicd)
8. [Security Rules](#8-security-rules)

---

## 1. Create Firebase Project

### Step 1.1: Go to Firebase Console

1. Navigate to [Firebase Console](https://console.firebase.google.com/)
2. Sign in with your Google account

### Step 1.2: Create a New Project

1. Click **"Add project"** button
2. Enter a project name (e.g., `limey-forum`)
3. Click **"Continue"**
4. (Optional) Enable Google Analytics
5. Click **"Create project"**
6. Wait for project to be created, then click **"Continue"**

---

## 2. Enable Firebase Services

### 2.1 Enable Authentication

1. In the Firebase Console, click **"Build"** in the left sidebar
2. Click **"Authentication"**
3. Click **"Get started"**
4. Enable sign-in methods:
   - **Email/Password**: Click it → Toggle "Enable" → Save
   - **Google**: Click it → Toggle "Enable" → Select support email → Save
   - (Optional) Enable other providers as needed

### 2.2 Create Firestore Database

1. Click **"Build"** → **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
   - ⚠️ Remember to add security rules before production!
4. Select a Cloud Firestore location (choose closest to your users)
5. Click **"Enable"**

### 2.3 Enable Storage (Optional)

1. Click **"Build"** → **"Storage"**
2. Click **"Get started"**
3. Click **"Next"** (default security rules)
4. Select a Cloud Storage location (same as Firestore)
5. Click **"Done"**

---

## 3. Get Firebase Configuration

### Step 3.1: Register Your Web App

1. In Firebase Console, go to **Project Settings** (⚙️ icon at top-left)
2. Scroll down to **"Your apps"** section
3. Click the **Web icon** (`</>`) button
4. Enter an app nickname: `Limey Forum Web`
5. Check **"Also set up Firebase Hosting"** (optional but recommended)
6. Click **"Register app"**

### Step 3.2: Copy Configuration

You'll see a code snippet like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**Copy this entire object!** You'll need it in the next step.

---

## 4. Configure Your Application

### Step 4.1: Update Firebase Config

Open `src/firebase/firebaseConfig.ts` in your code editor and replace the placeholder values:

```typescript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Replace with YOUR Firebase configuration from Step 3.2
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
```

### Step 4.2: Update .firebaserc

Open `.firebaserc` and replace the project ID:

```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

Replace `"your-project-id"` with your actual Firebase project ID from Step 3.2.

---

## 5. Set Up Firebase CLI

### Step 5.1: Install Firebase Tools

```bash
npm install -g firebase-tools
```

### Step 5.2: Login to Firebase

```bash
firebase login
```

This will open a browser window. Sign in with the same Google account you used for Firebase Console.

### Step 5.3: Verify Login

```bash
firebase projects:list
```

You should see your project listed.

### Step 5.4: Initialize Firebase Hosting (Optional)

If you didn't check "Also set up Firebase Hosting" in Step 3.1:

```bash
firebase init hosting
```

When prompted:
- **Select project**: Choose your project from the list
- **Public directory**: Enter `dist`
- **Configure as single-page app**: `Yes`
- **Set up automatic builds with GitHub**: `No` (we'll do this manually)
- **Overwrite index.html**: `No`

---

## 6. Deploy to Firebase Hosting

### Step 6.1: Install Dependencies

```bash
npm install
```

### Step 6.2: Build Your Project

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Step 6.3: Preview Locally (Optional)

```bash
firebase serve
```

Opens at `http://localhost:5000`

### Step 6.4: Deploy to Firebase

```bash
firebase deploy --only hosting
```

Wait for deployment to complete. You'll see:

```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/your-project-id/overview
Hosting URL: https://your-project-id.web.app
```

🎉 **Your site is now live!** Visit the Hosting URL to see it.

---

## 7. Set Up GitHub Actions CI/CD

This enables automatic deployment whenever you push to the `main` branch.

### Step 7.1: Generate CI Token

```bash
firebase login:ci
```

This opens a browser for authentication, then generates a token. **Copy this token!**

Example output:
```
✔  Success! Use this token to login on a CI server:

1//0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 7.2: Add Token to GitHub

1. Go to your GitHub repository: `https://github.com/chromex21/Limey`
2. Click **"Settings"** (tab at top)
3. In the left sidebar, click **"Secrets and variables"** → **"Actions"**
4. Click **"New repository secret"**
5. Fill in:
   - **Name**: `FIREBASE_TOKEN`
   - **Secret**: Paste the token from Step 7.1
6. Click **"Add secret"**

### Step 7.3: Verify Workflow File

The workflow file is already created at `.github/workflows/firebase.yml`. 

It automatically:
- Triggers on push to `main` branch
- Installs dependencies
- Builds the project
- Deploys to Firebase

### Step 7.4: Test Auto-Deploy

```bash
# Make a small change
echo "# Test change" >> README.md

# Commit and push
git add .
git commit -m "Test auto-deploy"
git push origin main
```

Go to GitHub → Your repository → **"Actions"** tab to watch the deployment!

---

## 8. Security Rules

**⚠️ CRITICAL**: Before going to production, update security rules!

### Step 8.1: Firestore Rules

1. Go to Firebase Console → **"Firestore Database"** → **"Rules"** tab
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated
    function isSignedIn() {
      return request.auth != null;
    }
    
    // Helper function to check if user owns the document
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    // Topics collection
    match /topics/{topicId} {
      // Anyone can read topics
      allow read: if true;
      
      // Only authenticated users can create topics
      allow create: if isSignedIn() && 
        request.resource.data.authorId == request.auth.uid;
      
      // Only the author can update or delete their topic
      allow update, delete: if isOwner(resource.data.authorId);
    }
    
    // Articles collection
    match /articles/{articleId} {
      allow read: if true;
      allow create: if isSignedIn() && 
        request.resource.data.authorId == request.auth.uid;
      allow update, delete: if isOwner(resource.data.authorId);
    }
    
    // Comments collection
    match /comments/{commentId} {
      allow read: if true;
      allow create: if isSignedIn();
      allow update, delete: if isOwner(resource.data.authorId);
    }
    
    // Users collection
    match /users/{userId} {
      // Anyone can read user profiles
      allow read: if true;
      
      // Users can only write to their own profile
      allow write: if isOwner(userId);
    }
    
    // Categories collection (read-only for users)
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if false; // Only admins should write (use Admin SDK)
    }
  }
}
```

3. Click **"Publish"**

### Step 8.2: Storage Rules

1. Go to **"Storage"** → **"Rules"** tab
2. Replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Helper function
    function isSignedIn() {
      return request.auth != null;
    }
    
    // User avatars
    match /avatars/{userId}/{fileName} {
      // Anyone can read
      allow read: if true;
      
      // Only the user can upload their own avatar
      allow write: if isSignedIn() && 
        request.auth.uid == userId &&
        request.resource.size < 5 * 1024 * 1024 && // Max 5MB
        request.resource.contentType.matches('image/.*');
    }
    
    // Article images
    match /articles/{articleId}/{fileName} {
      allow read: if true;
      allow write: if isSignedIn() &&
        request.resource.size < 10 * 1024 * 1024 && // Max 10MB
        request.resource.contentType.matches('image/.*');
    }
  }
}
```

3. Click **"Publish"**

---

## 🎉 You're All Set!

Your Limey Forum is now:
- ✅ Connected to Firebase
- ✅ Deployed to Firebase Hosting
- ✅ Has auto-deployment on push to main
- ✅ Protected with security rules

## 📋 Quick Reference Commands

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build

# Deploy to Firebase
firebase deploy --only hosting

# View Firebase projects
firebase projects:list

# View deployment logs
firebase hosting:logs
```

## 🆘 Troubleshooting

### "Permission denied" when deploying

```bash
firebase logout
firebase login
```

### Build fails

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Can't find project

Check `.firebaserc` has the correct project ID:
```bash
cat .firebaserc
```

### Deployment successful but site not updating

Clear browser cache or try incognito mode. Firebase Hosting can take a few minutes to propagate globally.

---

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

---

**Need Help?** Open an issue in the GitHub repository or consult the Firebase documentation.
