import { Request, Response, NextFunction } from "express";

import { IRestController } from "../../../infrastractures/interfaces/controllers/rest-controller-interface";
import { ICrudRepository } from "../../../infrastractures/interfaces/repositorys/crud-repository-interface";

import { Categorie } from "../model/categorie";
import { idValidation, nameValidation } from "../../../infrastractures/utils/validation-utils"
import { CategoriesMongoRepository } from "../repositorys/categories-mogno-repo";
import { MongoConnection } from "../../../infrastractures/dbconnection/mongo-connection"


export class CategoriesController implements IRestController {

    private categoriesRepository: ICrudRepository = new CategoriesMongoRepository(MongoConnection.db);

    getValidator(func: Function): Function {
        var map = new Map();
        map.set(this.getById, idValidation);
        map.set(this.delete, idValidation)
        return map.get(func);
    }



    get = (req: Request, res: Response, next: NextFunction) => {
        this.asyncGet(req, res, next);
    }

    async asyncGet(req: Request, res: Response, next: NextFunction) {
        const allProducts = await this.categoriesRepository.getAll();
        res.render('products', { products: allProducts })
    }
    getById = (req: Request, res: Response, next: NextFunction) => {
        var id: number = req.params.id;

        var categorie = this.categoriesRepository.getById(id);
        if (categorie) {
            res.send(categorie);
        } else {
            throw new Error('{"status":"404","message":"Category not found"}');
        }

        next();
    }

    post = (req: Request, res: Response, next: NextFunction) => {
        const categorie = req.body as Categorie;
        // Adding only if categorie with given id is not pressent yeat
        if (categorie.name.length >= 3) {
            this.categoriesRepository.save(categorie);
            res.sendStatus(201);
        } else {
            res.status(409).send("Name needs to be at least 3 characters");
        }
        next();
    }

    put = (req: Request, res: Response, next: NextFunction) => {
        var id: number = req.params.id;
        if (!isNaN(id)) {
            var categorie = this.categoriesRepository.getById(id);
            if (categorie) {
                const categorieForUpdate = req.body as Categorie;
                if (categorieForUpdate.name.length >= 3) {
                    categorieForUpdate.id = id.toString();
                    this.categoriesRepository.save(categorieForUpdate);
                    res.send(categorieForUpdate);
                } else {
                    res.status(409).send("Name needs to be at least 3 characters");
                }
            } else {
                res.sendStatus(404);
            }
        } else {
            res.status(401).send("Id is not a number");
        }

        next();
    }

    delete = (req: Request, res: Response, next: NextFunction) => {
        var id: number = req.params.id;
        if (!isNaN(id)) {
            var categorie = this.categoriesRepository.getById(id);
            if (categorie) {
                this.categoriesRepository.removeById(id);
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        } else {
            res.status(400).send("Id is not a number");
        }

        next();
    }
}