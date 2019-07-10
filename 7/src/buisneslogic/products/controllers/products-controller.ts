import { Request, Response, NextFunction } from "express";
import { Product } from "../models/product";
import { IRestController } from "../../../infrastractures/interfaces/controllers/rest-controller-interface";
import { idValidation, nameValidation } from "../../../infrastractures/utils/validation-utils"
import { getProductDB } from "../repositorys/product-schema-model";
export class ProductsController implements IRestController {

    getValidator(func: Function): Function {
        var map = new Map();
        map.set(this.getById, idValidation);
        map.set(this.delete, idValidation)
       // map.set(this.getByCategorieId, idValidation);
        map.set(this.post, nameValidation)
        map.set(this.put, nameValidation)
        return map.get(func);
    }


    get = (req: Request, res: Response, next: NextFunction) => {
        getProductDB().find({}, "id name categoryId itemsInStock").then(result => {
            res.render('products', { products: result })
        })
    }

    getById = (req: Request, res: Response, next: NextFunction) => {
        var productId: number = req.params.id;
        getProductDB().find({ id: productId }, "id name categoryId itemsInStock").then(product => {

            if (product) {
                res.send(product);
            } else {
                res.sendStatus(404);
            }
            next();
        });
    }

    post = (req: Request, res: Response, next: NextFunction) => {
        const product = req.body as Product;

        const rejected: ((value: import("mongoose").Document) => void | PromiseLike<void>) | null | undefined = rejected => {
            console.log("Duplicate id");
            res.status(400).send("Duplicate key");
            next();
        };
        const accepted: ((reason: any) => void | PromiseLike<void>) | null | undefined = reason => {
            res.sendStatus(201);
            next();
        };

        // Adding only if product with given id is not pressent yeat
        getProductDB().insertMany(product).then(accepted, rejected)
    }

    put = (req: Request, res: Response, next: NextFunction) => {
        var productId: number = req.params.id;
        if (!isNaN(productId)) {
            const productForUpdate = req.body as Product;
            getProductDB().update({ id: productId }, productForUpdate).then(result => {
                let obj: any = result
                if (obj.nModified == 1) {
                    console.log("Update product with id", productId);
                    res.sendStatus(200);
                } else {
                    console.log("Not update product with id", productId);
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
        var productId: number = req.params.id;
        if (!isNaN(productId)) {
            const productForUpdate = req.body as Product;
            getProductDB().deleteOne({ id: productId }).then(result => {
                let obj: any = result
                if (obj.deletedCount > 0) {
                    console.log("Deleted product with id", productId);
                    res.sendStatus(200);
                } else {
                    console.log("Not deleted product with id", productId);
                    res.sendStatus(204);
                }
                next();
            })
        } else {
            res.status(400).send("Id is not a number");
            next();
        }

    }

    getByCategorieId = (req: Request, res: Response, next: NextFunction) => {
        // var categoryId: any = req.params.id;
        // this.productsRepository.findBy(p => p.categoryId === categoryId).then(products => {
        //     if (products) {
        //         res.send(products);
        //     } else {
        //         res.sendStatus(404);
        //     }

        // });

        var categoryIdToSearch: any = req.params.id;
        getProductDB().find({ categoryId: categoryIdToSearch }).then(product => {

            if (product) {
                res.send(product);
            } else {
                res.sendStatus(404);
            }
            next();
        });
    }
}