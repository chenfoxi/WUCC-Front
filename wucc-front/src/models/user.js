export default class User {
    constructor(username, firstname, lastname,
                email, gender, description, password) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.description = description
    }
}
