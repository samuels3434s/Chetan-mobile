// Chetan Mobile E-Commerce Script

// 1. Dynamic Device Databases (Loaded globally via laptops.js and mobiles.js in product.html)

// 2. Product Database for Dynamic Page Loading
const PRODUCT_DATABASE = {
  "custom-laptop": {
    id: "custom-laptop",
    title: "Custom Laptop Skin - Upload Photo",
    price: 349.00,
    regularPrice: 1299.00,
    category: "laptop-skins",
    rating: 4.9,
    reviews: 142,
    images: [
      "images/products/custom-laptop-1.webp",
      "images/products/custom-laptop-2.webp"
    ],
    description: "Upload your own image or design to print a custom laptop skin. Made from 3M vinyl with a matte finish. Protects against scratches and removes clean without residue."
  },
  "gtr-laptop": {
    id: "gtr-laptop",
    title: "Nissan GTR Laptop Skin",
    price: 349.00,
    regularPrice: 1299.00,
    category: "laptop-skins",
    rating: 5.0,
    reviews: 86,
    images: [
      "images/products/gtr-laptop-1.webp",
      "images/products/gtr-laptop-2.webp"
    ],
    description: "High-resolution print of the Nissan GTR sports car. Precision cut from 3M vinyl. Fits your laptop dimensions precisely and protects against surface scratches."
  },
  "topography-laptop": {
    id: "topography-laptop",
    title: "Topographic Black Laptop Skin",
    price: 349.00,
    regularPrice: 1299.00,
    category: "laptop-skins",
    rating: 4.8,
    reviews: 94,
    images: [
      "images/products/topography-laptop-1.webp",
      "images/products/topography-laptop-2.webp"
    ],
    description: "Gold topographic contour lines over a matte black background. Cut to fit your laptop dimensions exactly to shield the surface from everyday wear."
  },
  "bmw-laptop": {
    id: "bmw-laptop",
    title: "BMW M2 Sport Laptop Skin",
    price: 349.00,
    regularPrice: 1299.00,
    category: "laptop-skins",
    rating: 4.9,
    reviews: 53,
    images: [
      "images/products/bmw-laptop-1.webp",
      "images/products/bmw-laptop-2.webp"
    ],
    description: "Sport BMW M2 graphics printed on scratch-resistant vinyl. Wraps tightly around your laptop lid to prevent scuffs while keeping a thin profile."
  },
  "carbon-mobile": {
    id: "carbon-mobile",
    title: "Carbon Fiber Black Mobile Skin",
    price: 299.00,
    regularPrice: 999.00,
    category: "mobile-skins",
    rating: 4.9,
    reviews: 312,
    images: [
      "images/products/carbon-mobile-1.webp",
      "images/products/carbon-mobile-2.webp"
    ],
    description: "Textured carbon fiber vinyl skin for mobile back panels. Adds texture to improve hand grip and shields the back glass from scratches and light impacts."
  },
  "berserk-mobile": {
    id: "berserk-mobile",
    title: "Berserk Guts Anime Mobile Skin",
    price: 299.00,
    regularPrice: 999.00,
    category: "mobile-skins",
    rating: 5.0,
    reviews: 215,
    images: [
      "images/products/berserk-mobile-1.webp",
      "images/products/berserk-mobile-2.webp"
    ],
    description: "Manga illustration of Guts from Berserk. Matte, anti-glare print resists fingerprints and scuffs on your phone's back glass."
  },
  "topography-cover": {
    id: "topography-cover",
    title: "Topographic Matte Phone Cover",
    price: 399.00,
    regularPrice: 1499.00,
    category: "mobile-covers",
    rating: 4.7,
    reviews: 67,
    images: [
      "images/products/topography-cover-1.webp",
      "images/products/topography-cover-2.webp"
    ],
    description: "TPU protective case with a matte topographic pattern. Reinforced corners provide shock absorption against drops without adding bulk."
  },
  "clear-guard": {
    id: "clear-guard",
    title: "Hydrogel Matte Screen Guard",
    price: 199.00,
    regularPrice: 599.00,
    category: "screen-guards",
    rating: 4.8,
    reviews: 188,
    images: [
      "images/products/clear-guard-1.webp",
      "images/products/clear-guard-2.webp"
    ],
    description: "Hydrogel screen protector film. Protects your screen glass from scratches and smudges while maintaining touch responsiveness."
  },
  "metro-card": {
    id: "metro-card",
    title: "Retro Metro Credit Card Skin",
    price: 149.00,
    regularPrice: 399.00,
    category: "card-skins",
    rating: 4.9,
    reviews: 110,
    images: [
      "images/products/metro-card-1.webp",
      "images/products/metro-card-2.webp"
    ],
    description: "Vinyl adhesive skin styled like a retro metro token. Made from card-reader-friendly thin film, with pre-cut openings for standard payment card chips."
  }
};

async function getCombinedCatalog() {
  try {
    const catalog = await db.getCatalog();
    const alreadySeeded = await db.isSeeded();
    if (Object.keys(catalog).length === 0 && !alreadySeeded) {
      const initialCatalog = { ...PRODUCT_DATABASE };
      initialCatalog["custom-laptop"].code = "A9B8D1";
      initialCatalog["gtr-laptop"].code = "F4E2D9";
      initialCatalog["topography-laptop"].code = "C8D5A1";
      initialCatalog["bmw-laptop"].code = "B2E9F6";
      initialCatalog["carbon-mobile"].code = "D1E8F2";
      initialCatalog["berserk-mobile"].code = "F7C2A1";
      initialCatalog["topography-cover"].code = "E2C8B5";
      initialCatalog["clear-guard"].code = "B5D4E1";
      initialCatalog["metro-card"].code = "A1D5E8";
      await db.seedDatabase(initialCatalog);
      return await db.getCatalog();
    }
    return catalog;
  } catch (err) {
    console.error("Error in getCombinedCatalog:", err);
    return { ...PRODUCT_DATABASE }; // return hardcoded as a safety fallback
  }
}

// Function to dynamically update header navigation link styling
function updateActiveNavLink(activeId) {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => link.classList.remove('active'));
  
  if (activeId) {
    const activeLink = document.getElementById(activeId);
    if (activeLink) {
      activeLink.classList.add('active');
      return;
    }
  }

  // Fallback / Auto-detection
  const pathname = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);
  const category = searchParams.get('category');
  
  if (pathname.includes('product.html')) {
    // Handled dynamically inside loadProductDetails after product data is fetched
    return;
  }
  
  if (pathname.includes('support.html') || pathname.includes('admin.html')) {
    // Do not highlight homepage links
    return;
  }
  
  // We are on index.html / homepage
  if (category === 'laptop-skins') {
    const el = document.getElementById('navLaptopSkins');
    if (el) el.classList.add('active');
  } else if (category === 'mobile-skins') {
    const el = document.getElementById('navMobileSkins');
    if (el) el.classList.add('active');
  } else if (category === 'mobile-covers') {
    const el = document.getElementById('navCovers');
    if (el) el.classList.add('active');
  } else if (category === 'screen-guards') {
    const el = document.getElementById('navGuards');
    if (el) el.classList.add('active');
  } else if (category === 'card-skins') {
    const el = document.getElementById('navCardSkins');
    if (el) el.classList.add('active');
  } else {
    const el = document.getElementById('navHome');
    if (el) el.classList.add('active');
  }
}

// 3. Cart State Management (LocalStorage synced)
let cart = JSON.parse(localStorage.getItem('chetan_cart')) || [];

function saveCart() {
  localStorage.setItem('chetan_cart', JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

function addToCart(item) {
  const existingItemIndex = cart.findIndex(cartItem => 
    cartItem.id === item.id && 
    JSON.stringify(cartItem.variants) === JSON.stringify(item.variants)
  );

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }
  saveCart();
  openCartDrawer();
}

function removeCartItemByIndex(index) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCart();
  }
}

function getCartSubtotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// 4. Cart Drawer UI operations
function openCartDrawer() {
  const overlay = document.getElementById('cartDrawerOverlay');
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden'; 
  }
}

function closeCartDrawer() {
  const overlay = document.getElementById('cartDrawerOverlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = 'auto'; 
  }
}

function renderCartItems() {
  const wrapper = document.getElementById('cartItemsWrapper');
  const subtotalEl = document.getElementById('cartSubtotalAmount');
  
  if (!wrapper) return;
  
  wrapper.innerHTML = '';
  
  if (cart.length === 0) {
    wrapper.innerHTML = `
      <div class="cart-empty-message">
        <p>Your shopping cart is empty.</p>
        <button class="btn-checkout" style="margin-top: 20px; max-width: 200px;" onclick="closeCartDrawer()">Continue Shopping</button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = 'Rs. 0.00';
    return;
  }
  
  cart.forEach((item, index) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    
    const variantDetails = Object.entries(item.variants)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
      
    itemEl.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="cart-item-details">
        <span class="cart-item-title">${item.title}</span>
        <span class="cart-item-variant">${variantDetails}</span>
        <div class="cart-item-meta">
          <span class="cart-item-price">Rs. ${item.price.toFixed(2)} x ${item.quantity}</span>
          <button class="cart-item-remove">Remove</button>
        </div>
      </div>
    `;
    
    const removeBtn = itemEl.querySelector('.cart-item-remove');
    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        removeCartItemByIndex(index);
      });
    }
    
    wrapper.appendChild(itemEl);
  });
  
  if (subtotalEl) {
    subtotalEl.textContent = `Rs. ${getCartSubtotal().toFixed(2)}`;
  }
}

// 5. Checkout Dialog logic
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Please add items to your cart before checking out.", "error");
    return;
  }
  
  const catalog = getCombinedCatalog();
  const oosItem = cart.find(item => {
    const catItem = catalog[item.id];
    return catItem && catItem.inStock === false;
  });
  
  if (oosItem) {
    closeCartDrawer();
    showConfirm(
      `The item "${oosItem.title}" in your cart is currently out of stock. Would you like to remove this item and continue checkout?`,
      () => {
        cart = cart.filter(item => item.id !== oosItem.id);
        saveCart();
        showToast(`Removed "${oosItem.title}" from your cart.`, "success");
        openCheckoutModal();
      },
      () => {
        showToast("Please remove out-of-stock items to complete checkout.", "error");
        openCartDrawer();
      }
    );
    return;
  }
  
  closeCartDrawer();
  const modal = document.getElementById('checkoutModalOverlay');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModalOverlay');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
  }
}

// 6. Dynamic Product Detail Loader
async function loadProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  
  const catalog = await getCombinedCatalog();
  if (!productId || !catalog[productId]) {
    window.location.href = "index.html";
    return;
  }
  
  const product = catalog[productId];
  
  document.title = `${product.title} | Chetan Mobile`;
  
  const titleEl = document.getElementById('prodDetailTitle');
  if (titleEl) titleEl.textContent = product.title;
  
  const priceCurrentEl = document.getElementById('prodPriceCurrent');
  if (priceCurrentEl) priceCurrentEl.textContent = `Rs. ${product.price.toFixed(2)}`;
  
  const priceRegularEl = document.getElementById('prodPriceRegular');
  if (priceRegularEl) priceRegularEl.textContent = `Rs. ${product.regularPrice.toFixed(2)}`;
  
  const descEl = document.getElementById('prodDescription');
  if (descEl) descEl.innerHTML = `<p>${product.description}</p>`;
  
  const ratingStarsEl = document.getElementById('prodRatingStars');
  const ratingTextEl = document.getElementById('prodRatingText');
  if (ratingStarsEl && ratingTextEl) {
    ratingTextEl.textContent = `(${product.reviews} reviews)`;
  }
  
  const gallery = document.querySelector('.product-gallery');
  if (gallery) {
    gallery.dataset.category = product.category;
  }

  const mainImg = document.getElementById('mainGalleryImg');
  if (mainImg && product.images.length > 0) {
    mainImg.src = product.images[0];
  }
  
  const thumbWrapper = document.getElementById('galleryThumbnails');
  if (thumbWrapper) {
    thumbWrapper.innerHTML = '';
    product.images.forEach((imgSrc, index) => {
      const th = document.createElement('div');
      th.className = `thumb ${index === 0 ? 'active' : ''}`;
      th.innerHTML = `<img src="${imgSrc}" alt="${product.title} View ${index + 1}">`;
      
      th.addEventListener('click', () => {
        const thumbs = thumbWrapper.querySelectorAll('.thumb');
        thumbs.forEach(t => t.classList.remove('active'));
        th.classList.add('active');
        if (mainImg) mainImg.src = imgSrc;
      });
      
      thumbWrapper.appendChild(th);
    });
  }
  
  const atcBtn = document.getElementById('btnAddToCart');
  if (atcBtn) {
    atcBtn.dataset.productId = product.id;
    atcBtn.dataset.productTitle = product.title;
    atcBtn.dataset.productPrice = product.price;
  }
  
  renderOptionSelectors(product.category);
  
  await updateDynamicPrice();

  await renderRelatedProducts(product.category, product.id);
  
  // Highlight active category navigation link
  if (product.category === 'laptop-skins') {
    updateActiveNavLink('navLaptopSkins');
  } else if (product.category === 'mobile-skins') {
    updateActiveNavLink('navMobileSkins');
  } else if (product.category === 'mobile-covers') {
    updateActiveNavLink('navCovers');
  } else if (product.category === 'screen-guards') {
    updateActiveNavLink('navGuards');
  } else if (product.category === 'card-skins') {
    updateActiveNavLink('navCardSkins');
  } else {
    updateActiveNavLink();
  }
  
  const qtySelector = document.querySelector('.qty-selector');
  if (product.inStock === false) {
    if (qtySelector) qtySelector.style.display = 'none';
    if (atcBtn) {
      atcBtn.disabled = true;
      atcBtn.style.backgroundColor = '#D9534F';
      atcBtn.style.cursor = 'not-allowed';
      atcBtn.style.opacity = '0.7';
      atcBtn.querySelector('span').textContent = 'Out of Stock';
      const svg = atcBtn.querySelector('svg');
      if (svg) svg.style.display = 'none';
    }
    const saleBadge = document.querySelector('.purchase-price-row .product-badge.sale');
    if (saleBadge) {
      saleBadge.textContent = 'Out of Stock';
      saleBadge.style.backgroundColor = '#D9534F';
      saleBadge.style.display = 'inline-block';
    }
  } else {
    if (qtySelector) qtySelector.style.display = 'flex';
    if (atcBtn) {
      atcBtn.disabled = false;
      atcBtn.style.backgroundColor = '';
      atcBtn.style.cursor = '';
      atcBtn.style.opacity = '';
      atcBtn.querySelector('span').textContent = 'Add to Cart';
      const svg = atcBtn.querySelector('svg');
      if (svg) svg.style.display = 'block';
    }
  }

  // Hide skeletons and reveal real product content
  const skeletonsToHide = [
    'titleSkeleton', 'ratingSkeleton', 'priceSkeleton',
    'descSkeleton', 'optionsSkeleton'
  ];
  skeletonsToHide.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  const elementsToShow = [
    { id: 'prodDetailTitle', display: 'block' },
    { id: 'prodRatingBlock', display: 'flex' },
    { id: 'prodPriceBlock', display: 'block' },
    { id: 'prodDescription', display: 'block' },
    { id: 'prodOptionsContainer', display: 'flex' }
  ];
  elementsToShow.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) el.style.display = item.display;
  });

  const mainImgWrapper = document.getElementById('mainGalleryImgWrapper');
  if (mainImgWrapper) {
    mainImgWrapper.classList.remove('skeleton-pulse');
    mainImgWrapper.style.backgroundColor = 'transparent';
  }
  const mainImg = document.getElementById('mainGalleryImg');
  if (mainImg) {
    mainImg.style.display = 'block';
  }
  const thumbWrapper = document.getElementById('galleryThumbnails');
  if (thumbWrapper) {
    thumbWrapper.style.opacity = '1';
  }
}

// 7. Render dynamic inputs based on category
function renderOptionSelectors(category) {
  const container = document.getElementById('prodOptionsContainer');
  if (!container) return;
  
  container.innerHTML = '';
  
  let html = '';
  
  const laptopBrandsOptions = (typeof LAPTOP_DATABASE !== 'undefined')
    ? Object.keys(LAPTOP_DATABASE).map(b => `<option value="${b}">${b}</option>`).join('\n')
    : `<option value="Apple Macbook">Apple Macbook</option>
       <option value="Acer Laptops">Acer Laptops</option>
       <option value="ASUS Laptops">ASUS Laptops</option>
       <option value="Dell Laptops">Dell Laptops</option>
       <option value="HP Laptops">HP Laptops</option>
       <option value="Lenovo Laptops">Lenovo Laptops</option>`;

  const mobileBrandsOptions = (typeof MOBILE_DATABASE !== 'undefined')
    ? Object.keys(MOBILE_DATABASE).map(b => `<option value="${b}">${b}</option>`).join('\n')
    : `<option value="Apple iPhone">Apple iPhone</option>
       <option value="Samsung">Samsung</option>
       <option value="OnePlus">OnePlus</option>
       <option value="Realme">Realme</option>
       <option value="Poco">Poco</option>`;

  const cardChipOptions = (typeof CARD_DATABASE !== 'undefined')
    ? Object.keys(CARD_DATABASE).map(c => `<option value="${c}">${c}</option>`).join('\n')
    : `<option value="Rectangle Chip (Most Common)">Rectangle Chip (Most Common)</option>
       <option value="Square Chip">Square Chip</option>
       <option value="Metro Card Chip">Metro Card Chip</option>
       <option value="No Chip Cutout (Full Coverage)">No Chip Cutout (Full Cover)</option>`;

  if (category === 'laptop-skins') {
    html = `
      <!-- Laptop Brand -->
      <div class="option-select-group">
        <label class="option-label" for="selectLaptopBrand">Select Your Laptop Brand</label>
        <select id="selectLaptopBrand" class="option-select-dropdown">
          <option value="">-- Please select brand --</option>
          ${laptopBrandsOptions}
        </select>
      </div>
      
      <!-- Laptop Model Selector (Conditional) -->
      <div id="modelGroup" class="option-select-group hidden">
        <label class="option-label" for="selectModel">Select Your Laptop Model</label>
        <select id="selectModel" class="option-select-dropdown">
          <option value="">-- Please select model --</option>
        </select>
      </div>

      <!-- Coverage -->
      <div class="option-select-group">
        <label class="option-label">Cover Area Selection</label>
        <div class="pill-grid">
          <div class="pill-option">
            <input type="radio" id="covTop" name="wrap-coverage" value="Laptop Top Only" checked>
            <label class="pill-label" for="covTop">Top Only</label>
          </div>
          <div class="pill-option">
            <input type="radio" id="covKeypad" name="wrap-coverage" value="Keypad Skin Only">
            <label class="pill-label" for="covKeypad">Keypad Only</label>
          </div>
          <div class="pill-option">
            <input type="radio" id="covBoth" name="wrap-coverage" value="Top + Keypad Skin">
            <label class="pill-label" for="covBoth">Top + Keypad</label>
          </div>
        </div>
      </div>
    `;
  } else if (category === 'mobile-skins') {
    html = `
      <!-- Mobile Brand -->
      <div class="option-select-group">
        <label class="option-label" for="selectBrand">Select Your Mobile Brand</label>
        <select id="selectBrand" class="option-select-dropdown">
          <option value="">-- Please select brand --</option>
          ${mobileBrandsOptions}
        </select>
      </div>
      
      <!-- Mobile Model (Conditional) -->
      <div id="modelGroup" class="option-select-group hidden">
        <label class="option-label" for="selectModel">Select Your Mobile Model</label>
        <select id="selectModel" class="option-select-dropdown">
          <option value="">-- Please select model --</option>
        </select>
      </div>

      <!-- Skin Wrap Type (Fixed/No Options) -->
      <div class="option-select-group">
        <label class="option-label">Wrap Coverage Selection</label>
        <div style="font-size: 13px; color: var(--text-secondary); background: rgba(0,0,0,0.2); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-color); font-weight: 500;">
          Full Body Wrap (Sides & Edges) Included
        </div>
      </div>
    `;
  } else if (category === 'mobile-covers') {
    html = `
      <!-- Mobile Brand for Case -->
      <div class="option-select-group">
        <label class="option-label" for="selectBrand">Select Your Mobile Brand</label>
        <select id="selectBrand" class="option-select-dropdown">
          <option value="">-- Please select brand --</option>
          ${mobileBrandsOptions}
        </select>
      </div>
      
      <!-- Mobile Model for Case (Conditional) -->
      <div id="modelGroup" class="option-select-group hidden">
        <label class="option-label" for="selectModel">Select Your Case Model</label>
        <select id="selectModel" class="option-select-dropdown">
          <option value="">-- Please select model --</option>
        </select>
      </div>

      <!-- Case color/type -->
      <div class="option-select-group">
        <label class="option-label">Case Finish</label>
        <div class="pill-grid">
          <div class="pill-option">
            <input type="radio" id="caseMatte" name="wrap-coverage" value="Matte Black Shockproof" checked>
            <label class="pill-label" for="caseMatte">Matte Black</label>
          </div>
          <div class="pill-option">
            <input type="radio" id="caseClear" name="wrap-coverage" value="Glossy Crystal Clear">
            <label class="pill-label" for="caseClear">Crystal Clear</label>
          </div>
        </div>
      </div>
    `;
  } else if (category === 'screen-guards') {
    html = `
      <!-- Mobile Brand -->
      <div class="option-select-group">
        <label class="option-label" for="selectBrand">Select Your Mobile Brand</label>
        <select id="selectBrand" class="option-select-dropdown">
          <option value="">-- Please select brand --</option>
          ${mobileBrandsOptions}
        </select>
      </div>
      
      <!-- Model Selection (Conditional) -->
      <div id="modelGroup" class="option-select-group hidden">
        <label class="option-label" for="selectModel">Select Your Phone Model</label>
        <select id="selectModel" class="option-select-dropdown">
          <option value="">-- Please select model --</option>
        </select>
      </div>

      <!-- Film Finish -->
      <div class="option-select-group">
        <label class="option-label">Guard Finish</label>
        <div class="pill-grid">
          <div class="pill-option">
            <input type="radio" id="filmClear" name="screen-finish" value="Clear Glossy Guard" checked>
            <label class="pill-label" for="filmClear">Clear Glossy</label>
          </div>
          <div class="pill-option">
            <input type="radio" id="filmMatte" name="screen-finish" value="Matte Anti-Fingerprint Guard">
            <label class="pill-label" for="filmMatte">Matte Anti-Glare</label>
          </div>
        </div>
      </div>

      <!-- Add-on -->
      <div class="option-select-group" style="flex-direction: row; gap: 10px; align-items: center;">
        <input type="checkbox" id="addOnCheck" style="width: 20px; height: 20px; cursor: pointer;">
        <label for="addOnCheck" style="font-size: 14px; cursor: pointer;">Include back-panel screen film (+ Rs. 99.00)</label>
      </div>
    `;
  } else if (category === 'card-skins') {
    html = `
      <!-- Chip shape -->
      <div class="option-select-group">
        <label class="option-label" for="selectChipShape">Select Card Chip Shape</label>
        <select id="selectChipShape" class="option-select-dropdown">
          <option value="">-- Please select chip shape --</option>
          ${cardChipOptions}
        </select>
      </div>
    `;
  }
  
  container.innerHTML = html;
  
  setupDynamicSelectors();
  setupDynamicPriceListeners();
}

async function renderRelatedProducts(category, currentId) {
  const grid = document.getElementById('relatedProductsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  
  const catalog = await getCombinedCatalog();
  const allProducts = Object.values(catalog).filter(p => p.id !== currentId && p.inStock !== false);
  
  const related = allProducts.sort((a, b) => {
    if (a.category === category && b.category !== category) return -1;
    if (a.category !== category && b.category === category) return 1;
    return 0;
  }).slice(0, 4);
  
  if (related.length === 0) {
    const section = document.getElementById('relatedProductsSection');
    if (section) section.style.display = 'none';
    return;
  }
  
  const section = document.getElementById('relatedProductsSection');
  if (section) section.style.display = 'block';
  
  related.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = prod.category;
    
    const isCardSkin = prod.category === 'card-skins';
    const hoverImage = isCardSkin
      ? 'https://worthwrap.in/cdn/shop/files/Rectunglar_Chip.webp?v=1753722551&width=713'
      : (prod.images && prod.images.length > 1 ? prod.images[1] : (prod.images && prod.images.length > 0 ? prod.images[0] : 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800'));
      
    card.innerHTML = `
      <a href="product.html?id=${prod.id}">
        <div class="product-img-wrapper">
          <span class="product-badge sale">Sale</span>
          <img src="${prod.images && prod.images.length > 0 ? prod.images[0] : 'images/products/custom-laptop-1.webp'}" alt="${prod.title}" class="product-img primary" loading="lazy" decoding="async">
          <img src="${hoverImage}" alt="${prod.title}" class="product-img secondary" loading="lazy" decoding="async">
        </div>
        <div class="product-info">
          <h3 class="product-title-card">${prod.title}</h3>
          <div class="product-price-wrapper">
            <span class="price-current">Rs. ${prod.price.toFixed(2)}</span>
            <span class="price-regular">Rs. ${prod.regularPrice.toFixed(2)}</span>
          </div>
        </div>
      </a>
    `;
    grid.appendChild(card);
  });
}

async function updateDynamicPrice() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const catalog = await getCombinedCatalog();
  if (!productId || !catalog[productId]) return;
  
  const product = catalog[productId];
  let basePrice = product.price;
  let baseRegularPrice = product.regularPrice;
  
  if (product.category === 'laptop-skins') {
    const selectedCoverage = document.querySelector('input[name="wrap-coverage"]:checked');
    if (selectedCoverage) {
      if (selectedCoverage.value === 'Laptop Top Only') {
        basePrice = product.price;
        baseRegularPrice = product.regularPrice;
      } else if (selectedCoverage.value === 'Keypad Skin Only') {
        basePrice = product.keypadPrice !== undefined && product.keypadPrice !== null ? product.keypadPrice : product.price;
        baseRegularPrice = product.keypadRegularPrice !== undefined && product.keypadRegularPrice !== null ? product.keypadRegularPrice : product.regularPrice;
      } else if (selectedCoverage.value === 'Top + Keypad Skin') {
        basePrice = product.bothPrice !== undefined && product.bothPrice !== null ? product.bothPrice : 599.00;
        baseRegularPrice = product.bothRegularPrice !== undefined && product.bothRegularPrice !== null ? product.bothRegularPrice : 2199.00;
      }
    }
  } else if (product.category === 'screen-guards') {
    const addOnCheck = document.getElementById('addOnCheck');
    if (addOnCheck && addOnCheck.checked) {
      basePrice = product.price + 99.00;
      baseRegularPrice = product.regularPrice + 200.00;
    }
  }
  
  const priceCurrentEl = document.getElementById('prodPriceCurrent');
  if (priceCurrentEl) priceCurrentEl.textContent = `Rs. ${basePrice.toFixed(2)}`;
  
  const priceRegularEl = document.getElementById('prodPriceRegular');
  if (priceRegularEl) priceRegularEl.textContent = `Rs. ${baseRegularPrice.toFixed(2)}`;
  
  const atcBtn = document.getElementById('btnAddToCart');
  if (atcBtn) {
    atcBtn.dataset.productPrice = basePrice;
  }
}

function setupDynamicPriceListeners() {
  const coverageRadios = document.querySelectorAll('input[name="wrap-coverage"]');
  coverageRadios.forEach(radio => {
    radio.addEventListener('change', () => updateDynamicPrice());
  });
  
  const addOnCheck = document.getElementById('addOnCheck');
  if (addOnCheck) {
    addOnCheck.addEventListener('change', () => updateDynamicPrice());
  }
}

function setupDynamicSelectors() {
  const brandSelect = document.getElementById('selectBrand') || document.getElementById('selectLaptopBrand');
  const modelGroup = document.getElementById('modelGroup');
  const modelSelect = document.getElementById('selectModel');
  
  if (brandSelect && modelGroup && modelSelect) {
    brandSelect.addEventListener('change', () => {
      const brand = brandSelect.value;
      
      modelSelect.innerHTML = '<option value="">-- Select Model --</option>';
      
      if (!brand) {
        modelGroup.classList.add('hidden');
        return;
      }
      
      let models = [];
      if (typeof LAPTOP_DATABASE !== 'undefined' && LAPTOP_DATABASE[brand]) {
        models = LAPTOP_DATABASE[brand];
      } else if (typeof MOBILE_DATABASE !== 'undefined' && MOBILE_DATABASE[brand]) {
        models = MOBILE_DATABASE[brand];
      }
      
      if (models.length > 0) {
        models.forEach(model => {
          const opt = document.createElement('option');
          opt.value = model;
          opt.textContent = model;
          modelSelect.appendChild(opt);
        });
        modelGroup.classList.remove('hidden');
      } else {
        modelGroup.classList.add('hidden');
      }
    });
  }
}

// Dynamic Catalog Grid Renderer
async function renderCatalogGrid() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  
  const catalog = await getCombinedCatalog();
  
  grid.innerHTML = '';
  
  Object.values(catalog).forEach(product => {
    const isOutOfStock = product.inStock === false;
    const stockBadgeHtml = isOutOfStock ? '<span class="product-badge out-of-stock">Out of Stock</span>' : '';
    const saleBadgeHtml = (product.price < product.regularPrice && !isOutOfStock) ? '<span class="product-badge sale">Sale</span>' : '';
    
    const badgeHtml = stockBadgeHtml || saleBadgeHtml;
    
    const card = document.createElement('div');
    card.className = `product-card ${isOutOfStock ? 'out-of-stock-card' : ''}`;
    card.dataset.category = product.category;
    
    const isCardSkin = product.category === 'card-skins';
    const hoverImage = isCardSkin
      ? 'https://worthwrap.in/cdn/shop/files/Rectunglar_Chip.webp?v=1753722551&width=713'
      : (product.images[1] ? product.images[1] : product.images[0]);

    card.innerHTML = `
      <a href="product.html?id=${product.id}">
        <div class="product-img-wrapper">
          ${badgeHtml}
          <img src="${product.images[0]}" alt="${product.title}" class="product-img primary" loading="lazy" decoding="async">
          <img src="${hoverImage}" alt="${product.title}" class="product-img secondary" loading="lazy" decoding="async">
        </div>
        <div class="product-info">
          <div class="product-rating">★ ${(product.rating || 5.0).toFixed(1)} <span style="color: var(--text-secondary); font-size: 12px;">(${product.reviews || 0})</span></div>
          <h3 class="product-title-card">${product.title}</h3>
          <div class="product-price-wrapper">
            <span class="price-current">Rs. ${product.price.toFixed(2)}</span>
            ${product.price < product.regularPrice ? `<span class="price-regular">Rs. ${product.regularPrice.toFixed(2)}</span>` : ''}
          </div>
        </div>
      </a>
    `;
    grid.appendChild(card);
  });
}

// 8. Initialize dynamic page bindings
document.addEventListener('DOMContentLoaded', async () => {
  // ── Theme Toggle System ──
  function initTheme() {
    const root = document.documentElement;
    const stored = localStorage.getItem('chetan_theme');
    
    if (stored === 'dark') {
      root.classList.remove('theme-light');
      root.classList.add('theme-dark');
    } else if (stored === 'light') {
      root.classList.remove('theme-dark');
      root.classList.add('theme-light');
    }
    // If no stored preference, CSS prefers-color-scheme handles it automatically

    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isDark = root.classList.contains('theme-dark') ||
          (!root.classList.contains('theme-light') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        if (isDark) {
          root.classList.remove('theme-dark');
          root.classList.add('theme-light');
          localStorage.setItem('chetan_theme', 'light');
        } else {
          root.classList.remove('theme-light');
          root.classList.add('theme-dark');
          localStorage.setItem('chetan_theme', 'dark');
        }
      });
    }
  }
  initTheme();

  // ── Mobile Hamburger Menu ──
  function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.getElementById('mobileMenuOverlay');
    const closeBtn = document.getElementById('mobileNavCloseBtn');

    function openMenu() {
      if (navLinks) navLinks.classList.add('active');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      if (navLinks) navLinks.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (menuBtn) menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Close menu when a nav link is clicked (on mobile)
    if (navLinks) {
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
      });
    }
  }
  initMobileMenu();

  // Update header navigation link highlight matching current URL
  updateActiveNavLink();

  try {
    await renderCatalogGrid();
  } catch (err) {
    console.error("Catalog rendering failed:", err);
  }

  updateCartCount();
  renderCartItems();

  const cartTriggers = document.querySelectorAll('.cart-trigger-btn');
  cartTriggers.forEach(btn => btn.addEventListener('click', openCartDrawer));
  
  const cartClose = document.getElementById('cartCloseBtn');
  if (cartClose) cartClose.addEventListener('click', closeCartDrawer);
  
  const drawerOverlay = document.getElementById('cartDrawerOverlay');
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) closeCartDrawer();
    });
  }

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckoutModal);
  
  const modalClose = document.getElementById('modalCloseBtn');
  if (modalClose) modalClose.addEventListener('click', closeCheckoutModal);

  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('chkName').value;
      const phone = document.getElementById('chkPhone').value;
      const address = document.getElementById('chkAddress').value;
      
      if (!name || !phone || !address) {
        showToast("Please fill in all details.", "error");
        return;
      }

      const catalog = await getCombinedCatalog();
      let message = `*NEW ORDER - CHETAN MOBILE*\n\n`;
      message += `*Customer Details:*\n`;
      message += `• *Name:* ${name}\n`;
      message += `• *Phone:* ${phone}\n`;
      message += `• *Address:* ${address}\n\n`;
      message += `*Ordered Items:*\n`;
      
      cart.forEach((item, index) => {
        const sku = catalog[item.id] ? catalog[item.id].code : 'N/A';
        const variantsStr = Object.entries(item.variants)
          .map(([k, v]) => `  - ${k}: ${v}`)
          .join('\n');
          
        message += `${index + 1}. *${item.title}*\n`;
        message += `   - *SKU/Code:* ${sku}\n`;
        message += `   - *Price:* Rs. ${item.price.toFixed(2)}\n`;
        message += `   - *Qty:* ${item.quantity}\n`;
        if (variantsStr) {
          message += `   - *Options:*\n${variantsStr}\n`;
        }
        message += `\n`;
      });
      
      const subtotal = getCartSubtotal();
      message += `*Order Summary:*\n`;
      message += `• *Subtotal:* Rs. ${subtotal.toFixed(2)}\n`;
      message += `• *Shipping:* FREE\n`;
      message += `• *Grand Total:* *Rs. ${subtotal.toFixed(2)}*\n\n`;
      message += `Please confirm my order. Thank you!`;
      
      const whatsappUrl = `https://wa.me/919109416554?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
      
      const content = document.getElementById('checkoutModalContent');
      if (content) {
        content.innerHTML = `
          <div class="checkout-success-view" style="text-align: center;">
            <div class="success-icon" style="background-color: #25D366; color: #fff; font-size: 32px; width: 64px; height: 64px; line-height: 64px; border-radius: 50%; margin: 0 auto 20px auto; display: flex; align-items: center; justify-content: center;">✓</div>
            <h3 class="modal-title" style="margin-bottom: 12px; font-family: var(--font-heading); font-size: 20px; text-transform: uppercase;">WhatsApp Checkout</h3>
            <p style="color: var(--text-secondary); margin-bottom: 24px; font-size: 14px; line-height: 1.5;">Thank you, ${name}! Your order template has been compiled. We have redirected you to WhatsApp to complete your checkout and confirm delivery.</p>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <a href="${whatsappUrl}" target="_blank" class="btn-checkout" style="background-color: #25D366; border-color: #25D366; color: #fff; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; width: 100%; height: 48px; border-radius: 6px; border: none; cursor: pointer;">
                Send WhatsApp Message Again
              </a>
              <button class="btn-outline" onclick="completeOrder()" style="width: 100%; border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 12px; cursor: pointer; color: var(--text-primary); font-weight: 600; background: transparent;">
                Return to Storefront
              </button>
            </div>
          </div>
        `;
      }
    });
  }

  const tabContainer = document.querySelector('.category-tabs');
  if (tabContainer) {
    const tabButtons = tabContainer.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        
        // Update URL and navigation active highlights
        if (category === 'all') {
          window.history.pushState({}, '', 'index.html');
          updateActiveNavLink('navHome');
        } else {
          window.history.pushState({}, '', `index.html?category=${category}`);
          if (category === 'laptop-skins') updateActiveNavLink('navLaptopSkins');
          else if (category === 'mobile-skins') updateActiveNavLink('navMobileSkins');
          else if (category === 'mobile-covers') updateActiveNavLink('navCovers');
          else if (category === 'screen-guards') updateActiveNavLink('navGuards');
          else if (category === 'card-skins') updateActiveNavLink('navCardSkins');
          else updateActiveNavLink(); // Clear others
        }
        
        productCards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'flex';
            setTimeout(() => card.style.opacity = '1', 50);
          } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      });
    });

    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category');
    if (catParam) {
      const targetTab = tabContainer.querySelector(`.tab-btn[data-category="${catParam}"]`);
      if (targetTab) {
        setTimeout(() => targetTab.click(), 100);
      }
    }

    const categoryLinks = document.querySelectorAll('a[href*="index.html?category="]');
    categoryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
        if (isHomePage) {
          e.preventDefault();
          const url = new URL(link.href);
          const cat = url.searchParams.get('category');
          const targetTab = tabContainer.querySelector(`.tab-btn[data-category="${cat}"]`);
          if (targetTab) {
            targetTab.click();
            window.history.pushState({}, '', link.href);
          }
        }
      });
    });

    const homeLinks = document.querySelectorAll('a[href="index.html"]');
    homeLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
        if (isHomePage) {
          e.preventDefault();
          const targetTab = tabContainer.querySelector('.tab-btn[data-category="all"]');
          if (targetTab) {
            targetTab.click();
            window.history.pushState({}, '', 'index.html');
          }
        }
      });
    });
  }

  if (document.getElementById('prodDetailTitle')) {
    loadProductDetails().catch(err => console.error("Error loading product details:", err));

    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const qtyInput = document.getElementById('qtyVal');
    
    if (qtyMinus && qtyPlus && qtyInput) {
      qtyMinus.addEventListener('click', () => {
        let current = parseInt(qtyInput.value) || 1;
        if (current > 1) {
          qtyInput.value = current - 1;
        }
      });
      qtyPlus.addEventListener('click', () => {
        let current = parseInt(qtyInput.value) || 1;
        qtyInput.value = current + 1;
      });
    }

    const atcBtn = document.getElementById('btnAddToCart');
    if (atcBtn) {
      atcBtn.addEventListener('click', async () => {
        const productId = atcBtn.dataset.productId;
        const catalog = await getCombinedCatalog();
        const product = catalog[productId];
        if (!product) return;

        const productTitle = atcBtn.dataset.productTitle;
        const productPrice = parseFloat(atcBtn.dataset.productPrice);
        const productImage = document.getElementById('mainGalleryImg').src;
        const quantity = parseInt(qtyInput ? qtyInput.value : 1) || 1;
        
        const variants = {};
        
        const brandSelect = document.getElementById('selectBrand') || document.getElementById('selectLaptopBrand');
        const modelGroup = document.getElementById('modelGroup');
        const modelSelect = document.getElementById('selectModel');

        if (brandSelect && brandSelect.value) {
          variants['Brand'] = brandSelect.value;
        } else if (brandSelect) {
          showToast('Please select a Brand.', 'error');
          brandSelect.focus();
          return;
        }
        
        if (modelSelect && !modelGroup.classList.contains('hidden')) {
          if (modelSelect.value) {
            variants['Model'] = modelSelect.value;
          } else {
            showToast('Please select a Model.', 'error');
            modelSelect.focus();
            return;
          }
        }
        
        if (product.category === 'mobile-skins') {
          variants['Coverage'] = 'Full Body Wrap (Sides & Edges)';
        } else {
          const wrapTypeRadio = document.querySelector('input[name="wrap-coverage"]:checked');
          if (wrapTypeRadio) {
            variants['Coverage'] = wrapTypeRadio.value;
          }
        }
        
        const cardChipSelect = document.getElementById('selectChipShape');
        if (cardChipSelect) {
          if (cardChipSelect.value) {
            variants['Chip Cutout'] = cardChipSelect.value;
          } else {
            showToast('Please select your Card Chip Shape.', 'error');
            cardChipSelect.focus();
            return;
          }
        }

        const screenTypeRadio = document.querySelector('input[name="screen-finish"]:checked');
        if (screenTypeRadio) {
          variants['Finish'] = screenTypeRadio.value;
        }

        const addOnCheck = document.getElementById('addOnCheck');
        if (addOnCheck) {
          variants['Back Protector'] = addOnCheck.checked ? 'Yes' : 'No';
        }
        
        const item = {
          id: productId,
          title: productTitle,
          price: productPrice,
          image: productImage,
          quantity: quantity,
          variants: variants
        };
        
        addToCart(item);
      });
    }
  }
});

function completeOrder() {
  cart = [];
  saveCart();
  closeCheckoutModal();
  window.location.href = "index.html";
}

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
    background-color: #1A1A1A;
    color: #FAF9F6;
    padding: 14px 20px;
    border-radius: 6px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.25);
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

// Custom Styled Confirmation Dialog Modal
function showConfirm(message, onConfirm, onCancel) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 100000;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(4px);
    font-family: 'Archivo', sans-serif;
  `;
  
  const card = document.createElement('div');
  card.style.cssText = `
    background-color: #1A1A1A;
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 8px;
    padding: 28px;
    max-width: 420px;
    width: 90%;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    text-align: center;
  `;
  
  card.innerHTML = `
    <h4 style="color: #FAF9F6; margin: 0 0 16px 0; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Confirm Action</h4>
    <p style="color: rgba(250, 249, 246, 0.7); margin: 0 0 24px 0; font-size: 13px; line-height: 1.5; font-weight: 400;">${message}</p>
    <div style="display: flex; gap: 12px; justify-content: center;">
      <button id="confirmCancelBtn" style="background: none; border: 1px solid rgba(250, 249, 246, 0.2); color: #FAF9F6; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; flex: 1; transition: background 0.2s;">Cancel</button>
      <button id="confirmConfirmBtn" style="background: #B89C72; border: none; color: #1A1A1A; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 700; flex: 1; transition: background 0.2s;">Confirm</button>
    </div>
  `;
  
  overlay.appendChild(card);
  document.body.appendChild(overlay);
  
  const cancelBtn = card.querySelector('#confirmCancelBtn');
  const confirmBtn = card.querySelector('#confirmConfirmBtn');
  
  cancelBtn.addEventListener('click', () => {
    overlay.remove();
    if (onCancel) onCancel();
  });
  
  confirmBtn.addEventListener('click', () => {
    overlay.remove();
    if (onConfirm) onConfirm();
  });
}
