"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("./products/controllers/products");
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
new products_1.ProductController(app);
//# sourceMappingURL=app.js.map