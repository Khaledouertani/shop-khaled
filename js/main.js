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

    grid.innerHTML = filteredProducts.map(product => `
        <article class="product-card" data-category="${product.category}" role="listitem" aria-label="${product.name}, ${product.category}, $${product.price.toFixed(2)}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" width="400" height="400">
                ${product.badge ? `<span class="product-badge" role="status">${product.badge}</span>` : ''}
                <div class="product-actions" role="group" aria-label="Product actions">
                    <button class="product-action" onclick="toggleWishlist(${product.id})" title="Add to wishlist" aria-label="Add ${product.name} to wishlist">
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
                <div class="product-price" aria-label="Price: ${product.price.toFixed(2)} dollars">
                    <span class="product-price-current">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="product-price-original" aria-label="Original price: ${product.originalPrice.toFixed(2)} dollars">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-rating" aria-label="Rating: ${product.rating} out of 5 stars, ${product.reviews} reviews">
                    <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span>${product.rating} (${product.reviews} reviews)</span>
                </div>
            </div>
        </article>
    `).join('');
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

function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        showToast(`Added ${product.name} to wishlist!`);
    }
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

    // Close cart and quick view on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const cartDrawer = document.getElementById('cart-drawer');
            const quickViewModal = document.getElementById('quick-view-modal');

            if (cartDrawer && cartDrawer.classList.contains('active')) {
                closeCart();
            }
            if (quickViewModal && quickViewModal.classList.contains('active')) {
                closeQuickView();
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
    cartFooterEl.innerHTML = `
        <div class="cart-total">
            <span class="cart-total-label">Total</span>
            <span class="cart-total-amount" aria-label="Total: ${total.toFixed(2)} dollars">$${total.toFixed(2)}</span>
        </div>
        <button class="cart-checkout-btn" role="button" aria-label="Proceed to checkout, total: ${total.toFixed(2)} dollars">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Proceed to Checkout
        </button>
    `;
}

document.addEventListener('DOMContentLoaded', init);