// Al cargar la página, verificar que el usuario esté logueado
window.onload = function() {
    verificarSesion();
    cargarProductos();
};

// Función para verificar si hay un usuario logueado
function verificarSesion() {
    // Intentar obtener el usuario guardado
    var usuarioGuardado = localStorage.getItem('usuarioActual');
    
    // Si no hay usuario guardado, redirigir al login
    if (!usuarioGuardado) {
        window.location.href = 'login.html';
        return;
    }
    
    // Convertir el texto guardado en un objeto
    var usuario = JSON.parse(usuarioGuardado);
    
    // Mostrar el nombre del usuario en la página
    document.getElementById('nombreUsuario').textContent = 'Hola, ' + usuario.nombre;
}

// Función para cerrar sesión
function cerrarSesion() {
    // Eliminar el usuario guardado
    localStorage.removeItem('usuarioActual');
    // Volver al login
    window.location.href = 'login.html';
}

// Función para cargar y mostrar los productos
function cargarProductos() {
    // Obtener los productos guardados (o crear una lista vacía si no hay)
    var productosGuardados = localStorage.getItem('productos');
    var productos = productosGuardados ? JSON.parse(productosGuardados) : [];
    
    // Obtener el elemento donde mostraremos los productos
    var listaElemento = document.getElementById('listaProductos');
    
    // Si no hay productos, mostrar mensaje
    if (productos.length === 0) {
        listaElemento.innerHTML = '<tr><td colspan="4" style="text-align:center;">No hay productos disponibles</td></tr>';
        return;
    }
    
    // Limpiar la lista
    listaElemento.innerHTML = '';
    
    // Recorrer todos los productos y mostrarlos
    for (var i = 0; i < productos.length; i++) {
        var producto = productos[i];
        
        // Crear una fila para cada producto
        var fila = document.createElement('tr');
        fila.innerHTML = '<td>' + producto.id + '</td>' +
                        '<td>' + producto.nombre + '</td>' +
                        '<td>$' + producto.precio + '</td>' +
                        '<td>' + producto.categoria + '</td>';
        
        // Agregar la fila a la tabla
        listaElemento.appendChild(fila);
    }
}
