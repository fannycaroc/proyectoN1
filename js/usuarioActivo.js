function mostrarUsuarioActivo() {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    const divIconoUsuario = document.getElementById('iconoUsuario');

    if (usuarioActivo && divIconoUsuario) {
        divIconoUsuario.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-success dropdown-toggle myButton" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    ${usuarioActivo.nombre}
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a class="dropdown-item" href="#" id="cerrarSesion">Cerrar sesión</a></li>
                </ul>
            </div>
        `;

        const btnCerrarSesion = document.getElementById('cerrarSesion');
        btnCerrarSesion.addEventListener('click', function() {
            localStorage.removeItem('usuarioActivo');
            window.location.reload();
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    mostrarUsuarioActivo();
});
