// Al cargar la página, ejecutar esta función automáticamente
window.onload = function() {
    // Verificar que el usuario esté logueado
    verificarSesion();
    // Cargar los productos desde el localStorage
    cargarProductos();
};

// Función para verificar si hay un usuario logueado
function verificarSesion() {
    // Intentar obtener el usuario guardado del localStorage
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    
    // Si no hay usuario guardado (null o undefined)
    if (!usuarioGuardado) {
        // Redirigir a la página de login
        window.location.href = 'login.html';
        // Salir de la función para no ejecutar más código
        return;
    }
    
    // Convertir el texto JSON guardado en un objeto de JavaScript
    // JSON.parse hace lo contrario de JSON.stringify
    const usuario = JSON.parse(usuarioGuardado);
    
    // Mostrar el nombre del usuario en la página
    // Buscar el elemento con id 'nombreUsuario' y cambiar su texto
    document.getElementById('nombreUsuario').textContent = 'Hola, ' + usuario.nombre;
}

// Función para cerrar sesión
function cerrarSesion() {
    // Eliminar el usuario guardado del localStorage
    localStorage.removeItem('usuarioActual');
    // Redirigir al usuario de vuelta al login
    window.location.href = 'login.html';
}

// Función para cargar y mostrar los productos en la tabla
function cargarProductos() {
    // Obtener los productos guardados del localStorage
    const productosGuardados = localStorage.getItem('productos');
    // Si hay productos guardados, convertirlos de JSON a objeto
    // Si no hay, crear un arreglo vacío []
    const productos = productosGuardados ? JSON.parse(productosGuardados) : [];
    
    // Obtener el elemento tbody de la tabla donde se mostrarán los productos
    const listaElemento = document.getElementById('listaProductos');
    
    // Si no hay productos en el arreglo (está vacío)
    if (productos.length === 0) {
        // Mostrar un mensaje indicando que no hay productos
        listaElemento.innerHTML = '<tr><td colspan="4" style="text-align:center;">No hay productos disponibles</td></tr>';
        // Salir de la función
        return;
    }
    
    // Limpiar la tabla antes de agregar productos
    listaElemento.innerHTML = '';
    
    // Recorrer todos los productos del arreglo
    for (let i = 0; i < productos.length; i++) {
        // Obtener el producto actual
        const producto = productos[i];
        
        // Crear un elemento <tr> (fila de tabla)
        const fila = document.createElement('tr');
        // Llenar la fila con los datos del producto
        // Crear 4 columnas <td> con: ID, Nombre, Precio y Categoría
        fila.innerHTML = '<td>' + producto.id + '</td>' +
                        '<td>' + producto.nombre + '</td>' +
                        '<td>$' + producto.precio + '</td>' +
                        '<td>' + producto.categoria + '</td>';
        
        // Agregar la fila completa a la tabla
        listaElemento.appendChild(fila);
    }
}
