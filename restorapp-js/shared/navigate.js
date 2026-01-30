import { render } from "./render.js"

export async function navigate() {

    const btnNavigate = document.querySelector(".btn-navigator")
    const routes = [
        {
            path: "login.html",
            js: [
                "js/login.js"
            ],
            type: "allow"
        },
        {
            path: "register.html",
            js: [
                "js/register-user.js",
            ],
            type: "allow"
        },
        {
            path: "dashboard-admin.html",
            js: [],
            type: "admin"
        }
    ]

    btnNavigate.addEventListener("click", (event) => {
        const route = event.target.dataset.route
        const isLogin = sessionStorage.getItem("isLogin") || false
        const typeUser = sessionStorage.getItem("typeUser") || "user"
        const selectedRoute = routes.find(actRoute => actRoute.path == route)
        localStorage.setItem("lastRoute", route)

        if (!isLogin && routes.filter(route => route.type == "allow").find(actRoute => actRoute.path == route)) {
            render(`pages/${route}`, "div", "app", selectedRoute.js)
        } else if (isLogin) {
            if (typeUser === "admin" && routes.filter(route => route.type == "admin").find(actRoute => actRoute.path == route)) {
                render(`pages/${route}`, "div", "app", selectedRoute.js)
            } else if (typeUser === "user" && routes.filter(route => route.type == "user").find(actRoute => actRoute.path == route)) {
                render(`pages/${route}`, "div", "app", selectedRoute.js)
            } else {
                alert("No tiene los permisos adecuado para la app")
            }

        } else {
            alert("No tiene permisos para entrar a la aplicación")
        }
    })

}