// Variable global para saber si estamos editando un producto (guarda el ID del producto)
let editandoId = null;

// Al cargar la página, ejecutar esta función automáticamente
window.onload = function() {
    // Verificar que el usuario sea administrador
    verificarSesion();
    // Cargar los productos en la tabla
    cargarProductos();
    // Configurar el evento del formulario para guardar productos
    document.getElementById('formularioProducto').addEventListener('submit', function(e) {
        // Prevenir que el formulario recargue la página
        e.preventDefault();
        // Llamar a la función que guarda el producto
        guardarProducto();
    });
};

// Verificar que el usuario sea administrador
function verificarSesion() {
    // Obtener el usuario guardado del localStorage
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    // Si no hay usuario, redirigir al login y salir de la función
    if (!usuarioGuardado) { window.location.href = 'login.html'; return; }
    // Convertir el texto JSON a objeto
    const usuario = JSON.parse(usuarioGuardado);
    // Si el usuario NO es admin, redirigir a la página de usuario
    if (usuario.rol !== 'admin') { window.location.href = 'usuario.html'; return; }
    // Mostrar el nombre del administrador en el header
    document.getElementById('nombreUsuario').textContent = 'Hola, ' + usuario.nombre;
}

// Cerrar sesión del administrador
function cerrarSesion() {
    // Eliminar el usuario del localStorage
    localStorage.removeItem('usuarioActual');
    // Redirigir al login
    window.location.href = 'login.html';
}

// Obtener todos los productos del localStorage
function obtenerProductos() {
    // Intentar obtener los productos guardados
    const guardados = localStorage.getItem('productos');
    // Si hay productos, convertirlos de JSON a objeto; si no, devolver arreglo vacío
    return guardados ? JSON.parse(guardados) : [];
}

// Guardar el arreglo de productos en el localStorage
function guardarEnStorage(productos) {
    // Convertir el arreglo de objetos a texto JSON y guardarlo
    localStorage.setItem('productos', JSON.stringify(productos));
}

// Guardar producto (puede ser crear uno nuevo o editar uno existente)
function guardarProducto() {
    // Obtener el nombre del campo del formulario
    const nombre = document.getElementById('nombre').value;
    // Obtener el precio del campo del formulario
    const precio = document.getElementById('precio').value;
    // Obtener la categoría del campo del formulario
    const categoria = document.getElementById('categoria').value;
    // Obtener todos los productos actuales
    const productos = obtenerProductos();
    
    // Si editandoId tiene un valor (no es null), significa que estamos editando
    if (editandoId !== null) {
        // Editar producto existente
        // Recorrer todos los productos
        for (let i = 0; i < productos.length; i++) {
            // Si encontramos el producto con el ID que estamos editando
            if (productos[i].id === editandoId) {
                // Actualizar sus datos con los nuevos valores
                productos[i].nombre = nombre;
                productos[i].precio = precio;
                productos[i].categoria = categoria;
                // Salir del bucle porque ya encontramos el producto
                break;
            }
        }
        // Restablecer editandoId a null porque ya terminamos de editar
        editandoId = null;
    } else {
        // Crear nuevo producto
        // Calcular el nuevo ID: si hay productos, tomar el último ID y sumarle 1; si no, empezar en 1
        const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
        // Agregar el nuevo producto al arreglo
        productos.push({ id: nuevoId, nombre: nombre, precio: precio, categoria: categoria });
    }
    
    // Guardar el arreglo actualizado en localStorage
    guardarEnStorage(productos);
    // Limpiar el formulario
    limpiarFormulario();
    // Recargar la tabla para mostrar los cambios
    cargarProductos();
}

// Cargar todos los productos en la tabla
function cargarProductos() {
    // Obtener los productos del localStorage
    const productos = obtenerProductos();
    // Obtener el elemento tbody de la tabla
    const lista = document.getElementById('listaProductos');
    
    // Si no hay productos
    if (productos.length === 0) {
        // Mostrar mensaje de que no hay productos
        lista.innerHTML = '<tr><td colspan="5" style="text-align:center;">No hay productos</td></tr>';
        // Salir de la función
        return;
    }
    
    // Limpiar la tabla
    lista.innerHTML = '';
    // Recorrer cada producto
    for (let i = 0; i < productos.length; i++) {
        // Obtener el producto actual
        const p = productos[i];
        // Crear una fila nueva
        const fila = document.createElement('tr');
        // Llenar la fila con los datos del producto y botones de acción
        fila.innerHTML = '<td>' + p.id + '</td><td>' + p.nombre + '</td><td>$' + p.precio + '</td><td>' + p.categoria + '</td>' +
                        '<td class="acciones">' +
                        // Botón de editar que llama a la función editarProducto con el ID
                        '<button class="btn-editar" onclick="editarProducto(' + p.id + ')">Editar</button>' +
                        // Botón de eliminar que llama a la función eliminarProducto con el ID
                        '<button class="btn-eliminar" onclick="eliminarProducto(' + p.id + ')">Eliminar</button></td>';
        // Agregar la fila a la tabla
        lista.appendChild(fila);
    }
}

// Editar un producto (llenar el formulario con sus datos)
function editarProducto(id) {
    // Obtener todos los productos
    const productos = obtenerProductos();
    // Recorrer los productos
    for (let i = 0; i < productos.length; i++) {
        // Si encontramos el producto con el ID indicado
        if (productos[i].id === id) {
            // Guardar el producto en una variable
            const p = productos[i];
            // Llenar el formulario con los datos del producto
            document.getElementById('nombre').value = p.nombre;
            document.getElementById('precio').value = p.precio;
            document.getElementById('categoria').value = p.categoria;
            // Guardar el ID en la variable global para saber que estamos editando
            editandoId = id;
            // Cambiar el texto del botón a "Actualizar"
            document.getElementById('btnGuardar').textContent = 'Actualizar';
            // Salir del bucle
            break;
        }
    }
}

// Eliminar un producto
function eliminarProducto(id) {
    // Mostrar confirmación antes de eliminar
    if (confirm('¿Eliminar este producto?')) {
        // Obtener todos los productos
        const productos = obtenerProductos();
        // Crear un nuevo arreglo sin el producto que queremos eliminar
        const nuevosProductos = [];
        // Recorrer todos los productos
        for (let i = 0; i < productos.length; i++) {
            // Si el producto NO es el que queremos eliminar, agregarlo al nuevo arreglo
            if (productos[i].id !== id) { nuevosProductos.push(productos[i]); }
        }
        // Guardar el nuevo arreglo (sin el producto eliminado)
        guardarEnStorage(nuevosProductos);
        // Recargar la tabla
        cargarProductos();
    }
}

// Limpiar el formulario
function limpiarFormulario() {
    // Resetear todos los campos del formulario a vacío
    document.getElementById('formularioProducto').reset();
    // Restablecer editandoId a null
    editandoId = null;
    // Cambiar el texto del botón de vuelta a "Guardar"
    document.getElementById('btnGuardar').textContent = 'Guardar';
}
