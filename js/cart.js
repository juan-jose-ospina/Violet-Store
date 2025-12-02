// ========================================
// CART.JS - Gestión del Carrito de Compras
// ========================================

// Agregar producto al carrito
function addToCart(productId) {
    // Buscar el producto en el catálogo
    const product = appState.products.find(p => p.id === productId);
    if (!product) return;

    // Verificar si el producto ya está en el carrito
    const existingItem = appState.cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Si ya existe, incrementar cantidad
        existingItem.quantity += 1;
    } else {
        // Si no existe, agregarlo con cantidad 1
        appState.cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartBadge();
    showNotification('Producto agregado al carrito');
}

// Agregar al carrito y cerrar modal de detalle
function addToCartAndCloseModal(productId) {
    addToCart(productId);
    document.getElementById('productModal').classList.remove('active');
}

// Actualizar contador del carrito en el header
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    // Sumar todas las cantidades de productos en el carrito
    const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
}

// Renderizar contenido del carrito
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');

    // Si el carrito está vacío
    if (appState.cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #6b7280;">Tu carrito está vacío</p>';
        cartSummary.innerHTML = '';
        return;
    }

    // Crear HTML de cada item del carrito
    cartItems.innerHTML = appState.cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">$${item.price.toLocaleString()}</p>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');

    const total = calculateTotal();
    
    // Crear HTML del resumen del carrito
    cartSummary.innerHTML = `
        <div class="discount-section">
            <input type="text" id="discountCode" placeholder="Código de descuento">
            <button class="btn btn-primary" onclick="applyDiscount()">Aplicar</button>
        </div>
        <div class="cart-total">
            Total: $${total.toLocaleString()}
        </div>
        <button class="checkout-btn" onclick="processCheckout()">Proceder al Pago</button>
    `;
}

// Actualizar cantidad de un producto en el carrito
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        // Si la cantidad es 0 o menor, eliminar el producto
        removeFromCart(productId);
        return;
    }

    // Buscar el item y actualizar su cantidad
    const item = appState.cart.find(i => i.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartBadge();
        renderCart();
    }
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    // Filtrar todos los items excepto el que se quiere eliminar
    appState.cart = appState.cart.filter(item => item.id !== productId);
    updateCartBadge();
    renderCart();
}

// Calcular total del carrito
function calculateTotal() {
    return appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Aplicar código de descuento
function applyDiscount() {
    const code = document.getElementById('discountCode').value.toUpperCase();
    const discount = appState.discountCodes.find(d => d.code === code);
    
    if (discount) {
        showNotification(`¡Descuento aplicado! ${discount.description}`);
        // Aquí podrías implementar la lógica de descuento real
    } else {
        showNotification('Código de descuento inválido', 'error');
    }
}

// Procesar checkout (finalizar compra)
function processCheckout() {
    // Verificar que el usuario esté logueado
    if (!appState.user) {
        showNotification('Por favor inicia sesión para continuar');
        changeView('login');
        return;
    }

    // Crear objeto de pedido
    const order = {
        id: Date.now(),                           // ID único basado en timestamp
        date: new Date().toLocaleDateString(),    // Fecha actual
        items: [...appState.cart],                // Copia de items del carrito
        total: calculateTotal(),                  // Total calculado
        status: 'Procesando'                      // Estado inicial
    };

    // Agregar pedido al historial
    appState.orderHistory.push(order);
    
    // Vaciar el carrito
    appState.cart = [];
    updateCartBadge();
    
    showNotification('¡Pedido realizado con éxito!');
    changeView('profile');
}