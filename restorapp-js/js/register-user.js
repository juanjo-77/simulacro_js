import { getDataFromForm } from "../shared/form.js"
import { registerUserService } from "../services/user-service.js"

const form = document.getElementById("form-register")

export async function registerUser() {

    // Escuchar evento de submit
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const data = getDataFromForm("form-register")
        if (data.confirmPassword === data.password) {
            registerUserService(data)
        } else {
            alert("las contraseñas no coindicen")
        }
    })

    // Extraer datos del formulario
    // Validar que la contraseña coincida
    // Si coincide crear el usuario

}

registerUser()