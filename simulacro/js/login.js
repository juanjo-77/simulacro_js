
const btnRegister = document.getElementById("register")


btnRegister.addEventListener("click", () => {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;
       
    if (name && email && role) {
        document.getElementById("msg").innerText =
        `Bienvenido: ${name}  || Rol: ${role}`;
    } else {
        document.getElementById("msg").innerText =
        "Completa todos los campos ";
    }
});


btnRegister.addEventListener("click", () => {
    const nameAdmin = document.getElementById("name").value.trim();  
    const emailAdmin = document.getElementById("email").value.trim();
    const admon = document.getElementById("admon").value.trim();  
    const role = document.getElementById("role").value.trim();
    const select = document.getElementById("select").value.trim();


    if (nameAdmin === "" || emailAdmin === "" || role === "") {
        alert("Estás dejando algún campo vacío, por favor completa todos los campos.");
    } else if (role === select){
        alert("seleccione un rol")

    } else if (nameAdmin === "admin" && emailAdmin === "hola@gmail.com" && role === admon) {
        window.location.href = "admin.html";
    } 

    else {
        window.location.href = "usuario.html";
    }
});
