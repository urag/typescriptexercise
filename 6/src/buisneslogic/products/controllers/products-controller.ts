import { Request, Response, NextFunction } from "express";
import { ProductsMongoRepository } from "../repositorys/products-mogno-repo";
import { Product } from "../models/product";
import { IRestController } from "../../../infrastractures/interfaces/controllers/rest-controller-interface";
import { ICrudRepository } from "../../../infrastractures/interfaces/repositorys/crud-repository-interface";
import { idValidation, nameValidation } from "../../../infrastractures/utils/validation-utils"
import { MongoConnection } from "../../../infrastractures/dbconnection/mongo-connection"

export class ProductsController implements IRestController {

    private productsRepository: ICrudRepository;

    constructor() {
        this.productsRepository = new ProductsMongoRepository(MongoConnection.db);
    }

    getValidator(func: Function): Function {
        var map = new Map();
        map.set(this.getById, idValidation);
        map.set(this.delete, idValidation)
        map.set(this.getByCategorieId, idValidation);
        map.set(this.post, nameValidation)
        map.set(this.put, nameValidation)
        return map.get(func);
    }


    get = (req: Request, res: Response, next: NextFunction) => {
        this.asyncGet(req, res, next);
    }

    async asyncGet(req: Request, res: Response, next: NextFunction) {
        const allProducts = await this.productsRepository.getAll();
        res.render('products', { products: allProducts })
    }

    getById = (req: Request, res: Response, next: NextFunction) => {
        var id: number = req.params.id;

        var product = this.productsRepository.getById(id);
        if (product) {
            res.send(product);
        } else {
            res.sendStatus(404);
        }
        next();
    }

    post = (req: Request, res: Response, next: NextFunction) => {
        const product = req.body as Product;
        // Adding only if product with given id is not pressent yeat
        this.productsRepository.save(product);
        res.sendStatus(201);
        next();
    }

    put = (req: Request, res: Response, next: NextFunction) => {
        var id: number = req.params.id;
        if (!isNaN(id)) {
            var product = this.productsRepository.getById(id);
            if (product) {
                const productForUpdate = req.body as Product;
                productForUpdate.id = id.toString();
                this.productsRepository.save(productForUpdate);
                res.send(productForUpdate);
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
            var product = this.productsRepository.getById(id);
            if (product) {
                this.productsRepository.removeById(id);
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        } else {
            res.status(400).send("Id is not a number");
        }

        next();
    }

    getByCategorieId = (req: Request, res: Response, next: NextFunction) => {
        var categoryId: any = req.params.id;
        var products = this.productsRepository.findBy(p => p.categoryId === categoryId);
        if (products) {
            res.send(products);
        } else {
            res.sendStatus(404);
        }


        next();
    }
}