
function renderBlog() {
    const blogGrid = document.getElementById('blogGrid');
    
    // Verificar si hay posts disponibles
    if (appState.blogPosts.length === 0) {
        blogGrid.innerHTML = '<p>No hay publicaciones disponibles</p>';
        return;
    }

    // Crear HTML de cada post del blog
    blogGrid.innerHTML = appState.blogPosts.map(post => `
        <div class="blog-card">
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
        </div>
    `).join('');
}

// Manejar envío de formulario de asesoría
function handleAdvisorSubmit(e) {
    e.preventDefault();
    
    const message = document.getElementById('advisorMessage').value;
    
    if (message.trim()) {
        showNotification('¡Mensaje enviado! Un asesor se contactará contigo pronto.');
        document.getElementById('advisorMessage').value = '';
    } else {
        showNotification('Por favor escribe un mensaje', 'error');
    }
}