import { getUserByEmail } from "../services/user-service.js"
import { render } from "../shared/render.js"

const form = document.getElementById("form-login")

export async function loginUser() {

    // Escuchar evento de submit
    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        const userInDb = await getUserByEmail(form.email.value)
        console.log(userInDb)

        if (userInDb.password == form.password.value) {
            sessionStorage.setItem("isLogin", true)
            sessionStorage.setItem("typeUser", userInDb.type)
            render("dashboard-admin.html", "div", "app")
        } else {
            alert("La contraseña no es la correcta")
        }
    })

}

loginUser()