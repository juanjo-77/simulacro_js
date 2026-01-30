import { render } from "./shared/render.js"
import { navigate } from "./shared/navigate.js"

async function main() {
    await render("login.html", "div", "app", ["js/login-user.js"])
}

main()