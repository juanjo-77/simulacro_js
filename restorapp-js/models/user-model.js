export class User {
    name
    email
    password
    is_admin

    constructor(name, email, password, is_admin) {
        this.name = name
        this.email = email
        this.password = password
        this.is_admin = is_admin
    }

}