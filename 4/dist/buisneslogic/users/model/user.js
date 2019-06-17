"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require('bcrypt');
class User {
    constructor(email, password, role) {
        this.passwordMatch = (password) => {
            return bcrypt.compareSync(password, this.password);
        };
        this.email = email;
        this.password = "";
        var salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(password, salt);
        this.role = role;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map