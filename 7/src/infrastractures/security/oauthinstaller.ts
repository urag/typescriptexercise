import { UsersDemoRepository } from "../../buisneslogic/users/repositorys/users-repo";
import { ICrudRepository } from "../../infrastractures/interfaces/repositorys/crud-repository-interface";
import { User } from "../../buisneslogic/users/model/user";
import { logger } from "../utils/logger"
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usersRepo: ICrudRepository = new UsersDemoRepository();

export class OauthInstaller {
    constructor() {
        passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password', },
            (email: string, password: string, callback: Function) => {
                const user: User = usersRepo.getById(email)
                logger.info("Validating user:" + user + " of email:" + email);
                if (user && user.passwordMatch(password))
                    callback(null, user, { message: 'succeeded' });
                else {
                    logger.info("User not found")
                    callback(null, false, { message: 'failed' });
                }
            }));

        passport.use(new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
                , secretOrKey: 'theSecret',
            },
            (jwtPayload: User, callback: Function) => callback(null, usersRepo.getById(jwtPayload.email))));
    }
}

