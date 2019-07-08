"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_mogno_repo_1 = require("../repositorys/products-mogno-repo");
const validation_utils_1 = require("../../../infrastractures/utils/validation-utils");
const mongo_connection_1 = require("../../../infrastractures/dbconnection/mongo-connection");
class ProductsController {
    constructor() {
        this.get = (req, res, next) => {
            this.asyncGet(req, res, next);
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
            next();
        };
        this.post = (req, res, next) => {
            const product = req.body;
            // Adding only if product with given id is not pressent yeat
            this.productsRepository.save(product);
            res.sendStatus(201);
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
        this.getByCategorieId = (req, res, next) => {
            var categoryId = req.params.id;
            var products = this.productsRepository.findBy(p => p.categoryId === categoryId);
            if (products) {
                res.send(products);
            }
            else {
                res.sendStatus(404);
            }
            next();
        };
        this.productsRepository = new products_mogno_repo_1.ProductsMongoRepository(mongo_connection_1.MongoConnection.db);
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
    asyncGet(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const allProducts = yield this.productsRepository.getAll();
            res.render('products', { products: allProducts });
        });
    }
}
exports.ProductsController = ProductsController;
//# sourceMappingURL=products-controller.js.map