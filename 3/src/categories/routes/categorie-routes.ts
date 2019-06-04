var express = require('express');
import { Router } from "express";
var router = Router();

import { IRestController } from "../../interfaces/controllers/rest-controller-interface";
import { IRoutesProvider } from "../../interfaces/routers/routes-provider-interface";
import { CategoriesController } from "../controllers/categories-controller";

export class CategoriesRoutes implements IRoutesProvider {
    urlPrefix: string = "categories";
    router: Router = router;
    categoriesController: IRestController = new CategoriesController();
    
    constructor() {
        router.get("/", this.categoriesController.get);
        router.get("/:id", this.categoriesController.getById);
        router.post("/", this.categoriesController.post);
        router.put("/:id", this.categoriesController.put);
        router.delete("/:id",this.categoriesController.delete);
    }

    getRouter(): Router {
        return router;
    }
    getUrlPrefix(): string {
        return this.urlPrefix;
    }

}