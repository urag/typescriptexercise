const bcrypt = require('bcrypt');

export class User {
    email: string;
    encryptedPassword: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.encryptedPassword = "";
        var salt = bcrypt.genSaltSync(10);
        this.encryptedPassword = bcrypt.hashSync(password, salt);
    }


    passwordMatch = (password: string) => {
        return bcrypt.compareSync(password, this.encryptedPassword);
    }
}