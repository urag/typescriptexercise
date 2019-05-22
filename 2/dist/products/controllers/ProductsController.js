"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productsrepo_1 = require("../repositorys/productsrepo");
class ProductController {
    constructor(app) {
        this.productsRepository = new productsrepo_1.ProductDemeRepository();
        app.get("/api/products/", (req, res) => res.send(this.productsRepository.getAll()));
        app.get("/api/products/:id", (req, res) => {
            var id = req.params.id;
            if (!isNaN(id)) {
                var product = this.productsRepository.getById(id);
                if (product) {
                    res.send(product);
                }
                else {
                    res.sendStatus(404);
                }
            }
            else {
                res.status(401).send("Id is not a number");
            }
        });
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductsController.js.map