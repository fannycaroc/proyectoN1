// Capturamos el formulario de registro
const formRegistro = document.getElementById('formRegistro');

if (formRegistro) {
    formRegistro.addEventListener('submit', function(e) {
        e.preventDefault(); // Evitamos que se recargue la página

        // Obtenemos los valores de los inputs
        const nombreUsuario = document.getElementById('nombreUsuario').value.trim();
        const correoUsuario = document.getElementById('correoUsuario').value.trim();
        const passwordUsuario = document.getElementById('passwordUsuario').value;

        // Llamamos a una función para registrar el usuario
        registrarUsuario(nombreUsuario, correoUsuario, passwordUsuario);
    });
}

function registrarUsuario(nombre, correo, password) {
    // Ciframos la contraseña en Base64
    const passwordCifrada = btoa(password);

    // Creamos el objeto de usuario
    const nuevoUsuario = {
        nombre: nombre,
        correo: correo,
        password: passwordCifrada
    };

    // Obtenemos los usuarios existentes del LocalStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Agregamos el nuevo usuario
    usuarios.push(nuevoUsuario);

    // Guardamos el nuevo array de usuarios en LocalStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Creamos la sesión de usuario activo
    localStorage.setItem('usuarioActivo', JSON.stringify({
        nombre: nombre,
        correo: correo
    }));

    // Redirigimos a la página principal
    window.location.href = '../index.html';
}

// Capturamos el formulario de login
const formLogin = document.getElementById('formLogin');

if (formLogin) {
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault(); // Evitamos recarga de página

        // Obtenemos los valores del formulario
        const correo = document.getElementById('loginCorreo').value.trim();
        const password = document.getElementById('loginPassword').value;

        iniciarSesion(correo, password);
    });
}

// Función para iniciar sesión
function iniciarSesion(correo, password) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find(usuario => usuario.correo === correo);

    if (usuarioEncontrado) {
        const passwordCifrada = btoa(password);

        if (usuarioEncontrado.password === passwordCifrada) {
            // Guardamos el usuario activo
            localStorage.setItem('usuarioActivo', JSON.stringify({
                nombre: usuarioEncontrado.nombre,
                correo: usuarioEncontrado.correo
            }));

            // Cerramos el modal de login manualmente
            const modalLogin = bootstrap.Modal.getInstance(document.getElementById('modalLogin'));
            modalLogin.hide();

            // Actualizamos el menú de usuario
            mostrarUsuarioActivo();

        } else {
            alert('⚠️ Contraseña incorrecta. Intenta de nuevo.');
        }
    } else {
        alert('⚠️ Correo no registrado. Por favor crea una cuenta.');
    }
}

