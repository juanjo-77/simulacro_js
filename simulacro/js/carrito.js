

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];  // coje a "carrito []" si no existe crea un array
let total = 0;

const ordenesDiv = document.getElementById("ordenes");
const totalDiv = document.getElementById("total");
const clearBtn = document.getElementById("clearAll");




clearBtn.addEventListener("click", () => {  // evento para el boton de eliminar todo
    carrito = [];
    localStorage.removeItem("carrito");  // quita del localStorage todo

    renderCarrito();
});




//-------------------------------------------------------------------



function renderCarrito() {
    ordenesDiv.innerHTML = "";  //limpia el html para que no se creen duplicados
    total = 0;  

    carrito.forEach((item, index) => {     // item(elemento del carrito)- index(posicion en el array)
        const div = document.createElement("div");  // creamos un div
        div.classList.add("item-carrito");      // le ponemos una clase


        const texto = document.createElement("span");   //creamos un span dentro del div
        texto.textContent = `${item.producto} - $${item.precio}`;  // se muestra  producto y precio

        const btnEliminar = document.createElement("button");  //creamos btn eliminar
        btnEliminar.textContent = "ELiminar";   //ponemos el boton en el html
        btnEliminar.classList.add("btn-delete");  //ponemos una clase
        

        btnEliminar.addEventListener("click", () => {
            carrito.splice(index, 1); // elimina 1 elemento espesifico
            localStorage.setItem("carrito", JSON.stringify(carrito));  //actualiza localStorage
            
            renderCarrito();  //actualiza la pagina para ver los cambios 
        });

        div.appendChild(texto);   // texto se mete en el html dentro del div
        div.appendChild(btnEliminar);  // btnEliminar se mete en el html dentro del div
        ordenesDiv.appendChild(div);   // ese div se mete al html dentro de ordenesDiv

        total += item.precio;   // total que estaba en 0 se va acumulando los precios
    });

    totalDiv.textContent = `Total: $${total.toFixed(2)}`;  //agrega total a totalDiv en el html
}



window.addEventListener("message", (event) =>{  //escucha un mensaje
    const { producto, precio } = event.data;   // coje el objeto de (usuario.js) 

    carrito.push({producto, precio});  //agrega ese producto al carrito

    localStorage.setItem("carrito", JSON.stringify(carrito));    //actualiza el carrito
    
    renderCarrito();   // actualiza el html
});



const btnPedido = document.getElementById("btnPedido")


btnPedido.addEventListener("click", () => {
    if (carrito.length === 0){
        alert("No hay productos en el carrito");
        return;
    }

    localStorage.setItem("NuevoPedido", JSON.stringify(carrito));
    alert("Pedido enviado correctamente");

    carrito = [];
    localStorage.removeItem("carrito");
    renderCarrito();

});