const botones = document.querySelectorAll(".btnAdd");
const iframe = document.getElementById("iframe");


botones.forEach(btn => {
    btn.addEventListener("click", () => {
        const nombre = btn.dataset.nombre;   // data obtiene los elementos en un objeto
        const precio = Number(btn.dataset.precio);

        iframe.contentWindow.postMessage(  // envia un mensaje al iframe
            { producto: nombre, precio },  // mensaje (objeto)
        );
    });
});

