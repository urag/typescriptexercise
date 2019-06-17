const bcrypt = require('bcrypt');

export class User {
    email: string;
    password: string;
    role: string;

    constructor(email: string, password: string, role: string) {
        this.email = email;
        this.password = "";
        var salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(password, salt);
        this.role = role;
    }


    passwordMatch = (password: string) => {
        return bcrypt.compareSync(password, this.password);
    }
}