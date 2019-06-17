import { RouteInstaller } from './routs-installer';
import { logger } from "./infrastractures/utils/logger";
import { NextFunction } from 'connect';
import {  Request, Response } from 'express';
import { User } from './buisneslogic/users/model/user';
// Server bootstrap file
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
app.post("/api/products/", (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;
    if (user.role != 'ADMIN') {
        res.sendStatus(403);
    } else {
        next();
    }
});
new RouteInstaller(app);
export { app };