// ========================================
// DATA.JS - Carga de Datos desde JSON
// ========================================

// Cargar datos del archivo JSON
async function loadData() {
    try {
        // Hacer petición al archivo data.json
        const response = await fetch('data.json');
        const data = await response.json();
        
        // Guardar datos en el estado global
        appState.products = data.products;           // Productos
        appState.blogPosts = data.blogPosts;         // Posts del blog
        appState.discountCodes = data.discountCodes; // Códigos de descuento
        
        console.log('✅ Datos cargados correctamente');
        return true;
    } catch (error) {
        console.error('❌ Error al cargar datos:', error);
        // Datos de respaldo si falla la carga
        appState.products = [];
        return false;
    }
}