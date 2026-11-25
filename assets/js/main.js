/**
 * LUXE LIVING — Global Web App Application Controller
 * Version: 2.0.0 (Web App Edition)
 * Includes PWA Service Worker, Multi-Currency Engine, Wishlist State,
 * Live Command Search (Cmd+K), Revolution Slider, Cart Drawer, and Customizer Integration.
 */

// Global Configuration & Currency Rates
window.LuxeConfig = {
  brandName: "Luxe Living",
  phone: "+1 (800) 589-3548",
  phoneRaw: "18005893548",
  whatsappNumber: "18005893548",
  email: "concierge@luxeliving.com",
  showroomAddress: "740 Madison Avenue, New York, NY 10065",
  freeShippingThreshold: 5000,
  currentCurrency: localStorage.getItem('luxeliving_currency') || 'USD',
  rates: {
    USD: { rate: 1.0, symbol: '$', suffix: '' },
    EUR: { rate: 0.92, symbol: '€', suffix: '' },
    GBP: { rate: 0.79, symbol: '£', suffix: '' },
    AED: { rate: 3.67, symbol: 'AED ', suffix: '' }
  }
};

// Global Reactive Web App State
const LuxeState = {
  cart: JSON.parse(localStorage.getItem('luxeliving_cart')) || [
    {
      id: 'aurelia-sectional',
      name: 'The Aurelia Velvet Sectional',
      price: 7850,
      finish: 'Deep Emerald Velvet',
      qty: 1,
      image: 'assets/images/hero-slide-1.jpg'
    }
  ],
  wishlist: JSON.parse(localStorage.getItem('luxeliving_wishlist')) || [
    'elysian-accent-chair'
  ],
  products: [
    {
      id: 'aurelia-sectional',
      name: 'The Aurelia Velvet Sectional',
      category: 'living',
      price: 7850,
      badge: 'Signature Piece',
      image: 'assets/images/hero-slide-1.jpg',
      description: 'Masterfully tailored modular sofa upholstered in plush deep emerald velvet, anchored with a brushed champagne brass plinth.',
      dimensions: 'W 340cm x D 195cm x H 78cm',
      materials: 'Hand-stretched Italian velvet, kiln-dried FSC European beechwood frame, high-resilience down-blend cushioning.',
      finishes: [
        { name: 'Deep Emerald Velvet', hex: '#0B3D2E' },
        { name: 'Obsidian Velvet', hex: '#111111' },
        { name: 'Warm Taupe Bouclé', hex: '#756B60' }
      ]
    },
    {
      id: 'sovereign-dining-table',
      name: 'Sovereign Calacatta Marble Dining Table',
      category: 'dining',
      price: 6400,
      badge: 'Artisanal Made',
      image: 'assets/images/hero-slide-2.jpg',
      description: 'Sculptural Calacatta Viola marble monolithic top with chamfered bullnose edge, resting upon twin fluted bronze-wrapped pedestals.',
      dimensions: 'L 280cm x W 115cm x H 76cm',
      materials: 'Book-matched Italian Calacatta Viola marble, matte protective sealer, cast architectural bronze pedestals.',
      finishes: [
        { name: 'Calacatta Viola', hex: '#582B35' },
        { name: 'Nero Marquina', hex: '#1C1C1C' },
        { name: 'Carrara Pure White', hex: '#EAE6DF' }
      ]
    },
    {
      id: 'elysian-accent-chair',
      name: 'Elysian Swivel Lounge Chair',
      category: 'accent',
      price: 2950,
      badge: 'Curated Icon',
      image: 'assets/images/product-chair.jpg',
      description: 'Organic sculptural curve offering enveloping comfort. Features smooth 360-degree silent swivel in champagne gold brushed satin.',
      dimensions: 'W 88cm x D 84cm x H 74cm',
      materials: 'Textured ivory merino-wool bouclé, inner cold-cured foam, satin brass swivel base.',
      finishes: [
        { name: 'Warm Ivory Bouclé', hex: '#F4EFE6' },
        { name: 'Deep Emerald Velvet', hex: '#0B3D2E' },
        { name: 'Charcoal Cashmere', hex: '#2A2A2A' }
      ]
    },
    {
      id: 'belvedere-media-console',
      name: 'Belvedere Fluted Media Credenza',
      category: 'living',
      price: 4200,
      badge: 'Showroom Featured',
      image: 'assets/images/showroom-reference.jpg',
      description: 'Inspired directly by our flagship showroom interior. Low-profile credenza featuring fluted smoked oak, honed grey marble top, and champagne gold legs.',
      dimensions: 'W 240cm x D 48cm x H 52cm',
      materials: 'Honed Italian grey marble, solid smoked European oak, champagne gold brushed alloy feet.',
      finishes: [
        { name: 'Smoked Oak & Grey Marble', hex: '#4A433B' },
        { name: 'Ebonized Ash & Nero Marble', hex: '#1A1A1A' }
      ]
    },
    {
      id: 'palazzo-platform-bed',
      name: 'Palazzo Channel-Tufted Bed',
      category: 'bedroom',
      price: 5600,
      badge: 'Bespoke Order',
      image: 'assets/images/hero-slide-3.jpg',
      description: 'A sanctuary of modern luxury. Architectural floor-extended channel-tufted headboard with integrated brushed brass reading sconces.',
      dimensions: 'W 230cm x L 225cm x H 140cm (King)',
      materials: 'Rich emerald velvet or taupe cashmere, acoustic padded interior, solid walnut slatted platform.',
      finishes: [
        { name: 'Emerald Velvet', hex: '#0B3D2E' },
        { name: 'Warm Taupe Cashmere', hex: '#756B60' },
        { name: 'Ivory Linen Weave', hex: '#F4EFE6' }
      ]
    },
    {
      id: 'vesper-alabaster-chandelier',
      name: 'Vesper Tiered Alabaster Chandelier',
      category: 'decor',
      price: 3450,
      badge: 'Limited Edition',
      image: 'assets/images/product-lighting.jpg',
      description: 'Naturally veined Spanish alabaster disks suspended in a cascading geometric formation on hand-rubbed champagne gold stems.',
      dimensions: 'Diameter 90cm x Drop Height 120cm (Adjustable)',
      materials: 'Natural carved Spanish alabaster, warm 2700K integrated LEDs, hand-rubbed satin brass.',
      finishes: [
        { name: 'Satin Champagne Brass', hex: '#C5A46D' },
        { name: 'Smoked Gunmetal', hex: '#2E2E2E' }
      ]
    },
    {
      id: 'marquina-coffee-table',
      name: 'Bespoke Nero Marquina Coffee Table',
      category: 'living',
      price: 3100,
      badge: 'Natural Stone',
      image: 'assets/images/product-coffee-table.jpg',
      description: 'Low-profile monolithic silhouette with rounded chamfer corners and soft-touch satin finish that showcases striking natural white veining.',
      dimensions: 'W 140cm x D 75cm x H 38cm',
      materials: 'Spanish Nero Marquina marble, internal honeycomb composite for stability, felt glides.',
      finishes: [
        { name: 'Nero Marquina', hex: '#181818' },
        { name: 'Calacatta Warm Gold', hex: '#EDE8DF' }
      ]
    },
    {
      id: 'verona-side-table',
      name: 'Verona Occasional Sculptural Table',
      category: 'accent',
      price: 1750,
      badge: 'Sculptural Art',
      image: 'assets/images/product-side-table.jpg',
      description: 'An architectural dialogue between cast champagne bronze and smoked tempered glass. Ideal companion for accent seating.',
      dimensions: 'Diameter 50cm x H 55cm',
      materials: 'Cast bronze plinth, 12mm smoked grey tempered safety glass, silicone dampers.',
      finishes: [
        { name: 'Champagne Bronze', hex: '#C5A46D' },
        { name: 'Obsidian Black Patina', hex: '#1C1C1C' }
      ]
    }
  ]
};

// Global Currency Formatter
window.formatCurrency = function(amountInUSD) {
  const cur = LuxeConfig.currentCurrency || 'USD';
  const info = LuxeConfig.rates[cur] || LuxeConfig.rates.USD;
  const converted = Math.round(amountInUSD * info.rate);
  return `${info.symbol}${converted.toLocaleString()}${info.suffix}`;
};

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  initServiceWorker();
  initCurrencyEngine();
  initWishlistEngine();
  initCommandPalette();
  initPWAInstallPrompt();
  initOfflineDetector();
  initHeader();
  initHeroSlider();
  initCollectionsAndFilter();
  initCartDrawer();
  initModals();
  initForms();
  initWhatsAppButtons();
  initBackToTop();
  updateCartBadge();
  updateWishlistBadge();
});

/* ==========================================================================
   1. Progressive Web App (PWA) Service Worker Registration
   ========================================================================== */
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('[Luxe Living App] Service Worker active, scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('[Luxe Living App] Service Worker registration failed:', err);
        });
    });
  }
}

/* ==========================================================================
   2. Multi-Currency Engine
   ========================================================================== */
function initCurrencyEngine() {
  const currencySelector = document.getElementById('currencySelector');
  if (currencySelector) {
    currencySelector.value = LuxeConfig.currentCurrency;
    currencySelector.addEventListener('change', (e) => {
      LuxeConfig.currentCurrency = e.target.value;
      localStorage.setItem('luxeliving_currency', LuxeConfig.currentCurrency);
      updateAllPricesOnPage();
      if (window.renderCartDrawer) window.renderCartDrawer();
      if (window.renderWishlistDrawer) window.renderWishlistDrawer();
      showToast(`Currency updated to ${LuxeConfig.currentCurrency}`);
    });
  }
  updateAllPricesOnPage();
}

function updateAllPricesOnPage() {
  // Update all product cards
  document.querySelectorAll('.product-card').forEach(card => {
    const btn = card.querySelector('.btn-add-cart');
    const productId = btn?.dataset.productId;
    const product = LuxeState.products.find(p => p.id === productId);
    const priceEl = card.querySelector('.product-price');
    if (product && priceEl) {
      priceEl.textContent = window.formatCurrency(product.price);
    }
  });

  // Update quickview if open
  const qvPrice = document.querySelector('.quickview-price');
  if (qvPrice && qvPrice.dataset.basePrice) {
    qvPrice.textContent = window.formatCurrency(parseInt(qvPrice.dataset.basePrice, 10));
  }
}

/* ==========================================================================
   3. Wishlist / Favorites Engine
   ========================================================================== */
function initWishlistEngine() {
  const wishlistToggleBtns = document.querySelectorAll('.wishlist-toggle-btn');
  const wishlistOverlay = document.querySelector('.wishlist-overlay');
  const wishlistDrawer = document.querySelector('.wishlist-drawer');
  const wishlistCloseBtn = document.querySelector('.wishlist-close-btn');
  const btnMoveAllToCart = document.getElementById('btnMoveAllToCart');

  function openWishlist() {
    wishlistOverlay?.classList.add('is-open');
    if (wishlistOverlay) wishlistOverlay.style.opacity = '1';
    if (wishlistOverlay) wishlistOverlay.style.pointerEvents = 'auto';
    if (wishlistDrawer) wishlistDrawer.style.transform = 'translateX(0)';
    document.body.style.overflow = 'hidden';
    renderWishlistDrawer();
  }

  function closeWishlist() {
    if (wishlistOverlay) wishlistOverlay.style.opacity = '0';
    if (wishlistOverlay) wishlistOverlay.style.pointerEvents = 'none';
    if (wishlistDrawer) wishlistDrawer.style.transform = 'translateX(100%)';
    document.body.style.overflow = '';
  }

  wishlistToggleBtns.forEach(btn => btn.addEventListener('click', openWishlist));
  wishlistCloseBtn?.addEventListener('click', closeWishlist);
  wishlistOverlay?.addEventListener('click', closeWishlist);

  btnMoveAllToCart?.addEventListener('click', () => {
    if (LuxeState.wishlist.length === 0) return;
    LuxeState.wishlist.forEach(id => {
      const prod = LuxeState.products.find(p => p.id === id);
      if (prod) {
        window.addToCart({
          id: prod.id,
          name: prod.name,
          price: prod.price,
          finish: prod.finishes[0]?.name || 'Standard Finish',
          image: prod.image,
          qty: 1
        });
      }
    });
    LuxeState.wishlist = [];
    localStorage.setItem('luxeliving_wishlist', JSON.stringify(LuxeState.wishlist));
    updateWishlistBadge();
    closeWishlist();
    showToast('All wishlist pieces moved to your bag.');
  });

  // Attach wishlist heart buttons to product cards
  document.querySelectorAll('.product-card').forEach(card => {
    const btn = card.querySelector('.btn-add-cart');
    const productId = btn?.dataset.productId;
    const thumbWrap = card.querySelector('.product-thumb-wrap');
    if (thumbWrap && productId && !thumbWrap.querySelector('.product-wishlist-btn')) {
      const heartBtn = document.createElement('button');
      heartBtn.className = 'product-wishlist-btn';
      heartBtn.title = 'Add to Wishlist';
      heartBtn.style.cssText = 'position: absolute; top: 14px; right: 14px; width: 36px; height: 36px; border-radius: 50%; background: rgba(17,17,17,0.7); backdrop-filter: blur(8px); border: 1px solid rgba(197,164,109,0.3); color: var(--color-ivory); display: flex; align-items: center; justify-content: center; z-index: 3; transition: all 0.2s ease; cursor: pointer;';
      
      const isFav = LuxeState.wishlist.includes(productId);
      heartBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? '#C5A46D' : 'none'}" stroke="${isFav ? '#C5A46D' : 'currentColor'}" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      `;

      heartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWishlist(productId, heartBtn);
      });

      thumbWrap.appendChild(heartBtn);
    }
  });

  window.renderWishlistDrawer = renderWishlistDrawer;
}

function toggleWishlist(productId, btnEl) {
  const idx = LuxeState.wishlist.indexOf(productId);
  const prod = LuxeState.products.find(p => p.id === productId);

  if (idx > -1) {
    LuxeState.wishlist.splice(idx, 1);
    if (btnEl) {
      btnEl.querySelector('svg').setAttribute('fill', 'none');
      btnEl.querySelector('svg').setAttribute('stroke', 'currentColor');
    }
    showToast(`Removed from your wishlist.`);
  } else {
    LuxeState.wishlist.push(productId);
    if (btnEl) {
      btnEl.querySelector('svg').setAttribute('fill', '#C5A46D');
      btnEl.querySelector('svg').setAttribute('stroke', '#C5A46D');
    }
    showToast(`${prod?.name || 'Item'} saved to your wishlist.`);
  }

  localStorage.setItem('luxeliving_wishlist', JSON.stringify(LuxeState.wishlist));
  updateWishlistBadge();
  if (window.renderWishlistDrawer) window.renderWishlistDrawer();
}

function updateWishlistBadge() {
  const count = LuxeState.wishlist.length;
  document.querySelectorAll('.wishlist-badge').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

function renderWishlistDrawer() {
  const listEl = document.querySelector('.wishlist-items-list');
  const emptyEl = document.querySelector('.wishlist-empty-state');
  if (!listEl) return;

  if (LuxeState.wishlist.length === 0) {
    listEl.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';

  listEl.innerHTML = LuxeState.wishlist.map(id => {
    const prod = LuxeState.products.find(p => p.id === id);
    if (!prod) return '';
    return `
      <div class="cart-item" style="display: flex; gap: 16px; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.06);">
        <img src="${prod.image}" alt="${prod.name}" style="width: 70px; height: 70px; border-radius: 4px; object-fit: cover; border: 1px solid rgba(197,164,109,0.2);">
        <div style="flex-grow: 1;">
          <h4 style="font-family: var(--font-serif); font-size: 1.05rem; color: var(--color-ivory); margin-bottom: 4px;">${prod.name}</h4>
          <div style="font-size: 0.875rem; color: var(--color-gold); font-weight: 600; margin-bottom: 8px;">${window.formatCurrency(prod.price)}</div>
          <div style="display: flex; gap: 12px; align-items: center;">
            <button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.6875rem;" onclick="addToCart({ id: '${prod.id}', name: '${prod.name}', price: ${prod.price}, finish: '${prod.finishes[0]?.name}', image: '${prod.image}', qty: 1 });">
              Add to Bag
            </button>
            <button style="font-size: 0.6875rem; color: var(--color-taupe-light); text-transform: uppercase;" onclick="toggleWishlist('${prod.id}');">
              Remove
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   4. Command Palette & Instant Search (Cmd+K / Ctrl+K)
   ========================================================================== */
function initCommandPalette() {
  const searchModal = document.getElementById('searchModal');
  const searchTriggerBtn = document.getElementById('searchTriggerBtn');
  const liveSearchInput = document.getElementById('liveSearchInput');
  const searchResultsList = document.getElementById('searchResultsList');

  function openSearch() {
    searchModal?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => liveSearchInput?.focus(), 150);
    renderSearchResults('');
  }

  function closeSearch() {
    searchModal?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  searchTriggerBtn?.addEventListener('click', openSearch);

  // Keyboard shortcut Ctrl+K / Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (searchModal?.classList.contains('is-open')) closeSearch();
      else openSearch();
    }
  });

  liveSearchInput?.addEventListener('input', (e) => {
    renderSearchResults(e.target.value.trim().toLowerCase());
  });

  function renderSearchResults(query) {
    if (!searchResultsList) return;

    const searchableItems = [
      ...LuxeState.products.map(p => ({
        type: 'Product',
        title: p.name,
        sub: `${p.category.toUpperCase()} • ${window.formatCurrency(p.price)}`,
        link: `index.html#furniture`,
        action: () => openQuickViewModal(p.id)
      })),
      { type: 'Service', title: 'Luxury Furniture Sales', sub: 'Flagship showroom & bespoke acquisitions', link: 'services.html#furniture-sales' },
      { type: 'Service', title: 'Furniture Customisation', sub: 'Custom dimensions, fabrics & marbles', link: 'services.html#customisation' },
      { type: 'Service', title: 'Interior Styling Advisory', sub: 'Room curation, lighting, and palette harmony', link: 'services.html#styling' },
      { type: 'Service', title: 'Space Planning & 3D Layout', sub: 'Architectural scale drafting and floorplans', link: 'services.html#space-planning' },
      { type: 'Service', title: 'White-Glove Delivery & Installation', sub: 'Climate-controlled freight and placement', link: 'services.html#delivery' },
      { type: 'Tool', title: 'Interactive Bespoke Customizer', sub: 'Real-time 3D furniture customizer app', link: 'customizer.html' },
      { type: 'Atelier', title: 'Madison Avenue Flagship Showroom', sub: '740 Madison Avenue, New York, NY 10065', link: 'contact.html' }
    ];

    const filtered = query === '' 
      ? searchableItems.slice(0, 5) 
      : searchableItems.filter(item => 
          item.title.toLowerCase().includes(query) || 
          item.sub.toLowerCase().includes(query) || 
          item.type.toLowerCase().includes(query)
        );

    if (filtered.length === 0) {
      searchResultsList.innerHTML = `
        <div style="text-align: center; padding: 24px; color: var(--color-taupe-light);">
          No matching furniture or atelier services found for "${query}".
        </div>
      `;
      return;
    }

    searchResultsList.innerHTML = filtered.map(item => `
      <div class="search-result-row" style="padding: 12px 16px; border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; background: rgba(255,255,255,0.02); display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: all 0.2s ease;">
        <div>
          <span style="font-size: 0.65rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-gold); font-weight: 700;">${item.type}</span>
          <div style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--color-ivory);">${item.title}</div>
          <div style="font-size: 0.75rem; color: var(--color-taupe-light);">${item.sub}</div>
        </div>
        <a href="${item.link}" class="btn-link-gold" style="font-size: 0.75rem;">View &rarr;</a>
      </div>
    `).join('');

    searchResultsList.querySelectorAll('.search-result-row').forEach((row, i) => {
      row.addEventListener('click', () => {
        closeSearch();
        if (filtered[i].action) filtered[i].action();
        else window.location.href = filtered[i].link;
      });
    });
  }
}

/* ==========================================================================
   5. PWA Install Banner & App Prompt Engine
   ========================================================================== */
let deferredPrompt = null;
function initPWAInstallPrompt() {
  const pwaBanner = document.getElementById('pwaBanner');
  const btnPwaAccept = document.getElementById('btnPwaAccept');
  const btnPwaDismiss = document.getElementById('btnPwaDismiss');
  const installBtns = document.querySelectorAll('.pwa-install-btn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (pwaBanner) pwaBanner.style.display = 'flex';
    installBtns.forEach(btn => btn.style.display = 'inline-flex');
  });

  btnPwaAccept?.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      showToast('Luxe Living App installed successfully.');
    }
    deferredPrompt = null;
    if (pwaBanner) pwaBanner.style.display = 'none';
  });

  btnPwaDismiss?.addEventListener('click', () => {
    if (pwaBanner) pwaBanner.style.display = 'none';
  });

  installBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') showToast('Luxe Living App installed.');
        deferredPrompt = null;
      } else {
        showToast('App is ready. In Safari/Chrome, tap "Add to Home Screen".');
      }
    });
  });
}

/* ==========================================================================
   6. Offline Status Indicator
   ========================================================================== */
function initOfflineDetector() {
  window.addEventListener('offline', () => {
    showToast('Offline Mode Active. Cached collections & atelier remain accessible.');
  });
  window.addEventListener('online', () => {
    showToast('Connection restored. Live atelier synchronization active.');
  });
}

/* ==========================================================================
   Header & Mobile Navigation
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  }, { passive: true });

  if (toggleBtn && mobileDrawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('is-open');
      toggleBtn.classList.toggle('is-active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileDrawer.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
        toggleBtn.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ==========================================================================
   REVOLUTION SLIDER CONTROLLER
   ========================================================================== */
function initHeroSlider() {
  const slider = document.querySelector('.hero-slider-section');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide');
  const progressBar = slider.querySelector('.slider-progress-fill');
  const currentNumEl = slider.querySelector('.slide-number');
  const dots = slider.querySelectorAll('.slider-dot');
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');

  if (!slides.length) return;

  let currentIndex = 0;
  const slideDuration = 7500;
  let slideTimer = null;
  let progressStart = 0;
  let progressAnimFrame = null;
  let isPaused = false;

  function goToSlide(index) {
    slides[currentIndex].classList.remove('is-active');
    if (dots[currentIndex]) dots[currentIndex].classList.remove('is-active');

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.add('is-active');
    if (dots[currentIndex]) dots[currentIndex].classList.add('is-active');

    if (currentNumEl) {
      currentNumEl.textContent = `0${currentIndex + 1}`;
    }

    resetTimer();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function resetTimer() {
    cancelAnimationFrame(progressAnimFrame);
    if (slideTimer) clearTimeout(slideTimer);

    if (progressBar) progressBar.style.width = '0%';
    progressStart = performance.now();

    function updateProgress(now) {
      if (isPaused) {
        progressAnimFrame = requestAnimationFrame(updateProgress);
        return;
      }
      const elapsed = now - progressStart;
      const pct = Math.min((elapsed / slideDuration) * 100, 100);
      if (progressBar) progressBar.style.width = `${pct}%`;

      if (elapsed < slideDuration) {
        progressAnimFrame = requestAnimationFrame(updateProgress);
      } else {
        nextSlide();
      }
    }

    progressAnimFrame = requestAnimationFrame(updateProgress);
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => goToSlide(idx));
  });

  slider.addEventListener('mouseenter', () => { isPaused = true; });
  slider.addEventListener('mouseleave', () => { isPaused = false; });

  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  goToSlide(0);
}

/* ==========================================================================
   Collections & Filterable Product Catalog
   ========================================================================== */
function initCollectionsAndFilter() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const productCards = document.querySelectorAll('.product-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');

      const filterCategory = pill.dataset.filter;

      productCards.forEach(card => {
        if (filterCategory === 'all' || card.dataset.category === filterCategory) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   Shopping Cart Engine (Drawer, Badge, Currency Support)
   ========================================================================== */
function initCartDrawer() {
  const cartToggleBtns = document.querySelectorAll('.cart-toggle-btn');
  const cartOverlay = document.querySelector('.cart-overlay');
  const cartDrawer = document.querySelector('.cart-drawer');
  const cartCloseBtn = document.querySelector('.cart-close-btn');
  const cartItemsList = document.querySelector('.cart-items-list');
  const cartEmptyState = document.querySelector('.cart-empty-state');
  const subtotalEl = document.querySelector('.cart-subtotal-val');
  const totalEl = document.querySelector('.cart-total-val');
  const checkoutBtn = document.querySelector('.cart-checkout-btn');

  function openCart() {
    cartOverlay?.classList.add('is-open');
    cartDrawer?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    renderCart();
  }

  function closeCart() {
    cartOverlay?.classList.remove('is-open');
    cartDrawer?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  cartToggleBtns.forEach(btn => btn.addEventListener('click', openCart));
  cartCloseBtn?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  window.openCartDrawer = openCart;

  function renderCart() {
    if (!cartItemsList) return;

    if (LuxeState.cart.length === 0) {
      cartItemsList.innerHTML = '';
      if (cartEmptyState) cartEmptyState.style.display = 'block';
      if (subtotalEl) subtotalEl.textContent = window.formatCurrency(0);
      if (totalEl) totalEl.textContent = window.formatCurrency(0);
      return;
    }

    if (cartEmptyState) cartEmptyState.style.display = 'none';

    let total = 0;
    cartItemsList.innerHTML = LuxeState.cart.map((item, index) => {
      const itemSubtotal = item.price * item.qty;
      total += itemSubtotal;
      return `
        <div class="cart-item" data-index="${index}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb" onerror="this.src='assets/images/showroom-reference.jpg'" />
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-variant">${item.finish || 'Signature Finish'}</div>
            <div class="cart-item-price">${window.formatCurrency(item.price)}</div>
            <div class="cart-item-controls">
              <div class="cart-qty-wrap">
                <button class="cart-qty-btn qty-minus" onclick="updateCartItemQty(${index}, -1)">–</button>
                <span class="cart-qty-val">${item.qty}</span>
                <button class="cart-qty-btn qty-plus" onclick="updateCartItemQty(${index}, 1)">+</button>
              </div>
              <button class="cart-remove-btn" onclick="removeCartItem(${index})">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (subtotalEl) subtotalEl.textContent = window.formatCurrency(total);
    if (totalEl) totalEl.textContent = window.formatCurrency(total);
    updateCartBadge();
  }

  checkoutBtn?.addEventListener('click', () => {
    closeCart();
    openCheckoutModal();
  });

  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = btn.dataset.productId;
      const product = LuxeState.products.find(p => p.id === productId);
      if (product) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          finish: product.finishes[0]?.name || 'Signature Finish',
          image: product.image,
          qty: 1
        });
      }
    });
  });

  window.renderCartDrawer = renderCart;
}

window.addToCart = function(item) {
  const existingIndex = LuxeState.cart.findIndex(i => i.id === item.id && i.finish === item.finish);
  if (existingIndex > -1) {
    LuxeState.cart[existingIndex].qty += (item.qty || 1);
  } else {
    LuxeState.cart.push({ ...item, qty: item.qty || 1 });
  }

  localStorage.setItem('luxeliving_cart', JSON.stringify(LuxeState.cart));
  updateCartBadge();
  if (window.renderCartDrawer) window.renderCartDrawer();
  showToast(`${item.name} added to your shopping bag.`);
  if (window.openCartDrawer) window.openCartDrawer();
};

window.updateCartItemQty = function(index, delta) {
  if (!LuxeState.cart[index]) return;
  LuxeState.cart[index].qty += delta;
  if (LuxeState.cart[index].qty <= 0) {
    LuxeState.cart.splice(index, 1);
  }
  localStorage.setItem('luxeliving_cart', JSON.stringify(LuxeState.cart));
  if (window.renderCartDrawer) window.renderCartDrawer();
  updateCartBadge();
};

window.removeCartItem = function(index) {
  if (!LuxeState.cart[index]) return;
  const removed = LuxeState.cart.splice(index, 1);
  localStorage.setItem('luxeliving_cart', JSON.stringify(LuxeState.cart));
  if (window.renderCartDrawer) window.renderCartDrawer();
  updateCartBadge();
  if (removed[0]) showToast(`${removed[0].name} removed from your bag.`);
};

function updateCartBadge() {
  const totalCount = LuxeState.cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? 'flex' : 'none';
  });
}

/* ==========================================================================
   Modals: Quick View, Consultation Booking, Checkout
   ========================================================================== */
function initModals() {
  document.querySelectorAll('.product-quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = btn.dataset.productId;
      openQuickViewModal(productId);
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });

    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal));
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.is-open').forEach(closeModal);
    }
  });

  document.querySelectorAll('.btn-book-consultation').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.dataset.service || 'General Furniture & Interior Consultation';
      openBookingModal(serviceName);
    });
  });
}

function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove('is-open');
  document.body.style.overflow = '';
}

function openQuickViewModal(productId) {
  const product = LuxeState.products.find(p => p.id === productId);
  if (!product) return;

  const modal = document.querySelector('#quickViewModal');
  if (!modal) return;

  let selectedFinish = product.finishes[0]?.name || 'Signature';

  modal.querySelector('.quickview-title').textContent = product.name;
  modal.querySelector('.quickview-category').textContent = product.category.toUpperCase();
  
  const priceEl = modal.querySelector('.quickview-price');
  priceEl.dataset.basePrice = product.price;
  priceEl.textContent = window.formatCurrency(product.price);
  
  modal.querySelector('.quickview-desc').textContent = product.description;
  modal.querySelector('.quickview-dimensions').textContent = product.dimensions;
  modal.querySelector('.quickview-materials').textContent = product.materials;

  const imgEl = modal.querySelector('.quickview-img');
  imgEl.src = product.image;
  imgEl.onerror = () => { imgEl.src = 'assets/images/showroom-reference.jpg'; };

  const swatchesContainer = modal.querySelector('.quickview-swatches');
  if (swatchesContainer) {
    swatchesContainer.innerHTML = product.finishes.map((f, i) => `
      <button class="swatch-btn ${i === 0 ? 'is-active' : ''}" title="${f.name}" data-finish="${f.name}">
        <span class="swatch-inner" style="background-color: ${f.hex}"></span>
      </button>
    `).join('');

    const swatchButtons = swatchesContainer.querySelectorAll('.swatch-btn');
    swatchButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        swatchButtons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        selectedFinish = btn.dataset.finish;
        modal.querySelector('.selected-finish-name').textContent = selectedFinish;
      });
    });

    modal.querySelector('.selected-finish-name').textContent = selectedFinish;
  }

  const addBtn = modal.querySelector('.quickview-add-cart-btn');
  addBtn.onclick = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      finish: selectedFinish,
      image: product.image,
      qty: 1
    });
    closeModal(modal);
  };

  openModal(modal);
}

function openBookingModal(serviceName = '') {
  const modal = document.querySelector('#bookingModal');
  if (!modal) return;

  const serviceSelect = modal.querySelector('#bookingService');
  if (serviceSelect && serviceName) {
    for (let opt of serviceSelect.options) {
      if (opt.text.toLowerCase().includes(serviceName.toLowerCase()) || opt.value.toLowerCase().includes(serviceName.toLowerCase())) {
        opt.selected = true;
        break;
      }
    }
  }

  openModal(modal);
}

function openCheckoutModal() {
  const modal = document.querySelector('#checkoutModal');
  if (!modal) return;

  const total = LuxeState.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const checkoutItemsCount = modal.querySelector('.checkout-items-count');
  const checkoutTotal = modal.querySelector('.checkout-total');

  if (checkoutItemsCount) checkoutItemsCount.textContent = `${LuxeState.cart.reduce((sum, item) => sum + item.qty, 0)} pieces`;
  if (checkoutTotal) checkoutTotal.textContent = window.formatCurrency(total);

  openModal(modal);
}

/* ==========================================================================
   Form Handling & Validation
   ========================================================================== */
function initForms() {
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const fields = [
        { id: 'contactName', test: val => val.trim().length >= 2, msg: 'Please provide your full name.' },
        { id: 'contactEmail', test: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), msg: 'Please provide a valid email address.' },
        { id: 'contactPhone', test: val => val.trim().length >= 7, msg: 'Please provide your contact telephone number.' },
        { id: 'contactSubject', test: val => val !== '', msg: 'Please select an enquiry subject.' },
        { id: 'contactMessage', test: val => val.trim().length >= 10, msg: 'Please share details of your project or enquiry.' }
      ];

      fields.forEach(f => {
        const input = document.getElementById(f.id);
        if (!input) return;
        const group = input.closest('.form-group');
        const errEl = group?.querySelector('.form-error-msg');

        if (!f.test(input.value)) {
          isValid = false;
          group?.classList.add('has-error');
          if (errEl) errEl.textContent = f.msg;
        } else {
          group?.classList.remove('has-error');
        }
      });

      if (!isValid) return;

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Enquiry...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();

        const confirmModal = document.querySelector('#confirmationModal');
        if (confirmModal) {
          const refCode = 'LX-' + Math.floor(100000 + Math.random() * 900000);
          confirmModal.querySelector('.enquiry-ref-code').textContent = refCode;
          openModal(confirmModal);
        } else {
          showToast('Thank you! Your private enquiry has been sent to our concierge.');
        }
      }, 1000);
    });
  }

  const bookingForm = document.querySelector('#bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Securing VIP Reservation...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Confirm Reservation';
        closeModal(document.querySelector('#bookingModal'));
        bookingForm.reset();
        showToast('Your VIP design consultation has been successfully booked.');
      }, 900);
    });
  }

  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        input.value = '';
        showToast('Welcome to the Luxe Living Private Circle.');
      } else {
        showToast('Please enter a valid email address.');
      }
    });
  });
}

/* ==========================================================================
   WhatsApp Concierge Launcher
   ========================================================================== */
function initWhatsAppButtons() {
  document.querySelectorAll('.btn-whatsapp-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const topic = btn.dataset.topic || 'General Luxury Furniture Enquiry';
      const text = encodeURIComponent(
        `Hello Luxe Living Atelier, I am interested in exploring: "${topic}". Please connect me with a private client concierge.`
      );
      const url = `https://wa.me/${LuxeConfig.whatsappNumber}?text=${text}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
}

/* ==========================================================================
   Back to Top & Toast Engine
   ========================================================================== */
function initBackToTop() {
  const bttBtn = document.querySelector('.back-to-top');
  if (!bttBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      bttBtn.classList.add('is-visible');
    } else {
      bttBtn.classList.remove('is-visible');
    }
  }, { passive: true });

  bttBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C5A46D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

window.showToast = showToast;
