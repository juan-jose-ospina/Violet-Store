// ========================================
// PRODUCTS.JS - Gestión de Productos
// ========================================

// Renderizar filtros
function renderFilters() {
    const filterButtons = document.getElementById('filterButtons');
    const filters = ['Vegano', 'Cruelty-Free', 'Sin Químicos', 'Ingredientes Puros', 'Sin Sulfatos'];
    
    filterButtons.innerHTML = filters.map(filter => `
        <button class="filter-btn" data-filter="${filter}">${filter}</button>
    `).join('');

    // Event listeners para filtros
    filterButtons.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            if (appState.selectedFilters.includes(filter)) {
                appState.selectedFilters = appState.selectedFilters.filter(f => f !== filter);
                btn.classList.remove('active');
            } else {
                appState.selectedFilters.push(filter);
                btn.classList.add('active');
            }
            renderProducts();
        });
    });
}

// Filtrar productos
function getFilteredProducts() {
    return appState.products.filter(product => {
        // Filtro de búsqueda
        const matchesSearch = product.name.toLowerCase().includes(appState.searchTerm.toLowerCase()) ||
                             product.category.toLowerCase().includes(appState.searchTerm.toLowerCase()) ||
                             product.ingredients.some(ing => ing.toLowerCase().includes(appState.searchTerm.toLowerCase()));

        // Filtro de certificaciones
        const matchesFilters = appState.selectedFilters.length === 0 ||
                              appState.selectedFilters.every(filter => product.certifications.includes(filter));

        return matchesSearch && matchesFilters;
    });
}

// Renderizar productos
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const filteredProducts = getFilteredProducts();

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; color: #6b7280; grid-column: 1/-1;">No se encontraron productos</p>';
        return;
    }

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <div class="product-certifications">
                    ${product.certifications.map(cert => `
                        <span class="certification-badge">${cert}</span>
                    `).join('')}
                </div>
                <p class="product-price">$${product.price.toLocaleString()}</p>
                <div class="product-actions">
                    <button class="btn btn-primary btn-detail" onclick="showProductDetail(${product.id})">
                        Ver Detalle
                    </button>
                    <button class="btn btn-secondary btn-cart" onclick="addToCart(${product.id})">
                        🛒
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Mostrar detalle de producto
function showProductDetail(productId) {
    const product = appState.products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const productDetail = document.getElementById('productDetail');

    productDetail.innerHTML = `
        <div class="product-detail-grid">
            <div>
                <img src="${product.image}" alt="${product.name}" class="product-detail-image">
            </div>
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <p class="product-detail-description">${product.description}</p>
                
                <div class="detail-section">
                    <h3>Certificaciones:</h3>
                    <div class="product-certifications">
                        ${product.certifications.map(cert => `
                            <span class="certification-badge">${cert}</span>
                        `).join('')}
                    </div>
                </div>

                <div class="detail-section">
                    <h3>Ingredientes:</h3>
                    <p class="ingredients-list">${product.ingredients.join(', ')}</p>
                </div>

                <div class="detail-section">
                    <h3>Modo de uso:</h3>
                    <p class="ingredients-list">${product.usage}</p>
                </div>

                <p class="product-price">$${product.price.toLocaleString()}</p>
                <p class="stock-info">Stock disponible: ${product.stock}</p>
                
                <button class="btn btn-primary" style="width: 100%;" onclick="addToCartAndCloseModal(${product.id})">
                    Agregar al Carrito
                </button>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

// Buscar productos
function handleSearch(searchTerm) {
    appState.searchTerm = searchTerm;
    renderProducts();
}