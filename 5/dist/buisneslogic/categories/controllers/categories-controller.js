"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categories_repo_1 = require("../repositorys/categories-repo");
const validation_utils_1 = require("../../../infrastractures/utils/validation-utils");
class CategoriesController {
    constructor() {
        this.categoriesRepository = new categories_repo_1.CategorieDemeRepository();
        this.get = (req, res, next) => {
            res.send(this.categoriesRepository.getAll());
            next();
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
            if (this.categoriesRepository.getById(categorie.id) == null) {
                if (categorie.name.length >= 3) {
                    this.categoriesRepository.save(categorie);
                    res.sendStatus(201);
                }
                else {
                    res.status(409).send("Name needs to be at least 3 characters");
                }
            }
            else {
                res.status(409).send("Categorie with given id is already present");
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
}
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories-controller.js.map