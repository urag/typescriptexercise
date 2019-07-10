"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_utils_1 = require("../../../infrastractures/utils/validation-utils");
const product_schema_model_1 = require("../repositorys/product-schema-model");
const categories_schema_model_1 = require("../../categories/repositorys/categories-schema-model");
class ProductsController {
    constructor() {
        this.get = (req, res, next) => {
            product_schema_model_1.getProductDB().find({}, "id name categoryId itemsInStock").then(result => {
                res.render('products', { products: result });
            });
        };
        this.getById = (req, res, next) => {
            var productId = req.params.id;
            product_schema_model_1.getProductDB().find({ id: productId }, "id name categoryId itemsInStock").then(product => {
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
            const rejected = rejected => {
                console.log("Duplicate id");
                res.status(400).send("Duplicate key");
                next();
            };
            const accepted = reason => {
                res.sendStatus(201);
                next();
            };
            const categorieIdIsFineHandler = categorieFound => {
                if (categorieFound.length == 1) {
                    // Adding only if product with given id is not pressent yeat
                    product_schema_model_1.getProductDB().insertMany(product).then(accepted, rejected);
                }
                else {
                    res.status(404).send("Categorie with id " + product.categoryId + " does not exists");
                    next();
                }
            };
            const categorieIdWrong = err => {
                res.status(404).send(product.categoryId + " cannot be a categorie id");
                next();
            };
            categories_schema_model_1.getCategoiesDB().find({ id: product.categoryId }).then(categorieIdIsFineHandler, categorieIdWrong);
        };
        this.put = (req, res, next) => {
            var productId = req.params.id;
            if (!isNaN(productId)) {
                const productForUpdate = req.body;
                product_schema_model_1.getProductDB().update({ id: productId }, productForUpdate).then(result => {
                    let obj = result;
                    if (obj.nModified == 1) {
                        console.log("Update product with id", productId);
                        res.sendStatus(200);
                    }
                    else {
                        console.log("Not update product with id", productId);
                        res.sendStatus(204);
                    }
                    next();
                });
            }
            else {
                res.status(401).send("Id is not a number");
                next();
            }
        };
        this.delete = (req, res, next) => {
            var productId = req.params.id;
            if (!isNaN(productId)) {
                const productForUpdate = req.body;
                product_schema_model_1.getProductDB().deleteOne({ id: productId }).then(result => {
                    let obj = result;
                    if (obj.deletedCount > 0) {
                        console.log("Deleted product with id", productId);
                        res.sendStatus(200);
                    }
                    else {
                        console.log("Not deleted product with id", productId);
                        res.sendStatus(204);
                    }
                    next();
                });
            }
            else {
                res.status(400).send("Id is not a number");
                next();
            }
        };
        this.getByCategorieId = (req, res, next) => {
            var categoryIdToSearch = req.params.id;
            product_schema_model_1.getProductDB().find({ categoryId: categoryIdToSearch }).then(product => {
                if (product) {
                    res.send(product);
                }
                else {
                    res.sendStatus(404);
                }
                next();
            });
        };
    }
    getValidator(func) {
        var map = new Map();
        map.set(this.getById, validation_utils_1.idValidation);
        map.set(this.delete, validation_utils_1.idValidation);
        // map.set(this.getByCategorieId, idValidation);
        map.set(this.post, validation_utils_1.nameValidation);
        map.set(this.put, validation_utils_1.nameValidation);
        return map.get(func);
    }
}
exports.ProductsController = ProductsController;
//# sourceMappingURL=products-controller.js.map