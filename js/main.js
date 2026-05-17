const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "Electronics",
        price: 299.99,
        originalPrice: 399.99,
        rating: 4.8,
        reviews: 124,
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        description: "Experience premium sound quality with these advanced wireless headphones. Features active noise cancellation, 30-hour battery life, and premium memory foam ear cushions for ultimate comfort.",
        availability: "https://schema.org/InStock"
    },
    {
        id: 2,
        name: "Minimalist Leather Watch",
        category: "Accessories",
        price: 189.99,
        originalPrice: 249.99,
        rating: 4.9,
        reviews: 89,
        badge: "New",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        description: "Elegant minimalist timepiece with genuine leather strap and sapphire crystal glass. Water-resistant up to 50m with precise quartz movement for reliable timekeeping.",
        availability: "https://schema.org/InStock"
    },
    {
        id: 3,
        name: "Ergonomic Office Chair",
        category: "Furniture",
        price: 449.99,
        originalPrice: 599.99,
        rating: 4.7,
        reviews: 56,
        badge: "Sale",
        image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop",
        description: "Designed for all-day comfort with adjustable lumbar support, breathable mesh back, and padded armrests. Height adjustable with smooth-rolling casters for easy mobility.",
        availability: "https://schema.org/InStock"
    },
    {
        id: 4,
        name: "Smart Fitness Tracker",
        category: "Electronics",
        price: 159.99,
        originalPrice: 199.99,
        rating: 4.6,
        reviews: 203,
        badge: null,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
        description: "Track your fitness journey with heart rate monitoring, GPS tracking, and 14+ sport modes. Water-resistant up to 50m with 7-day battery life and sleep tracking.",
        availability: "https://schema.org/InStock"
    },
    {
        id: 5,
        name: "Vintage Sunglasses",
        category: "Accessories",
        price: 129.99,
        originalPrice: 179.99,
        rating: 4.8,
        reviews: 67,
        badge: "Trending",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
        description: "Classic vintage-style sunglasses with UV400 protection. Lightweight frames with premium polarized lenses that reduce glare and provide crystal clear vision.",
        availability: "https://schema.org/InStock"
    },
    {
        id: 6,
        name: "Designer Handbag",
        category: "Fashion",
        price: 349.99,
        originalPrice: 449.99,
        rating: 4.9,
        reviews: 45,
        badge: "Premium",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
        description: "Luxurious designer handbag crafted from premium leather with gold-tone hardware. Features multiple compartments, magnetic closure, and detachable shoulder strap.",
        availability: "https://schema.org/InStock"
    },
    {
        id: 7,
        name: "Portable Bluetooth Speaker",
        category: "Electronics",
        price: 89.99,
        originalPrice: 129.99,
        rating: 4.5,
        reviews: 189,
        badge: null,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
        description: "Compact wireless speaker with powerful 360-degree sound. Waterproof design with 12-hour battery life. Perfect for outdoor adventures and poolside parties.",
        availability: "https://schema.org/InStock"
    },
    {
        id: 8,
        name: "Running Shoes Pro",
        category: "Sports",
        price: 179.99,
        originalPrice: 229.99,
        rating: 4.7,
        reviews: 132,
        badge: "Popular",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        description: "Professional running shoes with responsive cushioning and breathable mesh upper. Designed for speed and comfort with durable rubber outsole for excellent traction.",
        availability: "https://schema.org/InStock"
    }
];

let currentQuickViewProduct = null;
let lastFocusedElement = null;

const categories = [
    { name: "Electronics", count: 245, icon: "📱" },
    { name: "Fashion", count: 189, icon: "👗" },
    { name: "Accessories", count: 156, icon: "⌚" },
    { name: "Furniture", count: 98, icon: "🪑" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'All';
let currentSort = 'default';

const filterCategories = [
    { name: 'All', count: 0 },
    { name: 'Electronics', count: 0 },
    { name: 'Fashion', count: 0 },
    { name: 'Accessories', count: 0 },
    { name: 'Furniture', count: 0 },
    { name: 'Sports', count: 0 }
];

function init() {
    renderCategories();
    renderFilterButtons();
    renderProducts();
    updateCartCount();
    initMiniCart();
    setupEventListeners();
    setupFilterListeners();
    generateProductSchema();
    initMobileFeatures();
}

// Generate JSON-LD structured data for products
function generateProductSchema() {
    const productListElements = products.map((product, index) => ({
        "@type": "ListItem",
        "@id": `https://shope.example.com/product-${product.id}`,
        "position": index + 1,
        "item": {
            "@type": "Product",
            "name": product.name,
            "image": product.image,
            "description": product.description,
            "category": product.category,
            "offers": {
                "@type": "Offer",
                "url": `https://shope.example.com/product-${product.id}`,
                "price": product.price,
                "priceCurrency": "USD",
                "priceValidUntil": "2026-12-31",
                "availability": product.availability,
                "seller": {
                    "@type": "Organization",
                    "name": "Shope"
                }
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": product.rating,
                "reviewCount": product.reviews,
                "bestRating": "5",
                "worstRating": "1"
            }
        }
    }));

    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Featured Products",
        "description": "Handpicked selections for the discerning shopper",
        "url": "https://shope.example.com/#products",
        "itemListElement": productListElements
    };

    const schemaEl = document.getElementById('product-schema');
    if (schemaEl) {
        schemaEl.textContent = JSON.stringify(schema);
    }
}

function renderFilterButtons() {
    const container = document.getElementById('filter-buttons');
    if (!container) return;

    // Update counts based on actual products
    filterCategories.forEach(cat => {
        if (cat.name === 'All') {
            cat.count = products.length;
        } else {
            cat.count = products.filter(p => p.category === cat.name).length;
        }
    });

    container.innerHTML = filterCategories.map(cat => `
        <button class="filter-btn ${cat.name === currentFilter ? 'active' : ''}"
                data-filter="${cat.name}"
                role="radio"
                aria-checked="${cat.name === currentFilter}">
            ${cat.name}
            <span class="filter-count">${cat.count}</span>
        </button>
    `).join('');
}

function setupFilterListeners() {
    // Filter button clicks and keyboard support
    const filterContainer = document.getElementById('filter-buttons');
    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (btn) {
                currentFilter = btn.dataset.filter;
                renderFilterButtons();
                renderProducts();
                // Announce filter change for screen readers
                announceFilterChange(currentFilter);
            }
        });

        // Keyboard support for filter buttons
        filterContainer.addEventListener('keydown', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;

            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                currentFilter = btn.dataset.filter;
                renderFilterButtons();
                renderProducts();
                announceFilterChange(currentFilter);
            }
        });
    }

    // Sort dropdown change
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderProducts();
        });
    }
}

// Announce filter changes for screen readers
function announceFilterChange(filter) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'visually-hidden';
    announcement.textContent = `Showing ${filter} products`;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

function filterAndSortProducts() {
    let filtered = [...products];

    // Apply category filter
    if (currentFilter !== 'All') {
        filtered = filtered.filter(p => p.category === currentFilter);
    }

    // Apply sorting
    switch (currentSort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filtered.sort((a, b) => b.id - a.id);
            break;
        default:
            // Keep original order
            break;
    }

    return filtered;
}

function renderCategories() {
    const grid = document.getElementById('categories-grid');
    if (!grid) return;

    grid.innerHTML = categories.map(cat => `
        <article class="category-card" role="listitem" tabindex="0" aria-label="${cat.name}, ${cat.count} products">
            <div class="category-icon" aria-hidden="true">${cat.icon}</div>
            <h3 class="category-name">${cat.name}</h3>
            <span class="category-count">${cat.count} Products</span>
        </article>
    `).join('');
}

function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    const filteredProducts = filterAndSortProducts();

    grid.innerHTML = filteredProducts.map((product, index) => {
        // Generate star rating
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 >= 0.5;
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHtml += '<svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
            } else if (i === fullStars && hasHalfStar) {
                starsHtml += '<svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
            } else {
                starsHtml += '<svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
            }
        }

        // Badge class for styling
        const badgeClass = product.badge ? product.badge.toLowerCase() : '';

        return `
        <article class="product-card" data-category="${product.category}" data-id="${product.id}" role="listitem" aria-label="${product.name}, ${product.category}, $${product.price.toFixed(2)}" style="animation-delay: ${index * 0.05}s;">
            <div class="product-image product-image-gallery">
                <img src="${product.image}" alt="${product.name}" loading="lazy" width="400" height="300">
                ${product.badge ? `<span class="product-badge ${badgeClass}" role="status">${product.badge}</span>` : ''}
                <div class="product-actions" role="group" aria-label="Product actions">
                    <button class="product-action wishlist-btn" onclick="toggleWishlist(event, ${product.id})" title="Add to wishlist" aria-label="Add ${product.name} to wishlist">
                        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <button class="product-action" onclick="quickView(${product.id})" title="Quick view" aria-label="Quick view ${product.name}">
                        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price" aria-label="Price: $${product.price.toFixed(2)}">
                    <span class="product-price-currency">$</span><span class="product-price-current">${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="product-price-original" aria-label="Original price: $${product.originalPrice.toFixed(2)}">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-rating" aria-label="Rating: ${product.rating} out of 5 stars, ${product.reviews} reviews">
                    <div class="rating-stars">${starsHtml}</div>
                    <span class="rating-text">${product.rating} (${product.reviews})</span>
                </div>
                <button class="quick-add-btn" onclick="quickAddToCart(event, ${product.id})" aria-label="Add ${product.name} to cart">
                    <span class="quick-add-text">
                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        Quick Add
                    </span>
                    <span class="quick-add-check">
                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Added!
                    </span>
                </button>
            </div>
        </article>
    `}).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartCount();
            renderCart();
        }
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (countEl) {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        countEl.textContent = total;
    }
}

function toggleWishlist(event, productId) {
    event.stopPropagation();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Toggle wishlist button state
    const btn = event.currentTarget;
    const isActive = btn.classList.contains('active');

    if (isActive) {
        btn.classList.remove('active');
        showToast(`Removed ${product.name} from wishlist`);
    } else {
        btn.classList.add('active');
        showToast(`Added ${product.name} to wishlist!`);
    }
}

// Quick add to cart function
function quickAddToCart(event, productId) {
    event.stopPropagation();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const btn = event.currentTarget;

    // Check if already added
    if (btn.classList.contains('added')) {
        return; // Already added
    }

    // Add to cart
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    updateBottomCartCount();

    // Visual feedback - show checkmark
    btn.classList.add('added');

    // Create ripple effect
    createButtonRipple(event, btn);

    // Show toast notification
    showToast(`${product.name} added to cart!`);

    // Reset button after 2 seconds
    setTimeout(() => {
        btn.classList.remove('added');
    }, 2000);
}

// Create ripple effect for buttons
function createButtonRipple(event, button) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';

    button.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

// Handle keyboard events for product actions
function handleProductActionKeydown(event, productId, action) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (action === 'wishlist') {
            toggleWishlist(productId);
        } else if (action === 'quickview') {
            quickView(productId);
        }
    }
}

// Mini Cart Functions
function initMiniCart() {
    const cartIcon = document.querySelector('.header-icon[title="Cart"]');
    if (!cartIcon) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'mini-cart-wrapper';
    cartIcon.parentNode.insertBefore(wrapper, cartIcon);
    wrapper.appendChild(cartIcon);

    const miniCart = document.createElement('div');
    miniCart.className = 'mini-cart';
    miniCart.id = 'mini-cart';
    wrapper.appendChild(miniCart);

    // Event listeners for show/hide
    wrapper.addEventListener('mouseenter', showMiniCart);
    wrapper.addEventListener('mouseleave', hideMiniCart);

    // Initial render
    renderMiniCart();
}

function showMiniCart() {
    const miniCart = document.getElementById('mini-cart');
    if (miniCart) {
        renderMiniCart();
        miniCart.classList.add('active');
    }
}

function hideMiniCart() {
    const miniCart = document.getElementById('mini-cart');
    if (miniCart) {
        miniCart.classList.remove('active');
    }
}

function renderMiniCart() {
    const miniCart = document.getElementById('mini-cart');
    if (!miniCart) return;

    const displayItems = cart.slice(0, 3);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cart.length === 0) {
        miniCart.innerHTML = `
            <div class="mini-cart-header">
                <span class="mini-cart-title">Shopping Cart</span>
                <button class="mini-cart-close" onclick="hideMiniCart()" aria-label="Close cart">
                    <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="mini-cart-empty">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }

    const itemsHtml = displayItems.map(item => `
        <article class="mini-cart-item" aria-label="${item.name}, quantity ${item.quantity}">
            <div class="mini-cart-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="mini-cart-item-details">
                <span class="mini-cart-item-name" title="${item.name}">${item.name}</span>
                <span class="mini-cart-item-price">$${item.price.toFixed(2)}</span>
                <div class="mini-cart-item-quantity" role="group" aria-label="Quantity controls for ${item.name}">
                    <button class="mini-cart-qty-btn" onclick="updateMiniCartQuantity(${item.id}, -1)" aria-label="Decrease quantity of ${item.name}">-</button>
                    <span class="mini-cart-qty" aria-label="Quantity: ${item.quantity}">${item.quantity}</span>
                    <button class="mini-cart-qty-btn" onclick="updateMiniCartQuantity(${item.id}, 1)" aria-label="Increase quantity of ${item.name}">+</button>
                </div>
            </div>
            <button class="mini-cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove item" aria-label="Remove ${item.name} from cart">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
            </button>
        </article>
    `).join('');

    const viewAllHtml = cart.length > 3 ? `<a href="#" class="mini-cart-view-all" role="button" onclick="showFullCart(event)">View all ${cart.length} items</a>` : '';

    miniCart.innerHTML = `
        <div class="mini-cart-header">
            <span class="mini-cart-title">Shopping Cart</span>
            <button class="mini-cart-close" onclick="hideMiniCart()" aria-label="Close cart">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
        <div class="mini-cart-items" role="list">
            ${itemsHtml}
        </div>
        ${viewAllHtml}
        <div class="mini-cart-footer">
            <div class="mini-cart-total">
                <span class="mini-cart-total-label">${totalItems} item${totalItems !== 1 ? 's' : ''}</span>
                <span class="mini-cart-total-amount">$${totalPrice.toFixed(2)}</span>
            </div>
            <a href="#" class="mini-cart-view-cart" role="button" onclick="showFullCart(event)">View Cart</a>
        </div>
    `;
}

function updateMiniCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartCount();
            renderMiniCart();
        }
    }
}

function showFullCart(event) {
    event.preventDefault();
    hideMiniCart();
    showToast('Opening full cart...');
}

function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentQuickViewProduct = product;

    document.getElementById('qv-image').src = product.image;
    document.getElementById('qv-image').alt = product.name;
    document.getElementById('qv-category').textContent = product.category;
    document.getElementById('qv-name').textContent = product.name;
    document.getElementById('qv-description').textContent = product.description;
    document.getElementById('qv-rating').innerHTML = `
        <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <span>${product.rating} (${product.reviews} reviews)</span>
    `;
    document.getElementById('qv-price').innerHTML = `
        <span class="quick-view-price-current">$${product.price.toFixed(2)}</span>
        ${product.originalPrice ? `<span class="quick-view-price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
    `;

    const badgeEl = document.getElementById('qv-badge');
    if (product.badge) {
        badgeEl.textContent = product.badge;
        badgeEl.style.display = 'block';
    } else {
        badgeEl.style.display = 'none';
    }

    const modal = document.getElementById('quick-view-modal');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Store last focused element
    lastFocusedElement = document.activeElement;

    // Focus the close button for accessibility
    const closeBtn = modal.querySelector('.quick-view-close');
    if (closeBtn) {
        setTimeout(() => closeBtn.focus(), 100);
    }
}

function closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    currentQuickViewProduct = null;

    // Restore focus to the element that opened the modal
    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}

function addToCartFromQuickView() {
    if (currentQuickViewProduct) {
        addToCart(currentQuickViewProduct.id);
        closeQuickView();
    }
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeQuickView();
    }
});

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--color-primary);
        color: white;
        padding: 16px 32px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
        toast.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function setupEventListeners() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Close cart, quick view, checkout modal, and success modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const cartDrawer = document.getElementById('cart-drawer');
            const quickViewModal = document.getElementById('quick-view-modal');
            const checkoutModal = document.getElementById('checkout-modal');
            const successModal = document.getElementById('success-modal');

            if (cartDrawer && cartDrawer.classList.contains('active')) {
                closeCart();
            }
            if (quickViewModal && quickViewModal.classList.contains('active')) {
                closeQuickView();
            }
            if (checkoutModal && checkoutModal.classList.contains('active')) {
                closeCheckout();
            }
            if (successModal && successModal.classList.contains('active')) {
                closeSuccessModal();
            }
        }
    });

    // Add keyboard support for category cards
    const categoriesGrid = document.getElementById('categories-grid');
    if (categoriesGrid) {
        categoriesGrid.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const card = e.target.closest('.category-card');
                if (card) {
                    e.preventDefault();
                    const categoryName = card.querySelector('.category-name').textContent;
                    currentFilter = categoryName;
                    renderFilterButtons();
                    renderProducts();
                    // Scroll to products section
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // Menu toggle keyboard support
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const nav = document.querySelector('.nav');
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !isExpanded);
                nav.style.display = isExpanded ? 'none' : 'flex';
            }
        });
    }
}

// Cart Drawer Functions
function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    const toggleBtn = document.getElementById('cart-toggle-btn');
    const isActive = drawer.classList.contains('active');

    drawer.classList.toggle('active');
    document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';

    // Update aria-expanded
    if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', drawer.classList.contains('active'));
    }

    // Update aria-hidden on dialog
    drawer.setAttribute('aria-hidden', !drawer.classList.contains('active'));

    if (drawer.classList.contains('active')) {
        renderCart();
        // Store last focused element for restoration
        lastFocusedElement = document.activeElement;
        // Focus the close button for accessibility
        const closeBtn = drawer.querySelector('.cart-close');
        if (closeBtn) {
            setTimeout(() => closeBtn.focus(), 100);
        }
    } else {
        // Restore focus to toggle button
        if (toggleBtn) {
            toggleBtn.focus();
        }
    }
}

function openCart() {
    const drawer = document.getElementById('cart-drawer');
    const toggleBtn = document.getElementById('cart-toggle-btn');

    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'true');
    }
    drawer.setAttribute('aria-hidden', 'false');

    renderCart();
    lastFocusedElement = document.activeElement;
    const closeBtn = drawer.querySelector('.cart-close');
    if (closeBtn) {
        setTimeout(() => closeBtn.focus(), 100);
    }
}

function closeCart() {
    const drawer = document.getElementById('cart-drawer');
    const toggleBtn = document.getElementById('cart-toggle-btn');

    drawer.classList.remove('active');
    document.body.style.overflow = '';

    if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'false');
    }
    drawer.setAttribute('aria-hidden', 'true');

    // Restore focus to the toggle button
    if (toggleBtn) {
        toggleBtn.focus();
    }
}

function renderCart() {
    const cartItemsEl = document.getElementById('cart-items');
    const cartFooterEl = document.getElementById('cart-footer');

    if (!cartItemsEl || !cartFooterEl) return;

    if (cart.length === 0) {
        cartItemsEl.innerHTML = `
            <div class="cart-empty" role="status">
                <div class="cart-empty-icon">
                    <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                </div>
                <h3 class="cart-empty-title">Your cart is empty</h3>
                <p class="cart-empty-text">Looks like you haven't added any items to your cart yet.</p>
                <button class="cart-empty-btn" onclick="closeCart()" role="button">
                    Continue Shopping
                </button>
            </div>
        `;
        cartFooterEl.innerHTML = '';
        return;
    }

    cartItemsEl.innerHTML = cart.map(item => `
        <article class="cart-item" aria-label="${item.name}, quantity ${item.quantity}, subtotal $${(item.price * item.quantity).toFixed(2)}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-info">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove item" aria-label="Remove ${item.name} from cart">
                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-controls" role="group" aria-label="Quantity controls for ${item.name}">
                    <button class="cart-quantity-btn" onclick="updateQuantity(${item.id}, -1)" aria-label="Decrease quantity of ${item.name}">−</button>
                    <span class="cart-quantity" aria-label="Quantity: ${item.quantity}">${item.quantity}</span>
                    <button class="cart-quantity-btn" onclick="updateQuantity(${item.id}, 1)" aria-label="Increase quantity of ${item.name}">+</button>
                    <span class="cart-item-subtotal">Subtotal: $${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
        </article>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = total >= 50 ? 0 : 9.99;
    cartFooterEl.innerHTML = `
        <div class="cart-total">
            <span class="cart-total-label">Total</span>
            <span class="cart-total-amount" aria-label="Total: ${total.toFixed(2)} dollars">$${total.toFixed(2)}</span>
        </div>
        <button class="cart-checkout-btn" role="button" aria-label="Proceed to checkout, total: ${total.toFixed(2)} dollars" onclick="openCheckout()">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Checkout
        </button>
    `;

    // Initialize swipe-to-delete for cart items
    setTimeout(initCartItemSwipeDelete, 50);
}

// ============================================
// CHECKOUT MODAL FUNCTIONS
// ============================================

function openCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }

    const modal = document.getElementById('checkout-modal');
    const cartDrawer = document.getElementById('cart-drawer');

    // Close cart drawer first
    if (cartDrawer) {
        cartDrawer.classList.remove('active');
        cartDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Open checkout modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Render order summary
    renderCheckoutOrderSummary();

    // Store last focused element
    lastFocusedElement = document.activeElement;

    // Focus the first input
    setTimeout(() => {
        const nameInput = document.getElementById('customer-name');
        if (nameInput) nameInput.focus();
    }, 100);
}

function closeCheckout() {
    const modal = document.getElementById('checkout-modal');

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Clear form and errors
    const form = document.getElementById('checkout-form');
    if (form) {
        form.reset();
    }
    clearCheckoutErrors();

    // Restore focus
    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}

function renderCheckoutOrderSummary() {
    const orderItemsEl = document.getElementById('checkout-order-items');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const shippingEl = document.getElementById('checkout-shipping');
    const totalEl = document.getElementById('checkout-total');

    if (!orderItemsEl) return;

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 50 ? 0 : 9.99;
    const total = subtotal + shipping;

    // Render order items
    orderItemsEl.innerHTML = cart.map(item => `
        <div class="checkout-order-item">
            <div class="checkout-order-item-image">
                <img src="${item.image}" alt="${item.name}">
                <span class="checkout-order-item-qty">${item.quantity}</span>
            </div>
            <div class="checkout-order-item-details">
                <span class="checkout-order-item-name">${item.name}</span>
                <span class="checkout-order-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        </div>
    `).join('');

    // Update summary
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

function validateCheckoutForm() {
    let isValid = true;
    clearCheckoutErrors();

    // Get form values
    const name = document.getElementById('customer-name').value.trim();
    const email = document.getElementById('customer-email').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const address = document.getElementById('shipping-address').value.trim();

    // Validate name
    if (!name) {
        showCheckoutError('name-error', 'Please enter your full name');
        isValid = false;
    } else if (name.length < 2) {
        showCheckoutError('name-error', 'Name must be at least 2 characters');
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showCheckoutError('email-error', 'Please enter your email address');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showCheckoutError('email-error', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate phone
    const phoneRegex = /^[\d\s\-+()]{10,}$/;
    if (!phone) {
        showCheckoutError('phone-error', 'Please enter your phone number');
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        showCheckoutError('phone-error', 'Please enter a valid phone number');
        isValid = false;
    }

    // Validate address
    if (!address) {
        showCheckoutError('address-error', 'Please enter your shipping address');
        isValid = false;
    } else if (address.length < 10) {
        showCheckoutError('address-error', 'Please enter a complete shipping address');
        isValid = false;
    }

    return isValid;
}

function showCheckoutError(errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }

    // Add error class to input
    const fieldName = errorId.replace('-error', '');
    const inputEl = document.getElementById(fieldName);
    if (inputEl) {
        inputEl.classList.add('checkout-input-error');
    }
}

function clearCheckoutErrors() {
    const errorElements = document.querySelectorAll('.checkout-error');
    errorElements.forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });

    const inputElements = document.querySelectorAll('.checkout-input');
    inputElements.forEach(el => {
        el.classList.remove('checkout-input-error');
    });
}

function handleCheckoutSubmit(event) {
    event.preventDefault();

    if (!validateCheckoutForm()) {
        return;
    }

    submitOrder();
}

async function submitOrder() {
    const submitBtn = document.getElementById('checkout-submit-btn');
    const btnText = submitBtn.querySelector('.checkout-btn-text');
    const btnLoading = submitBtn.querySelector('.checkout-btn-loading');

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';

    // Get form data
    const orderData = {
        customerName: document.getElementById('customer-name').value.trim(),
        customerEmail: document.getElementById('customer-email').value.trim(),
        customerPhone: document.getElementById('customer-phone').value.trim(),
        shippingAddress: document.getElementById('shipping-address').value.trim(),
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            category: item.category
        })),
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        shipping: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) >= 50 ? 0 : 9.99,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + (cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) >= 50 ? 0 : 9.99)
    };

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();

        if (result.success) {
            // Show success modal
            closeCheckout();
            clearCart();
            showSuccessModal(result.orderId);
        } else {
            showToast(result.error || 'Failed to place order. Please try again.');
        }
    } catch (error) {
        console.error('Order submission error:', error);
        showToast('Network error. Please check your connection and try again.');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
    renderCart();
    updateBottomCartCount();
}

function showSuccessModal(orderId) {
    const modal = document.getElementById('success-modal');
    const orderIdEl = document.getElementById('success-order-id');

    if (orderIdEl) {
        orderIdEl.textContent = `Order ID: ${orderId}`;
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Store last focused element
    lastFocusedElement = document.activeElement;
}

function closeSuccessModal() {
    const modal = document.getElementById('success-modal');

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Restore focus
    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }
}

document.addEventListener('DOMContentLoaded', init);

// ============================================
// MOBILE-FIRST FEATURES
// ============================================

// Global variables for mobile features
let currentMobileSection = 'home';
let pullRefreshStartY = 0;
let pullRefreshCurrentY = 0;
let isPullRefreshActive = false;
let mobileSearchTimeout = null;

// Initialize mobile features
function initMobileFeatures() {
    initBottomNavigation();
    initPullToRefresh();
    initMobileSearch();
    initMobileAccount();
    syncCartCounts();
}

// ============================================
// BOTTOM NAVIGATION
// ============================================

function initBottomNavigation() {
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    
    bottomNavItems.forEach(item => {
        item.addEventListener('click', handleBottomNavClick);
        
        // Touch feedback
        item.addEventListener('touchstart', handleBottomNavTouchStart, { passive: true });
        item.addEventListener('touchend', handleBottomNavTouchEnd);
    });
}

function handleBottomNavClick(e) {
    e.preventDefault();
    const section = e.currentTarget.dataset.section;
    if (section) {
        navigateToMobileSection(section);
    }
}

function handleBottomNavTouchStart(e) {
    e.currentTarget.classList.add('touching');
}

function handleBottomNavTouchEnd(e) {
    e.currentTarget.classList.remove('touching');
}

function navigateToMobileSection(section) {
    if (section === currentMobileSection && section !== 'cart') return;
    
    // Update active state in bottom nav
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    bottomNavItems.forEach(item => {
        const isActive = item.dataset.section === section;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
    
    // Handle different sections
    switch (section) {
        case 'home':
            showMobileHome();
            break;
        case 'search':
            showMobileSearch();
            break;
        case 'cart':
            showMobileCart();
            break;
        case 'account':
            showMobileAccount();
            break;
    }
    
    currentMobileSection = section;
}

function showMobileHome() {
    const searchSection = document.getElementById('mobile-search-section');
    const accountSection = document.getElementById('mobile-account-section');
    
    if (searchSection) searchSection.classList.remove('active');
    if (accountSection) accountSection.classList.remove('active');
    
    // Show main content with transition
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.style.display = 'block';
    }
}

function showMobileSearch() {
    const mainContent = document.getElementById('main-content');
    const accountSection = document.getElementById('mobile-account-section');
    const searchSection = document.getElementById('mobile-search-section');
    
    if (mainContent) mainContent.style.display = 'none';
    if (accountSection) accountSection.classList.remove('active');
    if (searchSection) searchSection.classList.add('active');
    
    // Focus search input
    setTimeout(() => {
        const searchInput = document.getElementById('mobile-search-input');
        if (searchInput) searchInput.focus();
    }, 100);
}

function showMobileCart() {
    // Cart is handled by the existing toggleCart function
    // Just navigate to it when clicking the bottom nav
    const searchSection = document.getElementById('mobile-search-section');
    const accountSection = document.getElementById('mobile-account-section');
    
    if (searchSection) searchSection.classList.remove('active');
    if (accountSection) accountSection.classList.remove('active');
    
    // Open the cart drawer
    openCart();
}

function showMobileAccount() {
    const mainContent = document.getElementById('main-content');
    const searchSection = document.getElementById('mobile-search-section');
    const accountSection = document.getElementById('mobile-account-section');
    
    if (mainContent) mainContent.style.display = 'none';
    if (searchSection) searchSection.classList.remove('active');
    if (accountSection) accountSection.classList.add('active');
}

// Sync cart count between header and bottom nav
function syncCartCounts() {
    // Initial sync
    updateBottomCartCount();
    
    // Listen for cart updates
    const originalUpdateCartCount = window.updateCartCount;
    window.updateCartCount = function() {
        if (originalUpdateCartCount) originalUpdateCartCount.call(this);
        updateBottomCartCount();
    };
}

function updateBottomCartCount() {
    const cartCountEl = document.getElementById('cart-count');
    const bottomCartCountEl = document.getElementById('bottom-cart-count');
    
    if (cartCountEl && bottomCartCountEl) {
        bottomCartCountEl.textContent = cartCountEl.textContent;
        
        // Show/hide badge
        const count = parseInt(cartCountEl.textContent) || 0;
        bottomCartCountEl.style.display = count > 0 ? 'flex' : 'none';
    }
}

// ============================================
// PULL TO REFRESH
// ============================================

function initPullToRefresh() {
    // Only enable on mobile
    if (window.innerWidth > 768) return;
    
    const pullRefreshIndicator = document.getElementById('pull-refresh-indicator');
    if (!pullRefreshIndicator) return;
    
    document.addEventListener('touchstart', handlePullRefreshStart, { passive: true });
    document.addEventListener('touchmove', handlePullRefreshMove, { passive: false });
    document.addEventListener('touchend', handlePullRefreshEnd);
}

function handlePullRefreshStart(e) {
    // Only activate when at top of page
    if (window.scrollY > 10) return;
    
    pullRefreshStartY = e.touches[0].clientY;
    isPullRefreshActive = true;
}

function handlePullRefreshMove(e) {
    if (!isPullRefreshActive) return;
    
    // Only activate when pulling down and at top of page
    if (window.scrollY > 10) {
        isPullRefreshActive = false;
        return;
    }
    
    pullRefreshCurrentY = e.touches[0].clientY;
    const pullDistance = pullRefreshCurrentY - pullRefreshStartY;
    
    if (pullDistance > 0) {
        e.preventDefault();
        
        const pullRefreshIndicator = document.getElementById('pull-refresh-indicator');
        if (pullRefreshIndicator) {
            const progress = Math.min(pullDistance / 100, 1);
            pullRefreshIndicator.style.transform = `translateY(0) scale(${0.5 + progress * 0.5})`;
            
            if (pullDistance > 80) {
                pullRefreshIndicator.classList.add('visible');
                pullRefreshIndicator.querySelector('span').textContent = 'Release to refresh';
            } else {
                pullRefreshIndicator.classList.remove('visible');
                pullRefreshIndicator.querySelector('span').textContent = 'Pull to refresh';
            }
        }
    }
}

function handlePullRefreshEnd() {
    if (!isPullRefreshActive) return;
    
    const pullRefreshIndicator = document.getElementById('pull-refresh-indicator');
    const pullDistance = pullRefreshCurrentY - pullRefreshStartY;
    
    if (pullDistance > 80) {
        // Trigger refresh
        if (pullRefreshIndicator) {
            pullRefreshIndicator.classList.add('refreshing');
            pullRefreshIndicator.querySelector('span').textContent = 'Refreshing...';
        }
        
        // Simulate refresh
        performRefresh();
    } else {
        // Reset indicator
        if (pullRefreshIndicator) {
            pullRefreshIndicator.style.transform = 'translateY(-100%)';
            pullRefreshIndicator.classList.remove('visible');
        }
    }
    
    isPullRefreshActive = false;
    pullRefreshStartY = 0;
    pullRefreshCurrentY = 0;
}

function performRefresh() {
    // Simulate API refresh
    setTimeout(() => {
        // Show skeleton loading
        showSkeletonLoading();
        
        // Simulate loading delay
        setTimeout(() => {
            // Re-render content
            renderProducts();
            renderCategories();
            
            // Hide skeleton
            hideSkeletonLoading();
            
            // Reset pull refresh indicator
            const pullRefreshIndicator = document.getElementById('pull-refresh-indicator');
            if (pullRefreshIndicator) {
                pullRefreshIndicator.classList.remove('refreshing', 'visible');
                pullRefreshIndicator.style.transform = 'translateY(-100%)';
                pullRefreshIndicator.querySelector('span').textContent = 'Pull to refresh';
            }
            
            showToast('Content refreshed!');
        }, 1500);
    }, 500);
}

// ============================================
// SKELETON LOADING
// ============================================

function showSkeletonLoading() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    // Create skeleton cards
    const skeletonCount = 4;
    let skeletonHTML = '';
    
    for (let i = 0; i < skeletonCount; i++) {
        skeletonHTML += `
            <article class="product-card skeleton" aria-label="Loading product ${i + 1}">
                <div class="product-image skeleton skeleton-image"></div>
                <div class="product-info">
                    <div class="product-category skeleton skeleton-text short"></div>
                    <div class="product-name skeleton skeleton-title"></div>
                    <div class="product-price">
                        <div class="product-price-current skeleton skeleton-price"></div>
                    </div>
                </div>
            </article>
        `;
    }
    
    productsGrid.innerHTML = skeletonHTML;
}

function hideSkeletonLoading() {
    // Skeleton will be replaced by actual content
}

// ============================================
// MOBILE SEARCH
// ============================================

function initMobileSearch() {
    const searchInput = document.getElementById('mobile-search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', handleMobileSearchInput);
    searchInput.addEventListener('keydown', handleMobileSearchKeydown);
}

function handleMobileSearchInput(e) {
    const query = e.target.value.trim();
    
    // Debounce search
    if (mobileSearchTimeout) {
        clearTimeout(mobileSearchTimeout);
    }
    
    if (query.length < 2) {
        clearMobileSearchResults();
        return;
    }
    
    mobileSearchTimeout = setTimeout(() => {
        performMobileSearch(query);
    }, 300);
}

function handleMobileSearchKeydown(e) {
    if (e.key === 'Escape') {
        clearMobileSearch();
    }
}

function performMobileSearch(query) {
    const resultsContainer = document.getElementById('mobile-search-results');
    if (!resultsContainer) return;
    
    // Filter products by query
    const results = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="search-no-results" style="text-align: center; padding: 40px 20px;">
                <svg width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" style="color: var(--color-text-muted); margin: 0 auto 16px;">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <p style="color: var(--color-text-light); font-size: 15px;">No products found for "${query}"</p>
            </div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = results.map(product => `
        <article class="search-result-item" onclick="quickView(${product.id}); navigateToMobileSection('home');" style="display: flex; gap: 12px; padding: 12px; border-bottom: 1px solid var(--color-border); cursor: pointer;">
            <div style="width: 60px; height: 60px; border-radius: var(--radius-md); overflow: hidden; flex-shrink: 0;">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="flex: 1;">
                <h4 style="font-size: 14px; font-weight: 600; color: var(--color-primary); margin-bottom: 4px;">${product.name}</h4>
                <span style="font-size: 12px; color: var(--color-accent);">${product.category}</span>
                <div style="font-size: 14px; font-weight: 700; color: var(--color-primary); margin-top: 4px;">$${product.price.toFixed(2)}</div>
            </div>
        </article>
    `).join('');
}

function clearMobileSearchResults() {
    const resultsContainer = document.getElementById('mobile-search-results');
    if (resultsContainer) {
        resultsContainer.innerHTML = '';
    }
}

function clearMobileSearch() {
    const searchInput = document.getElementById('mobile-search-input');
    if (searchInput) {
        searchInput.value = '';
        searchInput.blur();
    }
    clearMobileSearchResults();
}

// ============================================
// MOBILE ACCOUNT
// ============================================

function initMobileAccount() {
    // Mobile account section is mostly static HTML
    // Add any dynamic functionality here if needed
}

// ============================================
// PAGE TRANSITIONS
// ============================================

function initPageTransitions() {
    // Add smooth transitions between sections
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(btn => {
        btn.addEventListener('click', handleHeroButtonClick);
    });
}

function handleHeroButtonClick(e) {
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    
    // If it's a hash link to internal section
    if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Add smooth scroll with offset for mobile
            const headerHeight = window.innerWidth <= 768 ? 0 : 70;
            const bottomNavHeight = window.innerWidth <= 768 ? 64 : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - bottomNavHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Override init to include mobile features
const originalInit = init;
init = function() {
    originalInit();
    initMobileFeatures();
    initPageTransitions();
};

// Make functions globally accessible
window.navigateToMobileSection = navigateToMobileSection;
window.updateBottomCartCount = updateBottomCartCount;
window.clearMobileSearch = clearMobileSearch;

// ============================================
// TOUCH-FRIENDLY INTERACTIONS
// ============================================

// Touch state tracking
let touchState = {
    isTouching: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    diffX: 0,
    diffY: 0,
    targetElement: null,
    touchStartTime: 0,
    longPressTimer: null,
    isLongPress: false
};

// Initialize all touch features
function initTouchInteractions() {
    if (!isTouchDevice()) return;

    initTouchFeedback();
    initSwipeGestures();
    initPinchToZoom();
    initLongPressActions();
    initToastSwipeDismiss();
    initModalSwipeDismiss();
    initProductImageSwipe();
    initCartItemSwipeDelete();
    optimizeForTouch();
}

// Check if device supports touch
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// ============================================
// TOUCH FEEDBACK
// ============================================

function initTouchFeedback() {
    // Add ripple effect to buttons
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('touchcancel', handleTouchEnd, { passive: true });
}

function handleTouchStart(e) {
    const target = e.target.closest('button, .btn, .product-action, .filter-btn, .cart-quantity-btn, .bottom-nav-item, .category-card, .product-card');
    if (!target) return;

    touchState.isTouching = true;
    touchState.targetElement = target;
    touchState.touchStartTime = Date.now();

    // Add touch-active class for scale effect
    target.classList.add('touch-active');

    // Create ripple effect
    createRipple(e, target);

    // Haptic-style feedback - visual
    provideHapticFeedback(target);
}

function handleTouchEnd(e) {
    if (touchState.targetElement) {
        touchState.targetElement.classList.remove('touch-active');
        touchState.targetElement = null;
    }
    touchState.isTouching = false;
    touchState.isLongPress = false;

    // Clear long press timer
    if (touchState.longPressTimer) {
        clearTimeout(touchState.longPressTimer);
        touchState.longPressTimer = null;
    }
}

function createRipple(event, element) {
    // Only create ripple on primary touch
    if (event.touches && event.touches.length > 1) return;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const rect = element.getBoundingClientRect();
    const x = event.touches ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
    const y = event.touches ? event.touches[0].clientY - rect.top : event.clientY - rect.top;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = `${Math.max(rect.width, rect.height)}px`;
    ripple.style.height = ripple.style.left;

    element.classList.add('ripple-container');
    element.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
        ripple.remove();
        if (element && !element.querySelector('.ripple')) {
            element.classList.remove('ripple-container');
        }
    });
}

function provideHapticFeedback(element) {
    // Visual haptic feedback - subtle flash
    element.style.transition = 'background-color 0.1s ease';
    const originalBg = element.style.backgroundColor;

    // Add haptic class
    element.classList.add('haptic-feedback');

    // Remove after short delay
    setTimeout(() => {
        element.classList.remove('haptic-feedback');
    }, 150);
}

// ============================================
// SWIPE GESTURES
// ============================================

function initSwipeGestures() {
    // Global swipe detection on document
    document.addEventListener('touchstart', handleSwipeStart, { passive: true });
    document.addEventListener('touchmove', handleSwipeMove, { passive: false });
    document.addEventListener('touchend', handleSwipeEnd, { passive: true });
}

function handleSwipeStart(e) {
    // Ignore multi-touch
    if (e.touches.length > 1) return;

    touchState.startX = e.touches[0].clientX;
    touchState.startY = e.touches[0].clientY;
    touchState.currentX = touchState.startX;
    touchState.currentY = touchState.startY;
    touchState.diffX = 0;
    touchState.diffY = 0;
}

function handleSwipeMove(e) {
    if (e.touches.length > 1) return;

    touchState.currentX = e.touches[0].clientX;
    touchState.currentY = e.touches[0].clientY;
    touchState.diffX = touchState.currentX - touchState.startX;
    touchState.diffY = touchState.currentY - touchState.startY;
}

function handleSwipeEnd(e) {
    const absX = Math.abs(touchState.diffX);
    const absY = Math.abs(touchState.diffY);

    // Determine if swipe is horizontal or vertical
    if (absX > absY && absX > 30) {
        // Horizontal swipe
        const direction = touchState.diffX > 0 ? 'right' : 'left';
        handleHorizontalSwipe(direction, e.target);
    } else if (absY > absX && absY > 30) {
        // Vertical swipe
        const direction = touchState.diffY > 0 ? 'down' : 'up';
        handleVerticalSwipe(direction, e.target);
    }

    // Reset
    touchState.diffX = 0;
    touchState.diffY = 0;
}

function handleHorizontalSwipe(direction, target) {
    // Check if swipe is on product gallery
    const gallery = target.closest('.product-image-gallery');
    if (gallery) {
        navigateProductGallery(gallery, direction);
        return;
    }

    // Check if swipe is on cart item
    const cartItem = target.closest('.cart-item-swipe');
    if (cartItem) {
        if (direction === 'left') {
            revealCartItemDelete(cartItem);
        } else if (direction === 'right') {
            hideCartItemDelete(cartItem);
        }
        return;
    }
}

function handleVerticalSwipe(direction, target) {
    // Check for swipe down to dismiss toast
    if (direction === 'down') {
        const toast = target.closest('.toast');
        if (toast && !toast.classList.contains('swipe-dismiss')) {
            dismissToast(toast);
        }
    }
}

// ============================================
// PRODUCT IMAGE SWIPE GALLERY
// ============================================

// Sample product images (in real app, these would come from product data)
const productImageSets = {
    1: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=400&fit=crop"
    ],
    2: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop"
    ],
    3: [
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop"
    ]
};

let currentImageIndex = {};

function initProductImageSwipe() {
    // Add swipe functionality to product card images
    const productCards = document.querySelectorAll('.product-card .product-image');

    productCards.forEach((imageContainer, index) => {
        const productCard = imageContainer.closest('.product-card');
        if (!productCard) return;

        const productId = productCard.dataset.id || getProductIdFromCard(imageContainer);
        if (!productId) return;

        // Check if product has multiple images
        const images = productImageSets[productId];
        if (!images || images.length <= 1) return;

        // Enable touch swipe
        imageContainer.style.touchAction = 'pan-x';
        imageContainer.dataset.productId = productId;

        imageContainer.addEventListener('touchstart', handleProductImageSwipeStart, { passive: true });
        imageContainer.addEventListener('touchmove', handleProductImageSwipeMove, { passive: false });
        imageContainer.addEventListener('touchend', handleProductImageSwipeEnd, { passive: true });
    });
}

function getProductIdFromCard(element) {
    const card = element.closest('.product-card');
    return card ? card.dataset.id || null : null;
}

// Navigate product gallery (called from horizontal swipe handler)
function navigateProductGallery(gallery, direction) {
    const productCard = gallery.closest('.product-card');
    if (!productCard) return;

    const productId = productCard.dataset.id;
    const images = productImageSets[productId];

    if (!images || images.length <= 1) return;

    currentImageIndex[productId] = currentImageIndex[productId] || 0;

    if (direction === 'left' && currentImageIndex[productId] < images.length - 1) {
        currentImageIndex[productId]++;
    } else if (direction === 'right' && currentImageIndex[productId] > 0) {
        currentImageIndex[productId]--;
    } else {
        return;
    }

    // Update image
    const img = gallery.querySelector('img');
    if (img) {
        img.style.transition = 'opacity 0.15s ease';
        img.style.opacity = '0.7';

        setTimeout(() => {
            img.src = images[currentImageIndex[productId]];
            img.style.opacity = '1';
        }, 80);
    }

    // Show position indicator
    showToast(`${currentImageIndex[productId] + 1}/${images.length}`);
}

function handleProductImageSwipeStart(e) {
    const imageContainer = e.currentTarget;
    const productId = imageContainer.dataset.productId;
    const images = productImageSets[productId];

    if (!images || images.length <= 1) return;

    touchState.startX = e.touches[0].clientX;
    currentImageIndex[productId] = currentImageIndex[productId] || 0;
}

function handleProductImageSwipeMove(e) {
    // Allow browser handling
}

function handleProductImageSwipeEnd(e) {
    const imageContainer = e.currentTarget;
    const productId = imageContainer.dataset.productId;
    const images = productImageSets[productId];

    if (!images || images.length <= 1) return;

    const diffX = e.changedTouches[0].clientX - touchState.startX;

    if (Math.abs(diffX) > 50) {
        if (diffX > 0 && currentImageIndex[productId] > 0) {
            currentImageIndex[productId]--;
        } else if (diffX < 0 && currentImageIndex[productId] < images.length - 1) {
            currentImageIndex[productId]++;
        }

        // Update image
        const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
        if (productCard) {
            const img = productCard.querySelector('.product-image img');
            if (img) {
                // Add fade transition
                img.style.transition = 'opacity 0.2s ease';
                img.style.opacity = '0.5';

                setTimeout(() => {
                    img.src = images[currentImageIndex[productId]];
                    img.style.opacity = '1';
                }, 100);
            }
        }

        // Show toast with image count
        showToast(`Image ${currentImageIndex[productId] + 1} of ${images.length}`);
    }
}

// Add slide animation keyframes via JS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0.5;
            transform: translateX(${touchState.diffX > 0 ? '-10px' : '10px'});
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// CART ITEM SWIPE TO DELETE
// ============================================

function initCartItemSwipeDelete() {
    // Wrap cart items in swipe containers (skip if already wrapped)
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
        // Check if already wrapped
        if (item.parentElement.classList.contains('cart-item-swipe')) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'cart-item-swipe';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'cart-item-delete-btn';
        deleteBtn.innerHTML = `
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            <span>Delete</span>
        `;
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            const productId = getCartItemProductId(item);
            if (productId) {
                removeFromCart(productId);
                showToast('Item removed from cart');
            }
        };

        item.parentNode.insertBefore(wrapper, item);
        wrapper.appendChild(item);
        wrapper.appendChild(deleteBtn);

        // Add touch handlers
        wrapper.addEventListener('touchstart', handleCartItemSwipeStart, { passive: true });
        wrapper.addEventListener('touchmove', handleCartItemSwipeMove, { passive: false });
        wrapper.addEventListener('touchend', handleCartItemSwipeEnd, { passive: true });
    });
}

let cartItemSwipeState = {
    startX: 0,
    currentTranslate: 0,
    isDragging: false,
    currentItem: null
};

function handleCartItemSwipeStart(e) {
    cartItemSwipeState.startX = e.touches[0].clientX;
    cartItemSwipeState.currentItem = e.currentTarget;
    cartItemSwipeState.isDragging = true;
}

function handleCartItemSwipeMove(e) {
    if (!cartItemSwipeState.isDragging || !cartItemSwipeState.currentItem) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - cartItemSwipeState.startX;

    // Only allow left swipe (negative diff)
    if (diff < 0) {
        e.preventDefault();
        const translate = Math.max(-80, Math.min(0, diff));
        cartItemSwipeState.currentTranslate = translate;
        cartItemSwipeState.currentItem.querySelector('.cart-item').style.transform = `translateX(${translate}px)`;
    }
}

function handleCartItemSwipeEnd(e) {
    if (!cartItemSwipeState.isDragging || !cartItemSwipeState.currentItem) return;

    const threshold = 60;

    if (cartItemSwipeState.currentTranslate < -threshold) {
        cartItemSwipeState.currentItem.classList.add('revealed');
    } else {
        cartItemSwipeState.currentItem.querySelector('.cart-item').style.transform = 'translateX(0)';
    }

    cartItemSwipeState.isDragging = false;
    cartItemSwipeState.currentItem = null;
    cartItemSwipeState.currentTranslate = 0;
}

function getCartItemProductId(item) {
    const name = item.querySelector('.cart-item-name')?.textContent;
    if (!name) return null;

    const product = products.find(p => p.name === name);
    return product ? product.id : null;
}

function revealCartItemDelete(element) {
    element.classList.add('revealed');
}

function hideCartItemDelete(element) {
    element.classList.remove('revealed');
}

// ============================================
// PINCH-TO-ZOOM ON PRODUCT IMAGES
// ============================================

function initPinchToZoom() {
    // Add pinch-to-zoom to quick view modal images
    const quickViewModal = document.getElementById('quick-view-modal');
    if (!quickViewModal) return;

    const mainImage = quickViewModal.querySelector('#qv-image');
    if (!mainImage) return;

    initImageZoom(mainImage);

    // Also add to product card images
    document.querySelectorAll('.product-card .product-image img').forEach(img => {
        initImageZoom(img, true);
    });
}

function initImageZoom(imgElement, isCard = false) {
    let initialDistance = 0;
    let initialScale = 1;
    let currentScale = 1;
    let isPinching = false;
    let imageContainer = imgElement.parentElement;

    // Ensure container has proper positioning
    if (!imageContainer.classList.contains('pinch-zoom-container')) {
        imageContainer.classList.add('pinch-zoom-container');
    }

    // Add zoom hint
    const zoomHint = document.createElement('div');
    zoomHint.className = 'zoom-hint';
    zoomHint.textContent = 'Pinch to zoom';
    imageContainer.appendChild(zoomHint);

    // Hide hint after first interaction
    imgElement.addEventListener('touchstart', function handleFirstZoom(e) {
        if (e.touches.length === 2) {
            zoomHint.style.display = 'none';
            imgElement.removeEventListener('touchstart', handleFirstZoom);
        }
    }, { passive: true });

    imgElement.addEventListener('touchstart', handlePinchStart, { passive: true });
    imgElement.addEventListener('touchmove', handlePinchMove, { passive: false });
    imgElement.addEventListener('touchend', handlePinchEnd, { passive: true });
    imgElement.addEventListener('touchcancel', handlePinchEnd, { passive: true });

    // Click to zoom on single tap (for non-zoomable images)
    if (!isCard) {
        imgElement.addEventListener('click', function(e) {
            if (currentScale > 1) {
                // Zoom out
                currentScale = 1;
                updateZoom();
            } else {
                // Zoom in to 2x
                currentScale = 2;
                updateZoom();
                showToast('Pinch to zoom in/out');
            }
        });
    }

    function handlePinchStart(e) {
        if (e.touches.length === 2) {
            isPinching = true;
            initialDistance = getDistance(e.touches);
            initialScale = currentScale;
            e.preventDefault();
        }
    }

    function handlePinchMove(e) {
        if (!isPinching || e.touches.length !== 2) return;

        e.preventDefault();

        const currentDistance = getDistance(e.touches);
        const scale = currentDistance / initialDistance;
        currentScale = Math.min(Math.max(initialScale * scale, 1), 4);

        updateZoom();
    }

    function handlePinchEnd(e) {
        if (e.touches.length < 2) {
            isPinching = false;

            // Snap to nearest allowed scale
            if (currentScale < 1.5) {
                currentScale = 1;
            } else if (currentScale > 3) {
                currentScale = 4;
            }

            updateZoom();
        }
    }

    function updateZoom() {
        if (currentScale > 1) {
            imgElement.classList.add('zoomed');
            imgElement.style.setProperty('--zoom-scale', currentScale);
            zoomHint.style.display = 'none';
        } else {
            imgElement.classList.remove('zoomed');
            imgElement.style.removeProperty('--zoom-scale');
            zoomHint.style.display = '';
        }
    }
}

function getDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

// ============================================
// LONG-PRESS FOR QUICK ACTIONS (WISHLIST)
// ============================================

function initLongPressActions() {
    // Add long press to product cards
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('touchstart', handleLongPressStart, { passive: true });
        card.addEventListener('touchmove', handleLongPressMove, { passive: true });
        card.addEventListener('touchend', handleLongPressEnd, { passive: true });
        card.addEventListener('touchcancel', handleLongPressEnd, { passive: true });
    });

    // Add long press to product images in quick view
    const quickViewImage = document.getElementById('qv-image');
    if (quickViewImage) {
        quickViewImage.addEventListener('touchstart', handleLongPressStart, { passive: true });
        quickViewImage.addEventListener('touchmove', handleLongPressMove, { passive: true });
        quickViewImage.addEventListener('touchend', handleLongPressEnd, { passive: true });
        quickViewImage.addEventListener('touchcancel', handleLongPressEnd, { passive: true });
    }
}

let longPressTarget = null;

function handleLongPressStart(e) {
    const target = e.currentTarget;
    const productCard = target.closest('.product-card');

    if (!productCard) return;

    longPressTarget = productCard;
    touchState.isLongPress = false;

    // Start long press timer (500ms)
    touchState.longPressTimer = setTimeout(() => {
        touchState.isLongPress = true;
        showLongPressMenu(productCard);
    }, 500);
}

function handleLongPressMove(e) {
    // Cancel long press if finger moves significantly
    if (touchState.longPressTimer) {
        const touch = e.touches[0];
        const diffX = Math.abs(touch.clientX - touchState.startX);
        const diffY = Math.abs(touch.clientY - touchState.startY);

        if (diffX > 10 || diffY > 10) {
            clearTimeout(touchState.longPressTimer);
            touchState.longPressTimer = null;
        }
    }
}

function handleLongPressEnd(e) {
    if (touchState.longPressTimer) {
        clearTimeout(touchState.longPressTimer);
        touchState.longPressTimer = null;
    }

    // If it was a short tap (not long press), do nothing special
    // The normal click handler will handle the tap

    longPressTarget = null;
}

function showLongPressMenu(productCard) {
    // Get product info
    const productName = productCard.querySelector('.product-name')?.textContent;
    const productId = getProductIdFromCard(productCard);
    const product = products.find(p => p.id == productId);

    if (!product) return;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'long-press-overlay';
    overlay.addEventListener('click', hideLongPressMenu);
    overlay.addEventListener('touchstart', hideLongPressMenu, { passive: true });

    // Create menu
    const menu = document.createElement('div');
    menu.className = 'long-press-menu';
    menu.innerHTML = `
        <div class="long-press-menu-item wishlist-item" data-action="wishlist" data-product-id="${productId}">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            Add to Wishlist
        </div>
        <div class="long-press-menu-item" data-action="quickview" data-product-id="${productId}">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Quick View
        </div>
        <div class="long-press-menu-item" data-action="compare" data-product-id="${productId}">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"></path>
            </svg>
            Add to Compare
        </div>
    `;

    // Add click handlers
    menu.querySelectorAll('.long-press-menu-item').forEach(item => {
        item.addEventListener('click', handleLongPressAction);
    });

    overlay.appendChild(menu);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Trigger animation
    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });
}

function hideLongPressMenu() {
    const overlay = document.querySelector('.long-press-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 200);
    }
    document.body.style.overflow = '';
}

function handleLongPressAction(e) {
    const action = e.currentTarget.dataset.action;
    const productId = parseInt(e.currentTarget.dataset.productId);

    hideLongPressMenu();

    switch (action) {
        case 'wishlist':
            toggleWishlist(productId);
            break;
        case 'quickview':
            quickView(productId);
            break;
        case 'compare':
            showToast('Added to compare list');
            break;
    }
}

// ============================================
// TOAST SWIPE DISMISSAL
// ============================================

let activeToast = null;
let toastSwipeState = { startX: 0, startY: 0, currentX: 0 };

function initToastSwipeDismiss() {
    // This is handled in the showToast function
}

function dismissToast(toast) {
    if (toast.classList.contains('dismissing')) return;

    toast.classList.add('dismissing');
    toast.style.transform = 'translateX(-100%) translateY(100px)';
    toast.style.opacity = '0';

    setTimeout(() => {
        toast.remove();
    }, 300);
}

// ============================================
// MODAL SWIPE DISMISSAL
// ============================================

function initModalSwipeDismiss() {
    const quickViewModal = document.getElementById('quick-view-modal');
    if (!quickViewModal) return;

    // Add overlay class for swipe detection
    const overlay = quickViewModal.querySelector('.quick-view-overlay');
    if (overlay) {
        overlay.classList.add('modal-swipe-overlay');
        overlay.addEventListener('touchstart', handleModalSwipeStart, { passive: true });
        overlay.addEventListener('touchmove', handleModalSwipeMove, { passive: false });
        overlay.addEventListener('touchend', handleModalSwipeEnd, { passive: true });
    }
}

function handleModalSwipeStart(e) {
    if (e.touches.length > 1) return;

    const touch = e.touches[0];
    // Only start tracking if touch starts from left edge
    if (touch.clientX < 50) {
        toastSwipeState.startX = touch.clientX;
        toastSwipeState.startY = touch.clientY;
    }
}

function handleModalSwipeMove(e) {
    if (toastSwipeState.startX === 0) return;

    e.preventDefault();

    const touch = e.touches[0];
    const diffX = touch.clientX - toastSwipeState.startX;

    if (diffX > 0) {
        const quickViewModal = document.getElementById('quick-view-modal');
        if (quickViewModal) {
            const overlay = quickViewModal.querySelector('.quick-view-overlay');
            if (overlay) {
                overlay.style.opacity = Math.max(0, 1 - diffX / 300);
            }
            const content = quickViewModal.querySelector('.quick-view-content');
            if (content) {
                content.style.transform = `translateX(${diffX}px)`;
                content.style.transition = 'none';
            }
        }
    }
}

function handleModalSwipeEnd(e) {
    if (toastSwipeState.startX === 0) return;

    const diffX = e.changedTouches[0].clientX - toastSwipeState.startX;

    if (diffX > 100) {
        // Swipe threshold met - close modal
        closeQuickView();
    } else {
        // Reset position
        const quickViewModal = document.getElementById('quick-view-modal');
        if (quickViewModal) {
            const overlay = quickViewModal.querySelector('.quick-view-overlay');
            if (overlay) {
                overlay.style.opacity = '';
            }
            const content = quickViewModal.querySelector('.quick-view-content');
            if (content) {
                content.style.transform = '';
                content.style.transition = '';
            }
        }
    }

    toastSwipeState.startX = 0;
}

// ============================================
// OPTIMIZE FOR TOUCH
// ============================================

function optimizeForTouch() {
    // Disable double-tap to zoom on interactive elements
    const elements = document.querySelectorAll('button, a, .btn, .product-action');
    elements.forEach(el => {
        el.addEventListener('dblclick', (e) => {
            e.preventDefault();
        });
    });

    // Prevent zoom on accidental double-tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });

    // Improve touch scrolling performance
    document.body.style.webkitOverflowScrolling = 'touch';

    // Add touch class to body
    document.body.classList.add('touch-device');
}

// ============================================
// UPDATE SHOWTOAST TO SUPPORT SWIPE DISMISS
// ============================================

const originalShowToast = showToast;
showToast = function(message) {
    originalShowToast(message);

    // Add swipe dismiss capability to the new toast
    setTimeout(() => {
        const toast = document.querySelector('.toast:not(.swipe-dismiss)');
        if (toast) {
            toast.classList.add('swipe-dismiss');

            // Add touch handlers
            let toastTouchStart = { x: 0, y: 0 };

            toast.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                    toastTouchStart.x = e.touches[0].clientX;
                    toastTouchStart.y = e.touches[0].clientY;
                }
            }, { passive: true });

            toast.addEventListener('touchmove', (e) => {
                if (e.touches.length === 1) {
                    const diffY = e.touches[0].clientY - toastTouchStart.y;

                    // Allow vertical movement for dismissal
                    if (diffY > 20) {
                        toast.style.transform = `translateX(-50%) translateY(${diffY}px)`;
                        toast.style.opacity = Math.max(0, 1 - diffY / 200);
                    }
                }
            }, { passive: true });

            toast.addEventListener('touchend', (e) => {
                const diffY = e.changedTouches[0].clientY - toastTouchStart.y;

                if (diffY > 80) {
                    dismissToast(toast);
                } else {
                    // Reset position
                    toast.style.transform = '';
                    toast.style.opacity = '';
                }
            }, { passive: true });
        }
    }, 10);
};

// ============================================
// INITIALIZE TOUCH INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initTouchInteractions();
});

// Re-initialize on navigation/filter changes
const originalRenderProducts = renderProducts;
renderProducts = function() {
    originalRenderProducts();
    setTimeout(() => {
        initTouchInteractions();
    }, 100);
};

// ============================================
// STICKY CART BARS (Mobile)
// ============================================

// Global variables for sticky bars
let stickyBarObserver = null;
let lastScrollY = 0;
let stickyBarDirection = 'up';
let isStickyBarVisible = false;

// Initialize sticky cart bars
function initStickyCartBars() {
    // Only initialize on mobile
    if (window.innerWidth > 768) return;

    // Initialize quick view sticky bar (Intersection Observer for smart hide)
    initQuickViewStickyBar();

    // Initialize cart summary sticky bar
    updateStickyCartSummary();

    // Listen for cart changes
    const originalSaveCart = saveCart;
    saveCart = function() {
        originalSaveCart();
        updateStickyCartSummary();
    };
}

// Smart hide for quick view sticky bar using Intersection Observer
function initQuickViewStickyBar() {
    const stickyBar = document.getElementById('sticky-cart-bar');
    if (!stickyBar) return;

    // Create intersection observer for smart hide
    stickyBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When quick view product area is visible, show the sticky bar
                if (!isStickyBarVisible) {
                    showStickyCartBar();
                }
            }
        });
    }, {
        threshold: 0
    });
}

// Show sticky cart bar for quick view
function showStickyCartBar() {
    const stickyBar = document.getElementById('sticky-cart-bar');
    if (!stickyBar || window.innerWidth > 768) return;

    // Only show when quick view is open
    const quickViewModal = document.getElementById('quick-view-modal');
    if (!quickViewModal || !quickViewModal.classList.contains('active')) return;

    stickyBar.classList.add('active');
    // Use requestAnimationFrame for smooth animation
    requestAnimationFrame(() => {
        stickyBar.classList.add('visible');
    });
    isStickyBarVisible = true;
}

// Hide sticky cart bar for quick view
function hideStickyCartBar() {
    const stickyBar = document.getElementById('sticky-cart-bar');
    if (!stickyBar) return;

    stickyBar.classList.remove('visible');
    setTimeout(() => {
        stickyBar.classList.remove('active');
    }, 300);
    isStickyBarVisible = false;
}

// Update sticky bar with current product info
function updateStickyBarProduct(product) {
    const priceEl = document.getElementById('sticky-cart-price');
    if (!priceEl || !product) return;

    const priceValue = priceEl.querySelector('.sticky-cart-price-value');
    if (priceValue) {
        priceValue.textContent = `$${product.price.toFixed(2)}`;
    }

    // Store current product for add to cart
    window.currentStickyBarProduct = product;
}

// Add to cart from sticky bar
function addToCartFromStickyBar() {
    if (window.currentStickyBarProduct) {
        addToCart(window.currentStickyBarProduct.id);
        showToast(`${window.currentStickyBarProduct.name} added to cart!`);

        // Hide the sticky bar after adding to cart
        hideStickyCartBar();
    }
}

// Update sticky cart summary bar
function updateStickyCartSummary() {
    const summaryBar = document.getElementById('sticky-cart-summary');
    const mainContent = document.getElementById('main-content');
    if (!summaryBar || window.innerWidth > 768) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Don't show when cart is empty
    if (totalItems === 0) {
        hideStickyCartSummary();
        return;
    }

    // Update content
    const countEl = document.getElementById('sticky-cart-summary-count');
    const totalEl = document.getElementById('sticky-cart-summary-total');

    if (countEl) {
        countEl.textContent = `${totalItems} item${totalItems !== 1 ? 's'} in cart`;
    }
    if (totalEl) {
        totalEl.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Show the bar
    summaryBar.classList.add('active');
    requestAnimationFrame(() => {
        summaryBar.classList.add('visible');
    });

    // Add extra padding to main content
    if (mainContent) {
        mainContent.classList.add('has-sticky-summary');
    }
}

// Hide sticky cart summary
function hideStickyCartSummary() {
    const summaryBar = document.getElementById('sticky-cart-summary');
    const mainContent = document.getElementById('main-content');
    if (!summaryBar) return;

    summaryBar.classList.remove('visible');
    setTimeout(() => {
        summaryBar.classList.remove('active');
    }, 300);

    // Remove extra padding from main content
    if (mainContent) {
        mainContent.classList.remove('has-sticky-summary');
    }
}

// Initialize scroll tracking for smart hide
function initStickyBarScrollTracking() {
    if (window.innerWidth > 768) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleStickyBarScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function handleStickyBarScroll() {
    const currentScrollY = window.scrollY;
    const quickViewModal = document.getElementById('quick-view-modal');

    // Only track scroll when quick view is open
    if (!quickViewModal || !quickViewModal.classList.contains('active')) {
        lastScrollY = currentScrollY;
        return;
    }

    // Determine scroll direction
    if (currentScrollY > lastScrollY) {
        stickyBarDirection = 'down';
    } else {
        stickyBarDirection = 'up';
    }

    // Smart hide: hide when scrolling down, show when scrolling up
    const stickyBar = document.getElementById('sticky-cart-bar');
    if (!stickyBar) return;

    // Only apply smart hide after initial show
    if (isStickyBarVisible) {
        if (stickyBarDirection === 'down' && currentScrollY > 50) {
            // Scroll down - hide the bar
            stickyBar.classList.remove('visible');
        } else if (stickyBarDirection === 'up') {
            // Scroll up - show the bar
            stickyBar.classList.add('visible');
        }
    }

    lastScrollY = currentScrollY;
}

// Update original quickView to set sticky bar product
const originalQuickView = quickView;
quickView = function(productId) {
    originalQuickView(productId);

    // Update sticky bar with current product
    const product = products.find(p => p.id === productId);
    if (product) {
        setTimeout(() => {
            updateStickyBarProduct(product);
            showStickyCartBar();
        }, 100);
    }
};

// Update original closeQuickView to hide sticky bar
const originalCloseQuickView = closeQuickView;
closeQuickView = function() {
    originalCloseQuickView();
    hideStickyCartBar();
    window.currentStickyBarProduct = null;
};

// Override init to include sticky bar initialization
const originalInitMobileFeatures = initMobileFeatures;
initMobileFeatures = function() {
    originalInitMobileFeatures();
    initStickyCartBars();
    initStickyBarScrollTracking();
};

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        // Hide sticky bars on desktop
        hideStickyCartBar();
        hideStickyCartSummary();
    } else {
        // Re-initialize on mobile
        updateStickyCartSummary();
    }
});

// Make functions globally accessible
window.addToCartFromStickyBar = addToCartFromStickyBar;
window.updateStickyBarProduct = updateStickyBarProduct;