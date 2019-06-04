var express = require('express');
import { Router } from "express";
var router = Router();

import { IRestController } from "../../../infrastractures/interfaces/controllers/rest-controller-interface";
import { ProductsController } from "../controllers/products-controller";
import { IRoutesProvider } from "../../../infrastractures/interfaces/routers/routes-provider-interface";

export class ProductRoutes implements IRoutesProvider {
    urlPrefix: string = "products";
    router: Router = router;
    productsController: IRestController = new ProductsController();
    
    constructor() {
        router.get("/", this.productsController.get);
        router.get("/:id", this.productsController.getById);
        router.post("/", this.productsController.post);
        router.put("/:id", this.productsController.put);
        router.delete("/:id",this.productsController.delete);
    }

    getRouter(): Router {
        return router;
    }
    getUrlPrefix(): string {
        return this.urlPrefix;
    }

}
