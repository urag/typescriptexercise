import { RouteInstaller } from './routs-installer';
import { logger } from "./infrastractures/utils/logger";
import { NextFunction } from 'connect';
// Server bootstrap file
var express = require("express");
var cors = require("cors");
var app = express();

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


new RouteInstaller(app);
app.use(login.router);
export { app };