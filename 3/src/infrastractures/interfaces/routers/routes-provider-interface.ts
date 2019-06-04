import { Router } from "express";

export interface IRoutesFactory {
    urlPrefix: string;
    router: Router;

    getRouter(): Router;
    getUrlPrefix(): string;
}