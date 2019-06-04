var express = require('express');
import { Router } from "express";
import { IRestController } from "../interfaces/controllers/rest-controller-interface";
import { IRoutesFactory } from "../interfaces/routers/routes-provider-interface";

export class RestRoutesFactory implements IRoutesFactory {
    urlPrefix: string;
    router: Router = Router();

    constructor(restController: IRestController, urlPrefix: string) {
        this.urlPrefix = urlPrefix;
        this.router.get("/", restController.get);
        this.router.get("/:id", restController.getById);
        this.router.post("/", restController.post);
        this.router.put("/:id", restController.put);
        this.router.delete("/:id", restController.delete);
    }

    getRouter(): Router {
        return this.router;
    }
    getUrlPrefix(): string {
        return this.urlPrefix;
    }

}