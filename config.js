// Database configuration and selector for Chetan Mobile
const DB_CONFIG = {
  // Selected driver: 'local' (localStorage), 'firebase' (Firebase Firestore), or 'express' (Custom Node.js Express server)
  DRIVER: 'firebase', 

  // Firebase Configuration (Option 1)
  // Create a project in Firebase Console, add a Web App, and paste the config here.
  FIREBASE: {
    apiKey: "AIzaSyA9aIIzI337MXfAyI71ki1XcZrgXtkeb2M",
    authDomain: "chetan-mobiles.firebaseapp.com",
    projectId: "chetan-mobiles",
    storageBucket: "chetan-mobiles.firebasestorage.app",
    messagingSenderId: "978801871703",
    appId: "1:978801871703:web:523ae4ed0ff9e0c3c60c12",
    measurementId: "G-RVYD4EQ534"
  },

  // Express API URL (Option 3)
  // Change to your deployed server URL when publishing online (e.g., https://chetan-mobile-api.onrender.com/api)
  EXPRESS: {
    apiUrl: "http://localhost:3000/api"
  },

  // SHA-256 hash of the Admin Dashboard password ('chetan@skins')
  ADMIN_HASH: 'e1af69293359633f4332e0c051882ac07a03548773e2039d5bf481d4fa60e4db',

  // Live URL of the storefront (used for redirecting from the private admin panel)
  STOREFRONT_URL: 'https://chetan-mobile.netlify.app'
};

// Store contact details and links (edit these to update across the entire website instantly)
const CONTACT_CONFIG = {
  // WhatsApp number for receiving customer orders (numeric format with country code, no + or spaces)
  ORDER_WHATSAPP_NUMBER: "919109416554",

  // Customer care WhatsApp display number
  SUPPORT_WHATSAPP_DISPLAY: "+91 93722 92223",

  // Email address for customer support
  SUPPORT_EMAIL: "support@chetanmobile.in"
};
