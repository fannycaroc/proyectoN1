const productos = [
    {
      id: 1,
      nombre: "Manzana Roja",
      descripcion: "Unidad",
      precio: 2000,
      imagen: "../img/manzana.jpg"
    },
    {
      id: 2,
      nombre: "Naranja",
      descripcion: "Unidad",
      precio: 800,
      imagen: "../img/naranja.jpg"
    },
    {
      id: 3,
      nombre: "Mandarina",
      descripcion: "Docena",
      precio: 5000,
      imagen: "../img/mandarina.jpg"
    },
    {
      id: 4,
      nombre: "Cebolla Cabezona",
      descripcion: "Libra",
      precio: 3800,
      imagen: "../img/cebolla.jpg"
    },
    {
      id: 5,
      nombre: "Tomate de Guiso",
      descripcion: "Libra",
      precio: 3000,
      imagen: "../img/tomate.jpg"
    },
    {
      id: 6,
      nombre: "Papa Pastusa",
      descripcion: "Unidad",
      precio: 1500,
      imagen: "../img/papa.jpg"
    }
];

// Seleccionamos el contenedor donde se van a insertar las tarjetas
const contenedor = document.getElementById('contenedorProductos');

// Función para mostrar todos los productos
function mostrarProductos() {
  productos.forEach(producto => {
    // Creamos un div por cada producto
    const div = document.createElement('div');
    div.classList.add('col-12', 'col-md-6', 'col-lg-4'); // Responsivo: 1, 2 o 3 columnas según pantalla

    // Creamos la tarjeta usando template literals
    div.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <p class="card-text fw-bold">$${producto.precio.toLocaleString('es-CO')}</p>
          <button class="btn btn-success mt-auto" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        </div>
      </div>
    `;

    // Insertamos el div dentro del contenedor
    contenedor.appendChild(div);
  });
}

// Llamamos a la función para mostrar los productos
mostrarProductos();

// Funcion para agregar los productos al carrito
function agregarAlCarrito(idProducto) {
    // 1. Buscar el producto en el array
    const productoSeleccionado = productos.find(producto => producto.id === idProducto);
  
    if (productoSeleccionado) {
      // 2. Obtener el carrito actual del LocalStorage, o crear uno nuevo si no existe
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
      // 3. Agregar el producto al carrito
      carrito.push(productoSeleccionado);
  
      // 4. Guardar el carrito actualizado en LocalStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
  
      // 5. Mostrar mensaje de éxito
      alert(`✅ ${productoSeleccionado.nombre} agregado al carrito`);
      actualizarContadorCarrito();
    }
}