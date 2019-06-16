var express = require('express');
import { Router } from "express";
import { IRestController } from "../interfaces/controllers/rest-controller-interface";
import { IRoutesFactory } from "../interfaces/routers/routes-provider-interface";
import { errorHandler } from "../errors/error-handler";
import { Request, Response, NextFunction } from "express";
import { ProductsController } from "../../buisneslogic/products/controllers/products-controller";

export class ProductsRoutesFactory implements IRoutesFactory {
    urlPrefix: string;
    router: Router = Router();

    constructor(productsController: ProductsController, urlPrefix: string) {
        this.urlPrefix = urlPrefix;
        this.installRoute("/:id/products", productsController, productsController.getByCategorieId, this.router.get);
        this.router.use(errorHandler);
    }

    installRoute(prefix: string, restController: IRestController, handlingFunction: Function, verb: Function) {
        const validatorForFunction = restController.getValidator(handlingFunction);
        if (typeof validatorForFunction !== 'undefined') {
            verb.apply(this.getRouter(), [prefix, validatorForFunction]);
        }

        verb.apply(this.getRouter(), [prefix, async (req: Request, res: Response, next: NextFunction) => {
            try {
                await handlingFunction.apply(restController, [req, res, next]);
            } catch (err) {
                next(err);
            }
        }]);
    }

    getRouter(): Router {
        return this.router;
    }
    getUrlPrefix(): string {
        return this.urlPrefix;
    }

}