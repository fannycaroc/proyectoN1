// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.getElementById('contadorCarrito');

    if (contador) {
        contador.textContent = carrito.length;

        // Opcional: ocultar el contador si no hay productos
        if (carrito.length === 0) {
            contador.style.display = 'none';
        } else {
            contador.style.display = 'flex';
        }
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);