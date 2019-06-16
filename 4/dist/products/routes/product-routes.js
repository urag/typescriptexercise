"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
const express_1 = require("express");
var router = express_1.Router();
const products_controller_1 = require("../controllers/products-controller");
class ProductRoutes {
    constructor() {
        this.urlPrefix = "products";
        this.router = router;
        this.productsController = new products_controller_1.ProductsController();
        router.get("/", this.productsController.get);
        router.get("/:id", this.productsController.getById);
        router.post("/", this.productsController.post);
        router.put("/:id", this.productsController.put);
        router.delete("/:id", this.productsController.delete);
    }
    getRouter() {
        return router;
    }
    getUrlPrefix() {
        return this.urlPrefix;
    }
}
exports.ProductRoutes = ProductRoutes;
//# sourceMappingURL=product-routes.js.map