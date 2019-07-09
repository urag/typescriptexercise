import { Request, Response, NextFunction, } from "express";
import { ApiError } from "../errors/api_error";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.log('Logging my error', err);
    res.send(err);
}
