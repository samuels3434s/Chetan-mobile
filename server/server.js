const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'catalog.json');

// Enable CORS so the storefront pages can connect from any port/origin
app.use(cors());
app.use(express.json());

// Seeding Default Products List
const DEFAULT_PRODUCTS = {
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

// Helper: Read database from file
function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      // Ensure folder exists and seed defaults
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_PRODUCTS, null, 2));
      return DEFAULT_PRODUCTS;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database file:", err);
    return {};
  }
}

// Helper: Write database to file
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing database file:", err);
  }
}

// --- Endpoints ---

// Admin Verification
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'chetan@skins';

app.post('/api/admin/verify', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true, token: 'express-secure-admin-token-12345' });
  }
  return res.status(401).json({ success: false, error: 'Invalid password' });
});

// 1. GET /api/products - Get all catalog
app.get('/api/products', (req, res) => {
  const products = readData();
  res.json(products);
});

// 2. GET /api/products/:id - Get single product
app.get('/api/products/:id', (req, res) => {
  const products = readData();
  const prod = products[req.params.id];
  if (!prod) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(prod);
});

// 3. POST /api/products - Add or update a product
app.post('/api/products', (req, res) => {
  const product = req.body;
  if (!product || !product.id || !product.title || product.price === undefined) {
    return res.status(400).json({ error: "Invalid product payload" });
  }

  const products = readData();
  products[product.id] = product;
  writeData(products);
  res.status(200).json(product);
});

// 4. DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', (req, res) => {
  const products = readData();
  if (!products[req.params.id]) {
    return res.status(404).json({ error: "Product not found" });
  }

  delete products[req.params.id];
  writeData(products);
  res.status(200).json({ success: true });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Chetan Mobile API Server running at: http://localhost:${PORT}`);
  console.log(`Database File: ${DATA_FILE}`);
});
