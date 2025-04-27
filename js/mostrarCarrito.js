// Función para mostrar los productos del carrito
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoTabla = document.getElementById('carritoTabla');
    const totalCarrito = document.getElementById('totalCarrito');

    // Limpiar la tabla por si ya había algo
    carritoTabla.innerHTML = '';

    // Agrupar productos por id
    const productosAgrupados = {};

    carrito.forEach(producto => {
        if (productosAgrupados[producto.id]) {
            productosAgrupados[producto.id].cantidad += 1;
        } else {
            productosAgrupados[producto.id] = { ...producto, cantidad: 1 };
        }
    });

    let total = 0;

    // Recorrer productos agrupados y mostrarlos
    for (const id in productosAgrupados) {
        const producto = productosAgrupados[id];
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precio.toLocaleString('es-CO')}</td>
            <td>$${subtotal.toLocaleString('es-CO')}</td>
        `;
        carritoTabla.appendChild(fila);
    }

    // Mostrar el total general
    totalCarrito.textContent = `Total: $${total.toLocaleString('es-CO')}`;
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    mostrarCarrito(); // Volver a pintar la tabla vacía
    actualizarContadorCarrito(); // Actualizar también el contador
}

// Al cargar la página, mostramos el carrito
document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();

    const botonVaciar = document.getElementById('vaciarCarrito');
    if (botonVaciar) {
        botonVaciar.addEventListener('click', vaciarCarrito);
    }
});