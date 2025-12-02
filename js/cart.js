
function addToCart(productId) {

    const product = appState.products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = appState.cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        appState.cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartBadge();
    showNotification('Producto agregado al carrito');
}

// Agrega al carrito y cierra modal de detalle
function addToCartAndCloseModal(productId) {
    addToCart(productId);
    document.getElementById('productModal').classList.remove('active');
}

// Actualiza contador del carrito
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');

    // Si está vacío
    if (appState.cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #6b7280;">Tu carrito está vacío</p>';
        cartSummary.innerHTML = '';
        return;
    }

    // Crear HTML para cada item del carrito
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
    
    // Crea HTML del resumen del carrito
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

// Actualiza la cantidad de productos en el carrito
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = appState.cart.find(i => i.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartBadge();
        renderCart();
    }
}

function removeFromCart(productId) {

    appState.cart = appState.cart.filter(item => item.id !== productId);
    updateCartBadge();
    renderCart();

function calculateTotal() {
    return appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function applyDiscount() {
    const code = document.getElementById('discountCode').value.toUpperCase();
    const discount = appState.discountCodes.find(d => d.code === code);
    
    if (discount) {
        showNotification(`¡Descuento aplicado! ${discount.description}`);

    } else {
        showNotification('Código de descuento inválido', 'error');
    }
}

function processCheckout() {

    if (!appState.user) {
        showNotification('Por favor inicia sesión para continuar');
        changeView('login');
        return;
    }

    const order = {
        id: Date.now(),                           
        date: new Date().toLocaleDateString(), 
        items: [...appState.cart],            
        total: calculateTotal(),            
        status: 'Procesando' 
    };

    appState.orderHistory.push(order);

    appState.cart = [];
    updateCartBadge();
    
    showNotification('¡Pedido realizado con éxito!');
    changeView('profile');
}}