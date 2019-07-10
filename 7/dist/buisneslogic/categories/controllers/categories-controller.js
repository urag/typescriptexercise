"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categories_schema_model_1 = require("../repositorys/categories-schema-model");
class CategoriesController {
    constructor() {
        this.get = (req, res, next) => {
            categories_schema_model_1.getCategoiesDB().find({}, "id name").then(result => {
                res.render('categories', { categories: result });
            });
        };
        this.getById = (req, res, next) => {
            var categorieId = req.params.id;
            categories_schema_model_1.getCategoiesDB().find({ id: categorieId }, "id name").then(categorie => {
                if (categorie) {
                    res.send(categorie);
                }
                else {
                    res.sendStatus(404);
                }
                next();
            });
        };
        this.post = (req, res, next) => {
            const categorie = req.body;
            const rejected = rejected => {
                var objReason = rejected;
                console.log(objReason.message);
                res.status(400).send(objReason.message);
                next();
            };
            const accepted = reason => {
                res.sendStatus(201);
                next();
            };
            // Adding only if product with given id is not pressent yeat
            categories_schema_model_1.getCategoiesDB().insertMany(categorie).then(accepted, rejected);
        };
        this.put = (req, res, next) => {
            var categoriesId = req.params.id;
            if (!isNaN(categoriesId)) {
                const productForUpdate = req.body;
                categories_schema_model_1.getCategoiesDB().update({ id: categoriesId }, productForUpdate).then(result => {
                    let obj = result;
                    if (obj.nModified == 1) {
                        console.log("Update categorie with id", categoriesId);
                        res.sendStatus(200);
                    }
                    else {
                        console.log("Not update categorie with id", categoriesId);
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
            var categories = req.params.id;
            if (!isNaN(categories)) {
                const productForUpdate = req.body;
                categories_schema_model_1.getCategoiesDB().deleteOne({ id: categories }).then(result => {
                    let obj = result;
                    if (obj.deletedCount > 0) {
                        console.log("Deleted categorie with id", categories);
                        res.sendStatus(200);
                    }
                    else {
                        console.log("Not deleted categorie with id", categories);
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
    }
    getValidator(func) {
        var map = new Map();
        return map.get(func);
    }
}
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories-controller.js.map