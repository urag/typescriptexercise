import { Request, Response, NextFunction } from "express";

import { IRestController } from "../../../infrastractures/interfaces/controllers/rest-controller-interface";
import { ICrudRepository } from "../../../infrastractures/interfaces/repositorys/crud-repository-interface";

import { Categorie } from "../model/categorie";
import { getCategoiesDB } from "../repositorys/categories-schema-model";

export class CategoriesController implements IRestController {



    getValidator(func: Function): Function {
        var map = new Map();
        return map.get(func);
    }



    get = (req: Request, res: Response, next: NextFunction) => {
        getCategoiesDB().find({}, "id name").then(result => {
            res.render('categories', { categories: result })
        })
    }


    getById = (req: Request, res: Response, next: NextFunction) => {
        var categorieId: number = req.params.id;
        getCategoiesDB().find({ id: categorieId }, "id name").then(categorie => {

            if (categorie) {
                res.send(categorie);
            } else {
                res.sendStatus(404);
            }
            next();
        });
    }

    post = (req: Request, res: Response, next: NextFunction) => {
        const categorie = req.body as Categorie;

        const rejected: ((value: import("mongoose").Document) => void | PromiseLike<void>) | null | undefined = rejected => {
            var objReason:any = rejected;
            console.log( objReason.message);
            res.status(400).send(objReason.message);
            next();
        };
        const accepted: ((reason: any) => void | PromiseLike<void>) | null | undefined = reason => {
            res.sendStatus(201);
            next();
        };

        // Adding only if product with given id is not pressent yeat
        getCategoiesDB().insertMany(categorie).then(accepted, rejected)
    }

    put = (req: Request, res: Response, next: NextFunction) => {
        var categoriesId: number = req.params.id;
        if (!isNaN(categoriesId)) {
            const productForUpdate = req.body as Categorie;
            getCategoiesDB().update({ id: categoriesId }, productForUpdate).then(result => {
                let obj: any = result
                if (obj.nModified == 1) {
                    console.log("Update categorie with id", categoriesId);
                    res.sendStatus(200);
                } else {
                    console.log("Not update categorie with id", categoriesId);
                    res.sendStatus(204);
                }
                next();
            })
        } else {
            res.status(401).send("Id is not a number");
            next();
        }
    }

    delete = (req: Request, res: Response, next: NextFunction) => {
        var categories: number = req.params.id;
        if (!isNaN(categories)) {
            const productForUpdate = req.body as Categorie;
            getCategoiesDB().deleteOne({ id: categories }).then(result => {
                let obj: any = result
                if (obj.deletedCount > 0) {
                    console.log("Deleted categorie with id", categories);
                    res.sendStatus(200);
                } else {
                    console.log("Not deleted categorie with id", categories);
                    res.sendStatus(204);
                }
                next();
            })
        } else {
            res.status(400).send("Id is not a number");
            next();
        }

    }
}