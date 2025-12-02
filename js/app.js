
async function initApp() {
    console.log(' Iniciando VioletStore...');
    
    const dataLoaded = await loadData();
    
    if (!dataLoaded) {
        showNotification('Error al cargar datos. Por favor recarga la página.', 'error');
        return;
    }

    renderFilters();
    renderProducts();
    renderBlog();
    
    setupEventListeners();

    updateCartBadge();
    
    console.log(' VioletStore inicializado correctamente');
}

function setupEventListeners() {

    document.querySelectorAll('[data-view]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const view = e.target.dataset.view;
            changeView(view);
        });
    });

    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => changeView('cart'));
    }

    const userBtn = document.getElementById('userBtn');
    if (userBtn) {
        userBtn.addEventListener('click', () => {
            if (appState.user) {

                changeView('profile');
            } else {

                changeView('login');
            }
        });
    }

    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const nav = document.getElementById('mainNav');
            nav.classList.toggle('active');
        });
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            handleSearch(e.target.value);
        });
    }

    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            document.getElementById('productModal').classList.remove('active');
        });
    }

    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', handleAuthSubmit);
    }

    const toggleAuthBtn = document.getElementById('toggleAuthMode');
    if (toggleAuthBtn) {
        toggleAuthBtn.addEventListener('click', toggleAuthMode);
    }

    const advisorForm = document.getElementById('advisorForm');
    if (advisorForm) {
        advisorForm.addEventListener('submit', handleAdvisorSubmit);
    }

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => changeView('home'));
    }

    console.log('✅ Event listeners configurados');
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM cargado');
    initApp();
});