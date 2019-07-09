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
        map.set(this.getByCategorieId, idValidation);
        map.set(this.post, nameValidation)
        map.set(this.put, nameValidation)
        return map.get(func);
    }


    get = (req: Request, res: Response, next: NextFunction) => {
        getProductDB().find({},"name categoryId").then(result => {
            res.render('products', { products: result })
        })
    }

    getById = (req: Request, res: Response, next: NextFunction) => {
        var id: number = req.params.id;
        getProductDB().find({}).then(product => {

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
        // Adding only if product with given id is not pressent yeat
        getProductDB().insertMany(product).catch(reason=>{
            console

        });
        res.sendStatus(201);
        next();
    }

    put = (req: Request, res: Response, next: NextFunction) => {
        // var id: number = req.params.id;
        // if (!isNaN(id)) {
        //     var product = this.getById(id);
        //     if (product) {
        //         const productForUpdate = req.body as Product;
        //         productForUpdate.id = id.toString();
        //         DbProduct.insertMany(productForUpdate);
        //         res.send(productForUpdate);
        //     } else {
        //         res.sendStatus(404);
        //     }
        // } else {
        //     res.status(401).send("Id is not a number");
        // }

        next();
    }

    delete = (req: Request, res: Response, next: NextFunction) => {
        // var id: number = req.params.id;
        // if (!isNaN(id)) {
        //     var product = this.productsRepository.getById(id);
        //     if (product) {
        //         this.productsRepository.removeById(id);
        //         res.sendStatus(200);
        //     } else {
        //         res.sendStatus(404);
        //     }
        // } else {
        //     res.status(400).send("Id is not a number");
        // }

        next();
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

        next();
    }
}