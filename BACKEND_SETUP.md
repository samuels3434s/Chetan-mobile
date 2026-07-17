# Chetan Mobile Backend Setup & Database Guide

This project supports three connectivity drivers, configurable inside `config.js` via the `DB_CONFIG.DRIVER` setting.

## Configuration File: `config.js`

Open [config.js](file:///c:/Users/siddh/OneDrive/Desktop/Programming/Projects/Websites/Chetan%20Mobiles/config.js) in your text editor:

```javascript
const DB_CONFIG = {
  // Option: 'local', 'firebase', or 'express'
  DRIVER: 'local', 
  ...
};
```

---

## Driver Options

### 1. Local Storage (`local`) - Default
- **Description**: Uses browser local storage.
- **Connectivity**: Works only on a single browser. Admin panel changes do not propagate to other users/devices.
- **Setup**: Zero setup required.

### 2. Firebase Firestore Cloud Database (`firebase`)
- **Description**: Serverless real-time database hosted in the cloud. Changes publish instantly to all online users.
- **Setup Instructions**:
  1. Go to the [Firebase Console](https://console.firebase.google.com/).
  2. Click **Add Project** and name it (e.g., `chetan-mobiles`).
  3. Under project build settings, open **Firestore Database** and click **Create Database**.
     - Start in **Test Mode** (or update security rules to allow read/write access to `products` collection).
  4. In Project Settings, click the **Web Icon (</>)** to register an app.
  5. Copy the configuration object provided (containing `apiKey`, `authDomain`, `projectId`, etc.).
  6. Paste these details into `DB_CONFIG.FIREBASE` inside your [config.js](file:///c:/Users/siddh/OneDrive/Desktop/Programming/Projects/Websites/Chetan%20Mobiles/config.js) file.
  7. Change `DRIVER` to `'firebase'`:
     ```javascript
     DRIVER: 'firebase'
     ```
  8. Open the Admin dashboard or Storefront. The system will automatically seed your cloud database with the default product catalog on startup.

### 3. Custom Node.js Express Backend (`express`)
- **Description**: Custom backend server that saves the catalog in a local JSON file (`server/data/catalog.json`). Highly customizable and easy to host on platforms like Render or Railway.
- **Setup Instructions**:
  1. Install dependencies. Open a terminal, go to the `server` folder, and run:
     ```bash
     npm install
     ```
  2. Start the Express API server locally:
     ```bash
     npm run dev
     ```
     The server will start running at `http://localhost:3000`.
  3. Change `DRIVER` to `'express'` inside your [config.js](file:///c:/Users/siddh/OneDrive/Desktop/Programming/Projects/Websites/Chetan%20Mobiles/config.js) file:
     ```javascript
     DRIVER: 'express'
     ```
  4. Access storefront/admin dashboard, and all changes will save directly to the Node.js server's `server/data/catalog.json` file.
  5. To host it online:
     - Deploy the `server` folder to Render/Railway.
     - Replace the `EXPRESS.apiUrl` in `config.js` with your deployed server's URL (e.g. `https://your-app.onrender.com/api`).
