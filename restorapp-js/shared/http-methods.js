export async function getjs(url, errorMessage) {

    try {

        const response = await fetch(url, {method: "GET"})

        if (!response.ok) {
            throw new Error(`No se ha podido realizar la peticion GET a la url: ${url}`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        alert(errorMessage)
    }

}

export async function postjs(url, body, errorMessage) {

    try {

        const response = await fetch(url, {method: "POST", body:body})

        if (!response.ok) {
            throw new Error(`No se ha podido realizar la peticion POST a la url: ${url}`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        alert(errorMessage)
    }

}

export async function putjs(url, id, body, errorMessage) {

    try {

        const response = await fetch(`${url}/${id}`, {method: "PUT", body:body})

        if (!response.ok) {
            throw new Error(`No se ha podido realizar la peticion PUT a la url: ${url}`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        alert(errorMessage)
    }

}

export async function deletejs(url, id, errorMessage) {

    try {

        const response = await fetch(`${url}/${id}`, {method: "DELETE"})

        if (!response.ok) {
            throw new Error(`No se ha podido realizar la peticion DELETE a la url: ${url}`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        alert(errorMessage)
    }

}