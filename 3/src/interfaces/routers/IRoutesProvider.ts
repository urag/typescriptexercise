import { Router } from "express";

export interface IRoutesProvider {
    urlPrefix: string;
    router: Router;

    getRouter(): Router;
    getUrlPrefix(): string;
}