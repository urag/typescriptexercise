"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
const express_1 = require("express");
var router = express_1.Router();
const ProductsController_1 = require("../controllers/ProductsController");
class ProductRoutes {
    constructor() {
        this.urlPrefix = "products";
        this.router = router;
        this.productsController = new ProductsController_1.ProductsController();
        router.get("", this.productsController.get);
        router.get(":id", this.productsController.getById);
        router.post(":id", this.productsController.post);
        router.put("", this.productsController.put);
        router.delete(":id");
    }
    getRouter() {
        return router;
    }
    getUrlPrefix() {
        return this.urlPrefix;
    }
}
exports.ProductRoutes = ProductRoutes;
//# sourceMappingURL=ProductRoutes.js.map