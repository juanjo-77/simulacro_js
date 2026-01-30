import { getjs, postjs } from "../shared/http-methods.js"
import { User } from "../models/user-model.js";
import { url } from "../shared/enviroment.js";

export async function registerUserService(body) {

    const user = await postjs(`${url}/users`, body, "No se ha podido crear el usuario");
    return user
}

export async function getUserByEmail(email) {

    const user = await getjs(`${url}/users?email=${email}`)
    return user[0]

}