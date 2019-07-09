"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_utils_1 = require("../../../infrastractures/utils/validation-utils");
const product_schema_model_1 = require("../repositorys/product-schema-model");
class ProductsController {
    constructor() {
        this.get = (req, res, next) => {
            product_schema_model_1.getProductDB().find({}, "name categoryId").then(result => {
                res.render('products', { products: result });
            });
        };
        this.getById = (req, res, next) => {
            var id = req.params.id;
            product_schema_model_1.getProductDB().find({}).then(product => {
                if (product) {
                    res.send(product);
                }
                else {
                    res.sendStatus(404);
                }
                next();
            });
        };
        this.post = (req, res, next) => {
            const product = req.body;
            // Adding only if product with given id is not pressent yeat
            product_schema_model_1.getProductDB().insertMany(product).catch(reason => {
                console;
            });
            res.sendStatus(201);
            next();
        };
        this.put = (req, res, next) => {
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
        };
        this.delete = (req, res, next) => {
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
        };
        this.getByCategorieId = (req, res, next) => {
            // var categoryId: any = req.params.id;
            // this.productsRepository.findBy(p => p.categoryId === categoryId).then(products => {
            //     if (products) {
            //         res.send(products);
            //     } else {
            //         res.sendStatus(404);
            //     }
            // });
            next();
        };
    }
    getValidator(func) {
        var map = new Map();
        map.set(this.getById, validation_utils_1.idValidation);
        map.set(this.delete, validation_utils_1.idValidation);
        map.set(this.getByCategorieId, validation_utils_1.idValidation);
        map.set(this.post, validation_utils_1.nameValidation);
        map.set(this.put, validation_utils_1.nameValidation);
        return map.get(func);
    }
}
exports.ProductsController = ProductsController;
//# sourceMappingURL=products-controller.js.map