import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/api_error";

export function idValidation(req: Request, res: Response, next: NextFunction) {
    var id: number = req.params.id;

    if (typeof id !== 'undefined') {
        if (isNaN(id)) {
            throw new ApiError(400, "Id is not a number");
        }
    } else {
        console.log('Id is undefined for METHOD:%s and body:%s', req.method, req.body);
    }
    next();
}


export function nameValidation(req: Request, res: Response, next: NextFunction) {
    const name = req.body.name;
    if (typeof name !== 'undefined') {
        if (name.length < 3) {
            throw new ApiError(400, "Name needs to be at least 3 characters");
        }
    } else {
        console.log('Name is undefined for METHOD:%s and body:%s', req.method, req.body);
    }

    next();
}