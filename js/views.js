
function changeView(view) {
    appState.currentView = view;

    const sections = [
        'heroSection', 
        'searchSection', 
        'productsGrid', 
        'cartView', 
        'authView', 
        'profileView', 
        'blogView', 
        'advisorView'
    ];
    
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            element.classList.add('hidden');
        }
    });

    // Mostrar la vista correspondiente
    switch(view) {
        case 'home':
            showHomeView();
            break;
        case 'cart':
            showCartView();
            break;
        case 'login':
            showLoginView();
            break;
        case 'profile':
            showProfileView();
            break;
        case 'blog':
            showBlogView();
            break;
        case 'advisor':
            showAdvisorView();
            break;
        default:
            showHomeView();
    }

    const nav = document.getElementById('mainNav');
    if (nav) {
        nav.classList.remove('active');
    }

    window.scrollTo(0, 0);
}

// Mostrar vista Home
function showHomeView() {
    document.getElementById('heroSection').classList.remove('hidden');
    document.getElementById('searchSection').classList.remove('hidden');
    document.getElementById('productsGrid').classList.remove('hidden');
}

// Mostrar vista Carrito
function showCartView() {
    document.getElementById('cartView').classList.remove('hidden');
    renderCart();
}

// Mostrar vista Login
function showLoginView() {
    document.getElementById('authView').classList.remove('hidden');
}

// Mostrar vista Perfil
function showProfileView() {
    if (appState.user) {
        document.getElementById('profileView').classList.remove('hidden');
        renderProfile();
    } else {
        changeView('login');
    }
}

// Mostrar vista Blog
function showBlogView() {
    document.getElementById('blogView').classList.remove('hidden');
}

// Mostrar vista Asesoría
function showAdvisorView() {
    document.getElementById('advisorView').classList.remove('hidden');
}