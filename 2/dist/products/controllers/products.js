"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductController {
    constructor(app) {
        app.get("/api/products", (req, res) => res.send("Hellow products"));
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=products.js.map