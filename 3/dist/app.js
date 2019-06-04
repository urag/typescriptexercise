"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routs_installer_1 = require("./routs-installer");
// Server bootstrap file
var express = require("express");
var cors = require("cors");
var app = express();
exports.app = app;
var PORT = 3000;
// Configuring server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
new routs_installer_1.RouteInstaller(app);
//# sourceMappingURL=app.js.map