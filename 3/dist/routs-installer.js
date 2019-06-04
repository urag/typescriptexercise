"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_routes_1 = require("./buisneslogic/products/routes/product-routes");
const categorie_routes_1 = require("./buisneslogic/categories/routes/categorie-routes");
class RouteInstaller {
    constructor(app) {
        this.routeProviders = [new product_routes_1.ProductRoutes(), new categorie_routes_1.CategoriesRoutes()];
        this.routeProviders.forEach(rp => {
            app.use("/api/" + rp.getUrlPrefix(), rp.getRouter());
        });
    }
}
exports.RouteInstaller = RouteInstaller;
//# sourceMappingURL=routs-installer.js.map