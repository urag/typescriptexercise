"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
const express_1 = require("express");
var router = express_1.Router();
const categories_controller_1 = require("../controllers/categories-controller");
class CategoriesRoutes {
    constructor() {
        this.urlPrefix = "categories";
        this.router = router;
        this.categoriesController = new categories_controller_1.CategoriesController();
        router.get("/", this.categoriesController.get);
        router.get("/:id", this.categoriesController.getById);
        router.post("/", this.categoriesController.post);
        router.put("/:id", this.categoriesController.put);
        router.delete("/:id", this.categoriesController.delete);
    }
    getRouter() {
        return router;
    }
    getUrlPrefix() {
        return this.urlPrefix;
    }
}
exports.CategoriesRoutes = CategoriesRoutes;
//# sourceMappingURL=categorie-routes.js.map