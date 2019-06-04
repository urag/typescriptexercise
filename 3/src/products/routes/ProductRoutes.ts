var express = require('express');
import { Router } from "express";
var router = Router();

import { IRestController } from "../../interfaces/controllers/IRestController";
import { ProductsController } from "../controllers/ProductsController";
import { IRoutesProvider } from "../../interfaces/routers/IRoutesProvider";

export class ProductRoutes implements IRoutesProvider {
    urlPrefix: string = "products";
    router: Router = router;
    productsController: IRestController = new ProductsController();
    
    constructor() {
        router.get("", this.productsController.get);
        router.get(":id", this.productsController.getById);
        router.post(":id", this.productsController.post);
        router.put("", this.productsController.put);
        router.delete(":id");
    }

    getRouter(): Router {
        return router;
    }
    getUrlPrefix(): string {
        return this.urlPrefix;
    }

}
