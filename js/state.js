// ========================================
// STATE.JS - Estado Global de la Aplicación
// ========================================

// Estado global de la aplicación
const appState = {
    products: [],
    cart: [],
    user: null,
    currentView: 'home',
    selectedProduct: null,
    searchTerm: '',
    selectedFilters: [],
    orderHistory: [],
    isLoginMode: true,
    blogPosts: [],
    discountCodes: []
};

// Exportar el estado para que otros módulos puedan usarlo
window.appState = appState;