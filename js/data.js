
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        appState.products = data.products;          
        appState.blogPosts = data.blogPosts;         
        appState.discountCodes = data.discountCodes;
        
        console.log('✅ Datos cargados correctamente');
        return true;
    } catch (error) {
        console.error('❌ Error al cargar datos:', error);

        appState.products = [];
        return false;
    }
}