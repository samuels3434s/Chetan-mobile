// Admin Dashboard Catalog Management Logic

// 1. Read-Only Default Product Catalog List (For Initial Database Seeding)
const DEFAULT_CATALOG = {
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

// 2. Initialize Catalog in LocalStorage if not present
function initializeCatalog() {
  if (localStorage.getItem('chetan_catalog')) {
    const testCatalog = JSON.parse(localStorage.getItem('chetan_catalog'));
    if (testCatalog["custom-laptop"] && testCatalog["custom-laptop"].code === "SKN-LAP-CUST") {
      localStorage.removeItem('chetan_catalog');
    }
  }
  if (!localStorage.getItem('chetan_catalog')) {
    localStorage.setItem('chetan_catalog', JSON.stringify(DEFAULT_CATALOG));
  }
}

// 3. Track editing state
let editingProductId = null;

async function getCatalog() {
  const catalog = await db.getCatalog();
  const alreadySeeded = await db.isSeeded();
  if (Object.keys(catalog).length === 0 && !alreadySeeded) {
    await db.seedDatabase(DEFAULT_CATALOG);
    return await db.getCatalog();
  }
  return catalog;
}

async function refreshAdminTable() {
  const tbody = document.getElementById('adminTableBody');
  const searchInput = document.getElementById('searchCode');
  if (!tbody) return;
  tbody.innerHTML = '';

  let catalog;
  try {
    catalog = await getCatalog();
  } catch (err) {
    console.error("Error fetching catalog:", err);
    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #D9534F;">Failed to load catalog from database.</td></tr>';
    return;
  }
  
  const searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : '';

  Object.values(catalog).forEach(prod => {
    const productCode = (prod.code || '').toLowerCase();
    if (searchQuery !== '' && !productCode.includes(searchQuery)) {
      return;
    }

    const tr = document.createElement('tr');
    const isOutOfStock = prod.inStock === false;
    
    tr.innerHTML = `
      <td data-label="Img"><img src="${prod.images && prod.images.length > 0 ? prod.images[0] : 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800'}" alt="${prod.title}"></td>
      <td data-label="SKU" style="font-family: monospace; font-weight: 700; color: var(--admin-accent); font-size: 14px; letter-spacing: 0.05em;">${prod.code || 'NO-CODE'}</td>
      <td data-label="Product">
        <strong style="color: var(--admin-text-primary); font-size: 14px;">${prod.title}</strong>
        <br>
        <span style="font-size: 11px; color: var(--admin-text-secondary);">ID: ${prod.id}</span>
      </td>
      <td data-label="Category" style="text-transform: capitalize; color: var(--admin-text-secondary); font-size: 13px;">
        ${prod.category.replace('-', ' ')}
      </td>
      <td data-label="Price" style="font-weight: 700; color: var(--admin-accent);">Rs. ${prod.price.toFixed(2)}</td>
      <td data-label="Stock">
        <span class="badge ${isOutOfStock ? 'badge-out-of-stock' : 'badge-in-stock'}">
          ${isOutOfStock ? 'Out Of Stock' : 'In Stock'}
        </span>
      </td>
      <td data-label="Actions">
        <div style="display: flex; gap: 8px;">
          <button class="btn-primary" style="padding: 6px 12px; font-size: 12px; width: auto;" onclick="editProduct('${prod.id}')">Edit</button>
          <button class="btn-delete" onclick="removeProduct('${prod.id}')">Delete</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.editProduct = async function(id) {
  const catalog = await getCatalog();
  const prod = catalog[id];
  if (!prod) return;

  editingProductId = id;

  document.getElementById('prodName').value = prod.title;
  document.getElementById('prodCategory').value = prod.category;
  document.getElementById('prodPrice').value = prod.price;
  document.getElementById('prodRegularPrice').value = prod.regularPrice;
  document.getElementById('prodStock').value = prod.inStock ? 'true' : 'false';
  document.getElementById('prodDesc').value = prod.description || '';
  
  const textarea = document.getElementById('prodImages');
  if (textarea && prod.images) {
    textarea.value = prod.images.join('\n');
  }

  const pricingSec = document.getElementById('laptopPricingSection');
  const labelPrice = document.getElementById('labelPrice');
  const labelRegPrice = document.getElementById('labelRegularPrice');
  if (prod.category === 'laptop-skins') {
    if (pricingSec) pricingSec.style.display = 'block';
    if (labelPrice) labelPrice.textContent = 'Top Only Sale Price (Rs.)';
    if (labelRegPrice) labelRegPrice.textContent = 'Top Only Regular Price (Rs.)';
    document.getElementById('prodKeypadPrice').value = prod.keypadPrice !== undefined ? prod.keypadPrice : '';
    document.getElementById('prodKeypadRegularPrice').value = prod.keypadRegularPrice !== undefined ? prod.keypadRegularPrice : '';
    document.getElementById('prodBothPrice').value = prod.bothPrice !== undefined ? prod.bothPrice : '';
    document.getElementById('prodBothRegularPrice').value = prod.bothRegularPrice !== undefined ? prod.bothRegularPrice : '';
  } else {
    if (pricingSec) pricingSec.style.display = 'none';
    if (labelPrice) labelPrice.textContent = 'Sale Price (Rs.)';
    if (labelRegPrice) labelRegPrice.textContent = 'Regular Price (Rs.)';
    document.getElementById('prodKeypadPrice').value = '';
    document.getElementById('prodKeypadRegularPrice').value = '';
    document.getElementById('prodBothPrice').value = '';
    document.getElementById('prodBothRegularPrice').value = '';
  }

  document.getElementById('formCardTitle').textContent = "Edit Product Details";
  document.getElementById('btnSubmitForm').textContent = "Save Changes";
  document.getElementById('btnCancelEdit').style.display = "block";
  
  document.getElementById('adminAddForm').scrollIntoView({ behavior: 'smooth' });
};

function cancelEdit() {
  editingProductId = null;
  document.getElementById('adminAddForm').reset();
  
  document.getElementById('formCardTitle').textContent = "Add New Product";
  document.getElementById('btnSubmitForm').textContent = "Create Product";
  document.getElementById('btnCancelEdit').style.display = "none";

  const categorySelect = document.getElementById('prodCategory');
  if (categorySelect) {
    categorySelect.value = 'laptop-skins';
  }
  const pricingSec = document.getElementById('laptopPricingSection');
  if (pricingSec) pricingSec.style.display = 'block';
  const labelPrice = document.getElementById('labelPrice');
  if (labelPrice) labelPrice.textContent = 'Top Only Sale Price (Rs.)';
  const labelRegPrice = document.getElementById('labelRegularPrice');
  if (labelRegPrice) labelRegPrice.textContent = 'Top Only Regular Price (Rs.)';
}

window.removeProduct = function(id) {
  showConfirm("Are you sure you want to delete this product from your catalog? This action will remove it from the storefront catalog.", async () => {
    try {
      await db.deleteProduct(id);
      if (editingProductId === id) {
        cancelEdit();
      }
      await refreshAdminTable();
      showToast("Product deleted successfully.", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete product.", "error");
    }
  });
};

// 4. Custom App Notification Helpers (Sleek Dark Minimalist Popups)
function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.style.cssText = `
    min-width: 280px;
    max-width: 400px;
    background-color: #1E1E1E;
    color: #FAF9F6;
    padding: 14px 20px;
    border-radius: 6px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.35);
    border-left: 4px solid ${type === 'success' ? '#B89C72' : '#D9534F'};
    font-family: 'Archivo', sans-serif;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.4;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255,255,255,0.05);
    border-right: 1px solid rgba(255,255,255,0.05);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  `;
  
  toast.innerHTML = `
    <span style="flex-grow: 1; padding-right: 12px;">${message}</span>
    <button style="background: none; border: none; color: #FAF9F6; opacity: 0.6; font-size: 18px; cursor: pointer; padding: 0 4px; line-height: 1;">&times;</button>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }, 10);
  
  const closeBtn = toast.querySelector('button');
  const removeToast = () => {
    toast.style.transform = 'translateY(-10px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  };
  closeBtn.addEventListener('click', removeToast);
  
  setTimeout(removeToast, 4000);
}

function showConfirm(message, onConfirm, onCancel) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 11000;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  `;
  
  const dialog = document.createElement('div');
  dialog.style.cssText = `
    background-color: #1E1E1E;
    color: #FAF9F6;
    padding: 24px 28px;
    border-radius: 8px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.08);
    font-family: 'Archivo', sans-serif;
    transform: scale(0.95);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  `;
  
  dialog.innerHTML = `
    <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #B89C72;">Confirm Action</h3>
    <p style="margin-top: 0; margin-bottom: 24px; font-size: 13.5px; color: #BBB; line-height: 1.5; font-weight: 400;">${message}</p>
    <div style="display: flex; justify-content: flex-end; gap: 12px;">
      <button id="confirmCancelBtn" style="background: none; border: 1px solid rgba(255,255,255,0.15); color: #FAF9F6; padding: 8px 16px; border-radius: 4px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: 'Archivo'; transition: background-color 0.2s;">Cancel</button>
      <button id="confirmOkBtn" style="background-color: #B89C72; border: none; color: #1A1A1A; padding: 8px 16px; border-radius: 4px; font-size: 12px; font-weight: 700; cursor: pointer; font-family: 'Archivo'; transition: opacity 0.2s;">Confirm</button>
    </div>
  `;
  
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
  
  setTimeout(() => {
    overlay.style.opacity = '1';
    dialog.style.transform = 'scale(1)';
  }, 10);
  
  const closeConfirm = (confirmed) => {
    overlay.style.opacity = '0';
    dialog.style.transform = 'scale(0.95)';
    setTimeout(() => {
      overlay.remove();
      if (confirmed) {
        if (onConfirm) onConfirm();
      } else {
        if (onCancel) onCancel();
      }
    }, 300);
  };
  
  overlay.querySelector('#confirmCancelBtn').addEventListener('click', () => closeConfirm(false));
  overlay.querySelector('#confirmOkBtn').addEventListener('click', () => closeConfirm(true));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeConfirm(false);
  });
}

// 5. Automatic Unique Hexadecimal SKU Generator Helper
function generateUniqueSKU(catalog) {
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
}

document.addEventListener('DOMContentLoaded', async () => {
  const loginGate = document.getElementById('adminLoginGate');
  const dashboardContent = document.getElementById('adminDashboardContent');
  const loginForm = document.getElementById('adminLoginForm');
  const passwordInput = document.getElementById('adminPasswordInput');
  const btnTogglePassword = document.getElementById('btnTogglePassword');
  const logoutLink = document.getElementById('adminLogoutLink');

  // Toggle password visibility
  if (btnTogglePassword && passwordInput) {
    btnTogglePassword.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      const svg = btnTogglePassword.querySelector('svg');
      if (svg) {
        svg.style.color = isPassword ? 'var(--admin-accent)' : 'var(--admin-text-secondary)';
      }
    });
  }

  // Handle logout action
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      db.logoutAdmin();
      window.location.reload();
    });
  }

  // Authentication check function
  async function initAdminPanel() {
    if (db.isAdminAuthenticated()) {
      if (loginGate) loginGate.style.display = 'none';
      if (dashboardContent) dashboardContent.style.display = 'block';
      
      try {
        await refreshAdminTable();
      } catch (err) {
        console.error("Failed to initialize admin table:", err);
      }
    } else {
      if (loginGate) loginGate.style.display = 'flex';
      if (dashboardContent) dashboardContent.style.display = 'none';
    }
  }

  // Handle Login submission
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const password = passwordInput.value.trim();
      
      const success = await db.verifyAdminPassword(password);
      if (success) {
        showToast("Access granted. Welcome to Back Office!", "success");
        await initAdminPanel();
      } else {
        showToast("Incorrect security password.", "error");
        
        // Shake animation effect
        const loginCard = document.getElementById('loginCard');
        if (loginCard) {
          loginCard.classList.add('shake');
          passwordInput.style.borderColor = 'var(--admin-danger)';
          setTimeout(() => {
            loginCard.classList.remove('shake');
            passwordInput.style.borderColor = '';
          }, 400);
        }
        passwordInput.value = '';
        passwordInput.focus();
      }
    });
  }

  // Run Auth check on start
  await initAdminPanel();

  // Set up storefront links dynamically from config
  if (typeof DB_CONFIG !== 'undefined' && DB_CONFIG.STOREFRONT_URL) {
    const storefrontUrl = DB_CONFIG.STOREFRONT_URL;
    
    // Update logo link
    const logoLink = document.querySelector('.nav-logo');
    if (logoLink) logoLink.setAttribute('href', storefrontUrl);
    
    // Update navbar storefront links
    const viewStoreLinks = document.querySelectorAll('a[href="index.html"]');
    viewStoreLinks.forEach(link => link.setAttribute('href', storefrontUrl));
    
    // Update "Go To Store" cancel/action buttons
    const goToStoreBtns = document.querySelectorAll('button[onclick*="index.html"]');
    goToStoreBtns.forEach(btn => {
      btn.removeAttribute('onclick');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = storefrontUrl;
      });
    });
  }

  const searchInput = document.getElementById('searchCode');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      if (db.isAdminAuthenticated()) {
        refreshAdminTable();
      }
    });
  }

  const cancelBtn = document.getElementById('btnCancelEdit');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', cancelEdit);
  }

  // WebP Image compressor and converter
  async function compressAndConvertToWebP(file, quality = 0.8) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Canvas conversion to Blob failed"));
            }
          }, 'image/webp', quality);
        };
        img.onerror = () => reject(new Error("Failed to load image element"));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }

  // Handle local image file selector upload & WebP conversion
  const fileUploadInput = document.getElementById('prodImageUpload');
  const uploadStatus = document.getElementById('imageUploadStatus');
  const imagesTextarea = document.getElementById('prodImages');

  if (fileUploadInput) {
    fileUploadInput.addEventListener('change', async (e) => {
      const files = Array.from(e.target.files).slice(0, 2);
      if (files.length === 0) return;

      if (uploadStatus) {
        uploadStatus.style.display = 'block';
        uploadStatus.style.color = 'var(--admin-accent)';
        uploadStatus.textContent = 'Converting to WebP & uploading...';
      }

      // Generate a temporary fallback slug from product name if empty
      const prodNameVal = document.getElementById('prodName').value.trim();
      const prodId = prodNameVal.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `uploaded-product-${Math.floor(Math.random() * 1000)}`;

      const uploadedUrls = [];
      try {
        for (const file of files) {
          const webpBlob = await compressAndConvertToWebP(file, 0.8);
          const downloadUrl = await db.uploadProductImage(prodId, webpBlob);
          uploadedUrls.push(downloadUrl);
        }

        if (imagesTextarea) {
          const currentUrls = imagesTextarea.value.trim().split('\n').filter(url => url.trim() !== '');
          const combined = [...uploadedUrls, ...currentUrls];
          imagesTextarea.value = combined.join('\n');
        }

        if (uploadStatus) {
          uploadStatus.style.color = 'var(--admin-accent)';
          uploadStatus.textContent = `Successfully uploaded ${files.length} WebP images!`;
          setTimeout(() => { uploadStatus.style.display = 'none'; }, 5000);
        }
      } catch (err) {
        console.error("Image upload processing failed:", err);
        if (uploadStatus) {
          uploadStatus.style.color = '#D9534F';
          uploadStatus.textContent = 'Failed to upload images. Check console.';
        }
      }
    });
  }

  const categorySelect = document.getElementById('prodCategory');
  const pricingSec = document.getElementById('laptopPricingSection');
  const labelPrice = document.getElementById('labelPrice');
  const labelRegPrice = document.getElementById('labelRegularPrice');

  function toggleLaptopPricing() {
    if (!categorySelect || !pricingSec) return;
    if (categorySelect.value === 'laptop-skins') {
      pricingSec.style.display = 'block';
      if (labelPrice) labelPrice.textContent = 'Top Only Sale Price (Rs.)';
      if (labelRegPrice) labelRegPrice.textContent = 'Top Only Regular Price (Rs.)';
    } else {
      pricingSec.style.display = 'none';
      if (labelPrice) labelPrice.textContent = 'Sale Price (Rs.)';
      if (labelRegPrice) labelRegPrice.textContent = 'Regular Price (Rs.)';
    }
  }

  if (categorySelect) {
    categorySelect.addEventListener('change', toggleLaptopPricing);
    toggleLaptopPricing();
  }

  const addForm = document.getElementById('adminAddForm');
  if (addForm) {
    addForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('prodName').value.trim();
      const category = document.getElementById('prodCategory').value;
      const price = parseFloat(document.getElementById('prodPrice').value);
      const regularPrice = parseFloat(document.getElementById('prodRegularPrice').value);
      const inStock = document.getElementById('prodStock').value === 'true';
      const description = document.getElementById('prodDesc').value.trim();
      
      const imagesTextarea = document.getElementById('prodImages');
      const images = imagesTextarea.value.split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);

      if (!name || isNaN(price) || images.length === 0) {
        showToast("Please fill in all required fields and add at least one image URL.", "error");
        return;
      }

      let keypadPrice = null, keypadRegularPrice = null, bothPrice = null, bothRegularPrice = null;
      if (category === 'laptop-skins') {
        const kpVal = document.getElementById('prodKeypadPrice').value.trim();
        const kprVal = document.getElementById('prodKeypadRegularPrice').value.trim();
        const bpVal = document.getElementById('prodBothPrice').value.trim();
        const bprVal = document.getElementById('prodBothRegularPrice').value.trim();
        
        keypadPrice = kpVal !== '' ? parseFloat(kpVal) : price;
        keypadRegularPrice = kprVal !== '' ? parseFloat(kprVal) : regularPrice;
        bothPrice = bpVal !== '' ? parseFloat(bpVal) : 599.00;
        bothRegularPrice = bprVal !== '' ? parseFloat(bprVal) : 2199.00;
      }

      try {
        const catalog = await getCatalog();
        let prodToSave;

        if (editingProductId) {
          const oldProd = catalog[editingProductId] || {};
          prodToSave = {
            id: editingProductId,
            title: name,
            code: oldProd.code || (await db.generateUniqueSKU()),
            category: category,
            price: price,
            regularPrice: regularPrice,
            inStock: inStock,
            rating: oldProd.rating || 5.0,
            reviews: oldProd.reviews || Math.floor(Math.random() * 20) + 1,
            images: images,
            description: description || oldProd.description || `Premium ${category.replace('-', ' ')} protective wrap.`
          };
          
          if (category === 'laptop-skins') {
            prodToSave.keypadPrice = keypadPrice;
            prodToSave.keypadRegularPrice = keypadRegularPrice;
            prodToSave.bothPrice = bothPrice;
            prodToSave.bothRegularPrice = bothRegularPrice;
          }
          
          await db.saveProduct(prodToSave);
          showToast(`Success! Product details updated.`, "success");
        } else {
          const baseId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          const uniqueId = `${baseId}-${Math.floor(Math.random() * 1000)}`;
          const code = await db.generateUniqueSKU();

          prodToSave = {
            id: uniqueId,
            title: name,
            code: code,
            category: category,
            price: price,
            regularPrice: regularPrice,
            inStock: inStock,
            rating: 5.0,
            reviews: Math.floor(Math.random() * 20) + 1,
            images: images,
            description: description || `Premium ${category.replace('-', ' ')} protective wrap.`
          };

          if (category === 'laptop-skins') {
            prodToSave.keypadPrice = keypadPrice;
            prodToSave.keypadRegularPrice = keypadRegularPrice;
            prodToSave.bothPrice = bothPrice;
            prodToSave.bothRegularPrice = bothRegularPrice;
          }

          await db.saveProduct(prodToSave);
          showToast(`Success! "${name}" added to catalog (SKU: ${code}).`, "success");
        }

        cancelEdit();
        await refreshAdminTable();
      } catch (err) {
        console.error("Error saving product:", err);
        showToast("Error saving product to database.", "error");
      }
    });
  }
});
