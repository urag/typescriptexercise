"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
const express_1 = require("express");
class RestRoutesFactory {
    constructor(restController, urlPrefix) {
        this.router = express_1.Router();
        this.urlPrefix = urlPrefix;
        this.router.get("/", restController.get);
        this.router.get("/:id", restController.getById);
        this.router.post("/", restController.post);
        this.router.put("/:id", restController.put);
        this.router.delete("/:id", restController.delete);
    }
    getRouter() {
        return this.router;
    }
    getUrlPrefix() {
        return this.urlPrefix;
    }
}
exports.RestRoutesFactory = RestRoutesFactory;
//# sourceMappingURL=rest-controller-routes-factory.js.map