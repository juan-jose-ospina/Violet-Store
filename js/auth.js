
function handleAuthSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    const name = document.getElementById('nameInput').value;

    if (appState.isLoginMode) {

        loginUser(email, password);
    } else {

        registerUser(email, password, name);
    }
}

function loginUser(email, password) {

    appState.user = {
        email: email,
        name: 'Usuario',
        referralCode: generateReferralCode()
    };
    
    showNotification('¡Bienvenido!');
    changeView('home');
}

function registerUser(email, password, name) {

    appState.user = {
        email: email,
        name: name,
        referralCode: generateReferralCode()
    };
    
    showNotification('¡Cuenta creada con éxito!');
    changeView('home');
}

function generateReferralCode() {
    return 'REF' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

function toggleAuthMode() {

    appState.isLoginMode = !appState.isLoginMode;

    const title = document.getElementById('authTitle');
    const nameGroup = document.getElementById('nameGroup');
    const toggleBtn = document.getElementById('toggleAuthMode');
    const submitBtn = document.querySelector('#authForm button[type="submit"]');

    if (appState.isLoginMode) {

        title.textContent = 'Iniciar Sesión';
        nameGroup.classList.add('hidden');
        toggleBtn.textContent = '¿No tienes cuenta? Regístrate';
        submitBtn.textContent = 'Ingresar';
    } else {

        title.textContent = 'Registrarse';
        nameGroup.classList.remove('hidden');
        toggleBtn.textContent = '¿Ya tienes cuenta? Inicia sesión';
        submitBtn.textContent = 'Crear Cuenta';
    }
}

function renderProfile() {
    const profileInfo = document.getElementById('profileInfo');
    const ordersList = document.getElementById('ordersList');

    profileInfo.innerHTML = `
        <p><strong>Nombre:</strong> ${appState.user.name}</p>
        <p><strong>Email:</strong> ${appState.user.email}</p>
        <p><strong>Código de Referido:</strong> ${appState.user.referralCode}</p>
        <button class="btn logout-btn" onclick="logout()">Cerrar Sesión</button>
    `;

    if (appState.orderHistory.length === 0) {
        ordersList.innerHTML = '<p style="color: #6b7280;">No tienes pedidos aún</p>';
    } else {
        ordersList.innerHTML = appState.orderHistory.map(order => `
            <div class="order-item">
                <p><strong>Pedido #${order.id}</strong></p>
                <p>Fecha: ${order.date}</p>
                <p>Total: $${order.total.toLocaleString()}</p>
                <p>Estado: <span class="order-status">${order.status}</span></p>
            </div>
        `).join('');
    }
}

function logout() {
    appState.user = null;
    showNotification('Sesión cerrada');
    changeView('home');
}