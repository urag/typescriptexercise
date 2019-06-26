import { RouteInstaller } from './routs-installer';
import { logger } from "./infrastractures/utils/logger";
import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import { User } from './buisneslogic/users/model/user';
import { schema } from "./infrastractures/utils/validator"

const Joi = require('joi');
var express = require("express");
var cors = require("cors");
var app = express();
const passport = require('passport');


var login = require('./infrastractures/security/login-route');
var PORT = 3000;

// Configuring server
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(req.method + " " + req.url + " body:" + JSON.stringify(req.body, null, 4));
    next();
});
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(login.router);
app.use("/api/products/", passport.authenticate('jwt', { session: false }));



const adminValidation = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;
    if (user.role != 'ADMIN') {
        res.sendStatus(403);
    }
    else {
        next();
    }
};
app.post("/api/products/", adminValidation);
app.put("/api/products/", adminValidation);

const productValidate = (req: Request, res: Response, next: NextFunction) => {
    const result = Joi.validate(req.body, schema);
    if(result.error){
        throw new Error(result.error.message);
    }
    next();
};
app.post("/api/products/", productValidate);
app.put("/api/products/", productValidate);

new RouteInstaller(app);
export { app };