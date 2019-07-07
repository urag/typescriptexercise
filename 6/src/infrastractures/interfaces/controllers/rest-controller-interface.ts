import { Request, Response, NextFunction } from "express";

/**
 * Simple crud repository interface
 */
export interface IRestController {
    get(req: Request, res: Response, next: NextFunction): void;
    getById(req: Request, res: Response, next: NextFunction): void;
    post(req: Request, res: Response, next: NextFunction): void;
    put(req: Request, res: Response, next: NextFunction): void;
    delete(req: Request, res: Response, next: NextFunction): void;
    getValidator(func: Function): Function;
}