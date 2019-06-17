"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
class User {
    constructor(email, password) {
        this.passwordMatch = (password) => {
            return bcrypt.compareSync(password, this.encryptedPassword);
        };
        this.email = email;
        this.encryptedPassword = "";
        var salt = bcrypt.genSaltSync(10);
        this.encryptedPassword = bcrypt.hashSync(password, salt);
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map