// Variable para saber si estamos editando
var editandoId = null;

// Al cargar la página
window.onload = function() {
    verificarSesion();
    cargarProductos();
    document.getElementById('formularioProducto').addEventListener('submit', function(e) {
        e.preventDefault();
        guardarProducto();
    });
};

// Verificar que el usuario sea admin
function verificarSesion() {
    var usuarioGuardado = localStorage.getItem('usuarioActual');
    if (!usuarioGuardado) { window.location.href = 'login.html'; return; }
    var usuario = JSON.parse(usuarioGuardado);
    if (usuario.rol !== 'admin') { window.location.href = 'usuario.html'; return; }
    document.getElementById('nombreUsuario').textContent = 'Hola, ' + usuario.nombre;
}

// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    window.location.href = 'login.html';
}

// Obtener productos del localStorage
function obtenerProductos() {
    var guardados = localStorage.getItem('productos');
    return guardados ? JSON.parse(guardados) : [];
}

// Guardar productos en localStorage
function guardarEnStorage(productos) {
    localStorage.setItem('productos', JSON.stringify(productos));
}

// Guardar producto (crear o editar)
function guardarProducto() {
    var nombre = document.getElementById('nombre').value;
    var precio = document.getElementById('precio').value;
    var categoria = document.getElementById('categoria').value;
    var productos = obtenerProductos();
    
    if (editandoId !== null) {
        // Editar producto existente
        for (var i = 0; i < productos.length; i++) {
            if (productos[i].id === editandoId) {
                productos[i].nombre = nombre;
                productos[i].precio = precio;
                productos[i].categoria = categoria;
                break;
            }
        }
        editandoId = null;
    } else {
        // Crear nuevo producto
        var nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
        productos.push({ id: nuevoId, nombre: nombre, precio: precio, categoria: categoria });
    }
    
    guardarEnStorage(productos);
    limpiarFormulario();
    cargarProductos();
}

// Cargar productos en la tabla
function cargarProductos() {
    var productos = obtenerProductos();
    var lista = document.getElementById('listaProductos');
    
    if (productos.length === 0) {
        lista.innerHTML = '<tr><td colspan="5" style="text-align:center;">No hay productos</td></tr>';
        return;
    }
    
    lista.innerHTML = '';
    for (var i = 0; i < productos.length; i++) {
        var p = productos[i];
        var fila = document.createElement('tr');
        fila.innerHTML = '<td>' + p.id + '</td><td>' + p.nombre + '</td><td>$' + p.precio + '</td><td>' + p.categoria + '</td>' +
                        '<td class="acciones">' +
                        '<button class="btn-editar" onclick="editarProducto(' + p.id + ')">Editar</button>' +
                        '<button class="btn-eliminar" onclick="eliminarProducto(' + p.id + ')">Eliminar</button></td>';
        lista.appendChild(fila);
    }
}

// Editar producto
function editarProducto(id) {
    var productos = obtenerProductos();
    for (var i = 0; i < productos.length; i++) {
        if (productos[i].id === id) {
            var p = productos[i];
            document.getElementById('nombre').value = p.nombre;
            document.getElementById('precio').value = p.precio;
            document.getElementById('categoria').value = p.categoria;
            editandoId = id;
            document.getElementById('btnGuardar').textContent = 'Actualizar';
            break;
        }
    }
}

// Eliminar producto
function eliminarProducto(id) {
    if (confirm('¿Eliminar este producto?')) {
        var productos = obtenerProductos();
        var nuevosProductos = [];
        for (var i = 0; i < productos.length; i++) {
            if (productos[i].id !== id) { nuevosProductos.push(productos[i]); }
        }
        guardarEnStorage(nuevosProductos);
        cargarProductos();
    }
}

// Limpiar formulario
function limpiarFormulario() {
    document.getElementById('formularioProducto').reset();
    editandoId = null;
    document.getElementById('btnGuardar').textContent = 'Guardar';
}

