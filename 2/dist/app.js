"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductsController_1 = require("./products/controllers/ProductsController");
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
new ProductsController_1.ProductController(app);
//# sourceMappingURL=app.js.map