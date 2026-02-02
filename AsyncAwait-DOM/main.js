
// Obtenemos referencias a los elementos del DOM que vamos a manipular

//gatos
const imgGato = document.getElementById("img-gato"); 
const mensajeCargandoGato = document.getElementById("mensaje-cargando-gato");
const btnGato = document.getElementById("btn-gato"); 

//perros
const btnPerro = document.getElementById("btn-perro");
const imgPerro = document.getElementById("img-perro");
const mensajeCargandoPerro = document.getElementById("mensaje-cargando-perro");

const apicatkey  = "live_YTAG5gIPMoANlMsxUlc1HJN0mlJC6pKKiZ8o1UcDuZbCNL72nh9DV6RMjPBb4cp5";
const apidogkey = "live_o3zdKpk5gw0XG9HYECVSYxsV0rxWX5MIDal2AhMWcoPliSV00e3g5LL54N2wdQei";

// Ya que tenemos selecionado el boton le asignamos un evento, cuando el usuario haga click en el boton 
// se va a ejecutar la respectiva funcion.

btnGato.addEventListener("click", () => {
    obtenerImagenGato();
});

btnPerro.addEventListener("click", () => {
    obtenerImagenPerro();
});

// Al cargar la página, mostramos una imagen de gato por defecto
obtenerImagenGato();
obtenerImagenPerro();


 /*
    Las peticiones a APIs normalmente se hacen con fetch o con axios (una libreria externa)

   ¿Que es el asincronismo?
   Es la forma en como un lenguaje maneja la operaciones que toman tiempo en completarse, 
   como por ejemplo las peticiones a APIs o consultas a una base de datos, que
   tambien se pueden hacer desde JavaScript con Nodejs. A este tipo de lenguajes que que hacen peticiones,
   en donde entra y sale informacion, se les llama lenguajes "I/O bound" (Input/Output bound)
   ¿Que seran los lenguajes de tipo CPU bound? 🤔

 */


/* 
    Primero creamos una funcion asincrona que nos permitira usar "await" dentro de ella,
    nada mas con declarar esta funcion como asicnrona ya le decimos a JavaScript que
    esta funcion va a tener operaciones que van a tomar tiempo en completarse.
    Esta forma de manejar el asincronismo en JS es la mas moderna.

    Cuando usamos "async" antes de la declaracion de una funcion, le estamos diciendo a JS 
    que esta funcion va a tener operaciones asincronas dentro de ella. No va a parar el flujo de ejecucion del programa
    mientras espera a que se completen la operaciones, por otra forma de decirlo va a estar esperando en segundo plano.
*/
async function obtenerImagenGato() {
    // Accedemos a  propiedades del DOM para mostrar un mensaje de cargando
    mensajeCargandoGato.textContent = "Cargando...";
    mensajeCargandoGato.style.display = "block";
    imgGato.innerHTML = "";
    try {
        // Usamos fetch para hacer la petición HTTP (esto retorna una promesa) otra forma de hacer peticiones es con axios (una libreria externa)
        // El await pausa la función hasta que la promesa se resuelva

        const respuesta = await fetch("https://api.thecatapi.com/v1/images/search", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apicatkey
            }
        });
        // Convertimos la respuesta a JSON (esto también es una promesa)
        const info = await respuesta.json();
        // Si la respuesta tiene una imagen, la mostramos en el DOM
        if (info && info[0] && info[0].url) {
            imgGato.innerHTML = '<img src="' + info[0].url + '" alt="Gato" class="img-fluid rounded shadow" style="max-width:400px; border: 4px solid #0d6efd;">';
        } else {
            imgGato.textContent = "No se pudo cargar la imagen.";
        }
    } catch (error) {
        // Si ocurre un error, lo mostramos en consola y en el DOM
        imgGato.textContent = "Error al cargar la imagen.";
        console.log("Hubo un error: " + error);
    }
    // Ocultamos el mensaje de cargando
    mensajeCargandoGato.style.display = "none";
}


/* 
    Esta forma puede llevar a callback hell si se anidan muchas promesas.
    Es considerada mala practica hoy en dia.
 */
function obtenerImagenPerro() {
    mensajeCargandoPerro.textContent = "Cargando...";
    mensajeCargandoPerro.style.display = "block";
    imgPerro.innerHTML = "";

    fetch("https://api.thedogapi.com/v1/images/search", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apidogkey
        }
    })
    .then((respuesta) =>{
        return respuesta.json();
    }).then(function(info) {
        if (info && info[0] && info[0].url) {
            imgPerro.innerHTML = '<img src="' + info[0].url + '" alt="Perro" class="img-fluid rounded shadow" style="max-width:400px; border: 4px solid #198754;">';
        } else {
            imgPerro.textContent = "No se pudo cargar la imagen.";
        }
        mensajeCargandoPerro.style.display = "none";
    })
    .catch(function(error) {
        imgPerro.textContent = "Error al cargar la imagen.";
        mensajeCargandoPerro.style.display = "none";
        console.log("Hubo un error: " + error);
    });
}



