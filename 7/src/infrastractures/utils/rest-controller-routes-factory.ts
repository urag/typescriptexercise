var express = require('express');
import { Router } from "express";
import { IRestController } from "../interfaces/controllers/rest-controller-interface";
import { IRoutesFactory } from "../interfaces/routers/routes-provider-interface";
import { errorHandler } from "../errors/error-handler";
import { resolve } from "path";
import { Request, Response, NextFunction } from "express";

export class RestRoutesFactory implements IRoutesFactory {
    urlPrefix: string;
    router: Router = Router();

    constructor(restController: IRestController, urlPrefix: string) {
        this.urlPrefix = urlPrefix;
        this.installRoute("/", restController, restController.get, this.router.get);
        this.installRoute("/:id", restController, restController.getById, this.router.get);
        this.installRoute("/", restController, restController.post, this.router.post);
        this.installRoute("/:id", restController, restController.put, this.router.put);
        this.installRoute("/:id", restController, restController.delete, this.router.delete);
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