import { navigate } from "./navigate.js"

export async function render(htmlPath, typeElement, parentId, jsFile) {


    let parentHtml = document.getElementById(parentId)
    parentHtml.innerHTML = ""

    try {

        const response = await fetch(`pages/${htmlPath}`)

        if (!response.ok) {
            throw new Error("Error al renderizar")
        }

        const html = await response.text()
        const newHtml = document.createElement(typeElement)
        newHtml.innerHTML = html
        parentHtml.appendChild(newHtml)
        await navigate()
        if (jsFile) {
            jsFile.forEach(element => {
                console.log(element)
                var script = document.createElement("script")
                script.src = element
                script.type = "module"
                document.head.appendChild(script)
            });
        }

    } catch (error) {
        console.error(error)
    }
}