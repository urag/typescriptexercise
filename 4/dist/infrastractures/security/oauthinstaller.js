"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_repo_1 = require("../../buisneslogic/users/repositorys/users-repo");
const logger_1 = require("../utils/logger");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usersRepo = new users_repo_1.UsersDemoRepository();
class OauthInstaller {
    constructor() {
        passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password', }, (email, password, callback) => {
            const user = usersRepo.getById(email);
            logger_1.logger.info("Validating user:" + user + " of email:" + email);
            if (user && user.passwordMatch(password))
                callback(null, user, { message: 'succeeded' });
            else {
                logger_1.logger.info("User not found");
                callback(null, false, { message: 'failed' });
            }
        }));
    }
}
exports.OauthInstaller = OauthInstaller;
//# sourceMappingURL=oauthinstaller.js.map