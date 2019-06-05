"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_repo_1 = require("../repositorys/products-repo");
const validation_utils_1 = require("../../../infrastractures/utils/validation-utils");
class ProductsController {
    constructor() {
        this.productsRepository = new products_repo_1.ProductDemeRepository();
        this.get = (req, res, next) => {
            res.send(this.productsRepository.getAll());
            next();
        };
        this.getById = (req, res, next) => {
            var id = req.params.id;
            var product = this.productsRepository.getById(id);
            if (product) {
                res.send(product);
            }
            else {
                res.sendStatus(404);
            }
            throw new Error('{"status":"404","message":"Product not found"}');
            next();
        };
        this.post = (req, res, next) => {
            const product = req.body;
            // Adding only if product with given id is not pressent yeat
            if (this.productsRepository.getById(product.id) == null) {
                this.productsRepository.save(product);
                res.sendStatus(201);
            }
            else {
                res.status(409).send("Product with given id is already present");
            }
            next();
        };
        this.put = (req, res, next) => {
            var id = req.params.id;
            if (!isNaN(id)) {
                var product = this.productsRepository.getById(id);
                if (product) {
                    const productForUpdate = req.body;
                    productForUpdate.id = id.toString();
                    this.productsRepository.save(productForUpdate);
                    res.send(productForUpdate);
                }
                else {
                    res.sendStatus(404);
                }
            }
            else {
                res.status(401).send("Id is not a number");
            }
            next();
        };
        this.delete = (req, res, next) => {
            var id = req.params.id;
            if (!isNaN(id)) {
                var product = this.productsRepository.getById(id);
                if (product) {
                    this.productsRepository.removeById(id);
                    res.sendStatus(200);
                }
                else {
                    res.sendStatus(404);
                }
            }
            else {
                res.status(400).send("Id is not a number");
            }
            next();
        };
    }
    getValidator(func) {
        var map = new Map();
        map.set(this.getById, validation_utils_1.idValidation);
        map.set(this.delete, validation_utils_1.idValidation);
        map.set(this.post, validation_utils_1.nameValidation);
        map.set(this.put, validation_utils_1.nameValidation);
        return map.get(func);
    }
}
exports.ProductsController = ProductsController;
//# sourceMappingURL=products-controller.js.map