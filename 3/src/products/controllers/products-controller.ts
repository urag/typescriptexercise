import { Request, Response, NextFunction } from "express";
import { ProductDemeRepository } from "../repositorys/products-repo";
import { Product } from "../models/product";
import { IRestController } from "../../interfaces/controllers/rest-controller-interface";
import { ICrudRepository } from "../../interfaces/repositorys/crud-repository-interface";


export class ProductsController implements IRestController {

    private productsRepository: ICrudRepository = new ProductDemeRepository();

    get = (req: Request, res: Response, next: NextFunction) => {
        res.send(this.productsRepository.getAll())
        next();
    }

    getById = (req: Request, res: Response, next: NextFunction) => {
        var id: number = req.params.id;
        if (!isNaN(id)) {
            var product = this.productsRepository.getById(id);
            if (product) {
                res.send(product);
            } else {
                res.sendStatus(404);
            }
        } else {
            res.status(401).send("Id is not a number");
        }
        next();
    }

    post = (req: Request, res: Response, next: NextFunction) => {
        const product = req.body as Product;
        // Adding only if product with given id is not pressent yeat
        if (this.productsRepository.getById(product.id) == null) {
            if (product.name.length >= 3) {
                this.productsRepository.save(product);
                res.sendStatus(201);
            } else {
                res.status(409).send("Name needs to be at least 3 characters");
            }
        } else {
            res.status(409).send("Product with given id is already present");
        }
        next();
    }

    put = (req: Request, res: Response, next: NextFunction) => {
        var id: number = req.params.id;
        if (!isNaN(id)) {
            var product = this.productsRepository.getById(id);
            if (product) {
                const productForUpdate = req.body as Product;
                if (productForUpdate.name.length >= 3) {
                    productForUpdate.id = id.toString();
                    this.productsRepository.save(productForUpdate);
                    res.send(productForUpdate);
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
}