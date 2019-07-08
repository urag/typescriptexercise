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
const validation_utils_1 = require("../../../infrastractures/utils/validation-utils");
const categories_mogno_repo_1 = require("../repositorys/categories-mogno-repo");
const mongo_connection_1 = require("../../../infrastractures/dbconnection/mongo-connection");
class CategoriesController {
    constructor() {
        this.categoriesRepository = new categories_mogno_repo_1.CategoriesMongoRepository(mongo_connection_1.MongoConnection.db);
        this.get = (req, res, next) => {
            this.asyncGet(req, res, next);
        };
        this.getById = (req, res, next) => {
            var id = req.params.id;
            var categorie = this.categoriesRepository.getById(id);
            if (categorie) {
                res.send(categorie);
            }
            else {
                throw new Error('{"status":"404","message":"Category not found"}');
            }
            next();
        };
        this.post = (req, res, next) => {
            const categorie = req.body;
            // Adding only if categorie with given id is not pressent yeat
            if (categorie.name.length >= 3) {
                this.categoriesRepository.save(categorie);
                res.sendStatus(201);
            }
            else {
                res.status(409).send("Name needs to be at least 3 characters");
            }
            next();
        };
        this.put = (req, res, next) => {
            var id = req.params.id;
            if (!isNaN(id)) {
                var categorie = this.categoriesRepository.getById(id);
                if (categorie) {
                    const categorieForUpdate = req.body;
                    if (categorieForUpdate.name.length >= 3) {
                        categorieForUpdate.id = id.toString();
                        this.categoriesRepository.save(categorieForUpdate);
                        res.send(categorieForUpdate);
                    }
                    else {
                        res.status(409).send("Name needs to be at least 3 characters");
                    }
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
                var categorie = this.categoriesRepository.getById(id);
                if (categorie) {
                    this.categoriesRepository.removeById(id);
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
        return map.get(func);
    }
    asyncGet(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const allProducts = yield this.categoriesRepository.getAll();
            res.render('products', { products: allProducts });
        });
    }
}
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories-controller.js.map