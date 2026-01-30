export function getDataFromForm(idForm) {
    let data = {}
    const form = document.getElementById(idForm)

    Array.from(form).forEach(input => {
        if (input.id == "") {
            return
        }
        data[input.id] = input.value
    })

    return JSON.stringify(data)
}