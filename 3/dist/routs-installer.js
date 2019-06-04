"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_routes_1 = require("./products/routes/product-routes");
class RouteInstaller {
    constructor(app) {
        this.routeProviders = [new product_routes_1.ProductRoutes()];
        this.routeProviders.forEach(rp => {
            app.use("/api/" + rp.getUrlPrefix(), rp.getRouter());
        });
    }
}
exports.RouteInstaller = RouteInstaller;
//# sourceMappingURL=routs-installer.js.map