"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categories_controller_1 = require("./buisneslogic/categories/controllers/categories-controller");
const rest_controller_routes_factory_1 = require("./infrastractures/utils/rest-controller-routes-factory");
const products_controller_routes_factory_1 = require("./infrastractures/utils/products-controller-routes-factory");
const products_controller_1 = require("./buisneslogic/products/controllers/products-controller");
class RouteInstaller {
    constructor(app) {
        this.routeProviders = [new rest_controller_routes_factory_1.RestRoutesFactory(new categories_controller_1.CategoriesController(), "categories"), new rest_controller_routes_factory_1.RestRoutesFactory(new products_controller_1.ProductsController(), "products"), new products_controller_routes_factory_1.ProductsRoutesFactory(new products_controller_1.ProductsController(), "categories")];
        this.routeProviders.forEach(rp => {
            const prefix = "/api/" + rp.getUrlPrefix();
            console.log('Installing routes for:', prefix);
            app.use(prefix, rp.getRouter());
        });
    }
}
exports.RouteInstaller = RouteInstaller;
//# sourceMappingURL=routs-installer.js.map