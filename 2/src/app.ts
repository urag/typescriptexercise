import {ProductController} from "./products/controllers/ProductsController";
// Server bootstrap file
var express = require("express");
var cors = require("cors");
var app = express();
var PORT = 3000;

// Configuring server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

new ProductController(app);
export {app};