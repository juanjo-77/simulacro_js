// Lista de usuarios válidos (en un sistema real esto estaría en una base de datos)
var usuariosValidos = [
    { usuario: 'admin', contrasena: 'admin123', rol: 'admin', nombre: 'Administrador' },
    { usuario: 'user', contrasena: 'user123', rol: 'usuario', nombre: 'Usuario Normal' }
];

// Obtener el formulario de login
var formulario = document.getElementById('formularioLogin');

// Escuchar cuando se envía el formulario
formulario.addEventListener('submit', function(evento) {
    // Evitar que la página se recargue
    evento.preventDefault();
    
    // Obtener los valores ingresados
    var usuarioIngresado = document.getElementById('usuario').value;
    var contrasenaIngresada = document.getElementById('contrasena').value;
    var mensajeElemento = document.getElementById('mensaje');
    
    // Variable para saber si encontramos el usuario
    var usuarioEncontrado = null;
    
    // Buscar el usuario en la lista
    for (var i = 0; i < usuariosValidos.length; i++) {
        var user = usuariosValidos[i];
        // Verificar si el usuario y contraseña coinciden
        if (user.usuario === usuarioIngresado && user.contrasena === contrasenaIngresada) {
            usuarioEncontrado = user;
            break; // Salir del bucle porque ya encontramos el usuario
        }
    }
    
    // Si encontramos el usuario
    if (usuarioEncontrado) {
        // Guardar la información del usuario en el navegador
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
        
        // Mostrar mensaje de éxito
        mensajeElemento.textContent = '¡Bienvenido!';
        mensajeElemento.className = 'mensaje exito';
        
        // Esperar 1 segundo y redirigir según el rol
        setTimeout(function() {
            if (usuarioEncontrado.rol === 'admin') {
                // Si es admin, ir a la página de admin
                window.location.href = 'admin.html';
            } else {
                // Si es usuario normal, ir a la página de usuario
                window.location.href = 'usuario.html';
            }
        }, 1000);
    } else {
        // Si no encontramos el usuario, mostrar error
        mensajeElemento.textContent = 'Usuario o contraseña incorrectos';
        mensajeElemento.className = 'mensaje error';
    }
});
