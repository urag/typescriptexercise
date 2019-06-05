"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
const express_1 = require("express");
const error_handler_1 = require("../errors/error-handler");
class RestRoutesFactory {
    constructor(restController, urlPrefix) {
        this.router = express_1.Router();
        this.urlPrefix = urlPrefix;
        this.installRoute("/", restController, restController.get, this.router.get);
        this.installRoute("/:id", restController, restController.getById, this.router.get);
        this.installRoute("/", restController, restController.post, this.router.post);
        this.installRoute("/:id", restController, restController.put, this.router.put);
        this.installRoute("/:id", restController, restController.delete, this.router.delete);
        this.router.use(error_handler_1.errorHandler);
    }
    installRoute(prefix, restController, handlingFunction, verb) {
        const validatorForFunction = restController.getValidator(handlingFunction);
        if (typeof validatorForFunction !== 'undefined') {
            verb.apply(this.getRouter(), [prefix, validatorForFunction]);
        }
        verb.apply(this.getRouter(), [prefix, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield handlingFunction.apply(restController, [req, res, next]);
                }
                catch (err) {
                    next(err);
                }
            })]);
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