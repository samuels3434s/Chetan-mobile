// Dynamic Database Service Layer for Chetan Mobile
const db = {
  _initialized: false,
  _firebaseApp: null,
  _firestore: null,

  // Initialize selected database driver
  async init() {
    if (this._initialized) return;

    if (DB_CONFIG.DRIVER === 'firebase') {
      await this._loadFirebaseSDK();
      // Initialize Firebase App
      this._firebaseApp = firebase.initializeApp(DB_CONFIG.FIREBASE);
      this._firestore = firebase.firestore();
    }
    this._initialized = true;
  },

  // Helper to load Firebase scripts dynamically
  _loadFirebaseSDK() {
    return new Promise((resolve, reject) => {
      if (window.firebase && window.firebase.storage) {
        resolve();
        return;
      }

      const scriptApp = document.createElement('script');
      scriptApp.src = "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js";
      scriptApp.onload = () => {
        const scriptDb = document.createElement('script');
        scriptDb.src = "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js";
        scriptDb.onload = () => {
          const scriptStorage = document.createElement('script');
          scriptStorage.src = "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage-compat.js";
          scriptStorage.onload = () => resolve();
          scriptStorage.onerror = (e) => reject(new Error("Failed to load Firebase Storage SDK: " + e));
          document.head.appendChild(scriptStorage);
        };
        scriptDb.onerror = (e) => reject(new Error("Failed to load Firestore SDK: " + e));
        document.head.appendChild(scriptDb);
      };
      scriptApp.onerror = (e) => reject(new Error("Failed to load Firebase SDK: " + e));
      document.head.appendChild(scriptApp);
    });
  },

  // Upload product image WebP Blob to Firebase Storage (or Base64 in Local)
  async uploadProductImage(productId, fileBlob) {
    await this.init();

    if (DB_CONFIG.DRIVER === 'firebase') {
      try {
        const storageRef = firebase.storage().ref();
        const filename = `products/${productId}-${Date.now()}.webp`;
        const fileRef = storageRef.child(filename);
        
        const snapshot = await fileRef.put(fileBlob);
        const downloadURL = await snapshot.ref.getDownloadURL();
        return downloadURL;
      } catch (err) {
        console.error("Firebase image upload failed:", err);
        throw err;
      }
    } else {
      // Local Mode: return Base64 string from blob
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(fileBlob);
      });
    }
  },

  // Fetch entire catalog list
  async getCatalog() {
    await this.init();

    if (DB_CONFIG.DRIVER === 'firebase') {
      try {
        const snapshot = await this._firestore.collection('products').get();
        const catalog = {};
        snapshot.forEach(doc => {
          catalog[doc.id] = doc.data();
        });
        return catalog;
      } catch (err) {
        console.error("Firebase fetch catalog error:", err);
        throw err;
      }
    } else if (DB_CONFIG.DRIVER === 'express') {
      try {
        const res = await fetch(`${DB_CONFIG.EXPRESS.apiUrl}/products`);
        if (!res.ok) throw new Error("HTTP error " + res.status);
        const data = await res.json();
        return data;
      } catch (err) {
        console.error("Express fetch catalog error:", err);
        throw err;
      }
    } else {
      // Local fallback
      if (!localStorage.getItem('chetan_catalog')) {
        await this.initializeLocalFallback();
      }
      return JSON.parse(localStorage.getItem('chetan_catalog') || '{}');
    }
  },

  // Fetch single product detail
  async getProduct(id) {
    await this.init();

    if (DB_CONFIG.DRIVER === 'firebase') {
      try {
        const docRef = await this._firestore.collection('products').doc(id).get();
        if (!docRef.exists) return null;
        return docRef.data();
      } catch (err) {
        console.error("Firebase fetch product error:", err);
        throw err;
      }
    } else if (DB_CONFIG.DRIVER === 'express') {
      try {
        const res = await fetch(`${DB_CONFIG.EXPRESS.apiUrl}/products/${id}`);
        if (res.status === 404) return null;
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return await res.json();
      } catch (err) {
        console.error("Express fetch product error:", err);
        throw err;
      }
    } else {
      const catalog = await this.getCatalog();
      return catalog[id] || null;
    }
  },

  // Save product details (create or update)
  async saveProduct(product) {
    await this.init();

    if (DB_CONFIG.DRIVER === 'firebase') {
      try {
        await this._firestore.collection('products').doc(product.id).set(product);
        return product;
      } catch (err) {
        console.error("Firebase save product error:", err);
        throw err;
      }
    } else if (DB_CONFIG.DRIVER === 'express') {
      try {
        const res = await fetch(`${DB_CONFIG.EXPRESS.apiUrl}/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(product)
        });
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return await res.json();
      } catch (err) {
        console.error("Express save product error:", err);
        throw err;
      }
    } else {
      const catalog = await this.getCatalog();
      catalog[product.id] = product;
      localStorage.setItem('chetan_catalog', JSON.stringify(catalog));
      return product;
    }
  },

  // Delete product from database
  async deleteProduct(id) {
    await this.init();

    if (DB_CONFIG.DRIVER === 'firebase') {
      try {
        await this._firestore.collection('products').doc(id).delete();
        return true;
      } catch (err) {
        console.error("Firebase delete product error:", err);
        throw err;
      }
    } else if (DB_CONFIG.DRIVER === 'express') {
      try {
        const res = await fetch(`${DB_CONFIG.EXPRESS.apiUrl}/products/${id}`, {
          method: 'DELETE'
        });
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return true;
      } catch (err) {
        console.error("Express delete product error:", err);
        throw err;
      }
    } else {
      const catalog = await this.getCatalog();
      delete catalog[id];
      localStorage.setItem('chetan_catalog', JSON.stringify(catalog));
      return true;
    }
  },

  // Generate unique hexadecimal SKU code
  async generateUniqueSKU() {
    const catalog = await this.getCatalog();
    const chars = '0123456789ABCDEF';
    let sku = '';
    let isUnique = false;
    
    while (!isUnique) {
      sku = '';
      for (let i = 0; i < 6; i++) {
        sku += chars[Math.floor(Math.random() * 16)];
      }
      const exists = Object.values(catalog).some(p => p.code === sku);
      if (!exists) {
        isUnique = true;
      }
    }
    return sku;
  },

  // Returns true if the database has already been seeded/initialized
  async isSeeded() {
    await this.init();

    if (DB_CONFIG.DRIVER === 'firebase') {
      try {
        const docRef = await this._firestore.collection('settings').doc('state').get();
        if (docRef.exists && docRef.data().seeded === true) {
          return true;
        }
        
        // If settings doc doesn't exist, check if there are any products already
        const snapshot = await this._firestore.collection('products').limit(1).get();
        if (!snapshot.empty) {
          await this.setSeeded();
          return true;
        }
        return false;
      } catch (err) {
        console.error("Firebase check seeded status error:", err);
        return false;
      }
    } else if (DB_CONFIG.DRIVER === 'express') {
      return true; // Express handles its own seeding server-side
    } else {
      const seeded = localStorage.getItem('chetan_seeded') === 'true';
      if (!seeded && localStorage.getItem('chetan_catalog')) {
        localStorage.setItem('chetan_seeded', 'true');
        return true;
      }
      return seeded;
    }
  },

  // Mark database as seeded
  async setSeeded() {
    await this.init();

    if (DB_CONFIG.DRIVER === 'firebase') {
      try {
        await this._firestore.collection('settings').doc('state').set({ seeded: true });
      } catch (err) {
        console.error("Firebase set seeded status error:", err);
      }
    } else if (DB_CONFIG.DRIVER === 'express') {
      // No-op
    } else {
      localStorage.setItem('chetan_seeded', 'true');
    }
  },

  // Verify Admin password
  async verifyAdminPassword(password) {
    if (DB_CONFIG.DRIVER === 'express') {
      try {
        const response = await fetch(`${DB_CONFIG.EXPRESS.apiUrl}/admin/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ password })
        });
        const result = await response.json();
        if (result.success) {
          this.setAdminAuthenticated(result.token || 'express-session-token');
          return true;
        }
        return false;
      } catch (err) {
        console.error("Express admin password verification error:", err);
        return false;
      }
    } else {
      // Local/Firebase modes check SHA-256 hash using Web Crypto API
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        if (hashHex === DB_CONFIG.ADMIN_HASH) {
          this.setAdminAuthenticated('local-session-token');
          return true;
        }
        return false;
      } catch (err) {
        console.error("Crypto hashing error:", err);
        return false;
      }
    }
  },

  // Check if admin is currently authenticated in the session
  isAdminAuthenticated() {
    return sessionStorage.getItem('chetan_admin_auth') === 'true';
  },

  // Set admin authentication status
  setAdminAuthenticated(token) {
    sessionStorage.setItem('chetan_admin_auth', 'true');
    if (token) {
      sessionStorage.setItem('chetan_admin_token', token);
    }
  },

  // Logout admin
  logoutAdmin() {
    sessionStorage.removeItem('chetan_admin_auth');
    sessionStorage.removeItem('chetan_admin_token');
  },

  // Seeds default database elements if database is empty (useful for initial set up)
  async seedDatabase(defaultCatalog) {
    const alreadySeeded = await this.isSeeded();
    if (alreadySeeded) {
      console.log("Database was already seeded previously.");
      return;
    }

    console.log("Seeding database with default products...");
    for (const key of Object.keys(defaultCatalog)) {
      await this.saveProduct(defaultCatalog[key]);
    }
    await this.setSeeded();
    console.log("Database seeding completed.");
  },

  // Local Storage Fallback initializer
  async initializeLocalFallback() {
    const initialCatalog = {
      "custom-laptop": {
        id: "custom-laptop",
        title: "Custom Laptop Skin - Upload Photo",
        category: "laptop-skins",
        price: 349.00,
        regularPrice: 1299.00,
        rating: 4.9,
        reviews: 142,
        code: "A9B8D1",
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop&q=80"
        ],
        description: "Upload your own image or design to print a custom laptop skin. Made from 3M vinyl with a matte finish. Protects against scratches and removes clean without residue."
      },
      "gtr-laptop": {
        id: "gtr-laptop",
        title: "Nissan GTR Laptop Skin",
        category: "laptop-skins",
        price: 349.00,
        regularPrice: 1299.00,
        rating: 5.0,
        reviews: 86,
        code: "F4E2D9",
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80"
        ],
        description: "Vinyl adhesive skin styled with carbon details and the Nissan GTR sport profile. Protects against fingerprints, smudges, and scuffs."
      },
      "topography-laptop": {
        id: "topography-laptop",
        title: "Topographic Black Laptop Skin",
        category: "laptop-skins",
        price: 349.00,
        regularPrice: 1299.00,
        rating: 4.8,
        reviews: 94,
        code: "C8D5A1",
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800&auto=format&fit=crop&q=80"
        ],
        description: "Vinyl adhesive lid wrap with topographic line patterns. Fits all laptop lids with exact camera and brand cutouts."
      },
      "bmw-laptop": {
        id: "bmw-laptop",
        title: "BMW M2 Sport Laptop Skin",
        category: "laptop-skins",
        price: 349.00,
        regularPrice: 1299.00,
        rating: 4.9,
        reviews: 53,
        code: "B2E9F6",
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80"
        ],
        description: "Sport racing vinyl skin with stripes and emblems matching the BMW M2 silhouette. Resistant to oil, smudges, and scratches."
      },
      "carbon-mobile": {
        id: "carbon-mobile",
        title: "Carbon Fiber Black Mobile Skin",
        category: "mobile-skins",
        price: 299.00,
        regularPrice: 999.00,
        rating: 4.9,
        reviews: 312,
        code: "D1E8F2",
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&auto=format&fit=crop&q=80"
        ],
        description: "Carbon fiber texture protective adhesive skin for mobile phones. Provides physical grip and scratch protection with zero bulk."
      },
      "berserk-mobile": {
        id: "berserk-mobile",
        title: "Berserk Guts Anime Mobile Skin",
        category: "mobile-skins",
        price: 299.00,
        regularPrice: 999.00,
        rating: 5.0,
        reviews: 215,
        code: "F7C2A1",
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=800&auto=format&fit=crop&q=80"
        ],
        description: "Adhesive wrap styled with Guts artwork from the Berserk series. Thin vinyl layer protects phone margins and back glass."
      },
      "topography-cover": {
        id: "topography-cover",
        title: "Topographic Matte Phone Cover",
        category: "mobile-covers",
        price: 399.00,
        regularPrice: 1499.00,
        rating: 4.7,
        reviews: 67,
        code: "E2C8B5",
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80"
        ],
        description: "Shockproof TPU case with topographic design printed on a matte backplate. Protects phone against drops and scuffs."
      },
      "clear-guard": {
        id: "clear-guard",
        title: "Hydrogel Matte Screen Guard",
        category: "screen-guards",
        price: 199.00,
        regularPrice: 599.00,
        rating: 4.8,
        reviews: 188,
        code: "B5D4E1",
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80"
        ],
        description: "Matte-finish hydrogel screen guard film. Resists screen glares, fingerprint smudges, and direct scratches. Self-healing film."
      },
      "metro-card": {
        id: "metro-card",
        title: "Retro Metro Credit Card Skin",
        category: "card-skins",
        price: 149.00,
        regularPrice: 399.00,
        rating: 4.9,
        reviews: 110,
        code: "A1D5E8",
        inStock: true,
        images: [
          "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=800&auto=format&fit=crop&q=80"
        ],
        description: "Vinyl adhesive skin styled like a retro metro token. Made from card-reader-friendly thin film, with pre-cut openings for standard payment card chips."
      }
    };
    localStorage.setItem('chetan_catalog', JSON.stringify(initialCatalog));
  }
};
