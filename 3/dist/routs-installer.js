"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductRoutes_1 = require("./products/routes/ProductRoutes");
class RouteInstaller {
    constructor(app) {
        this.routeProviders = [new ProductRoutes_1.ProductRoutes()];
        this.routeProviders.forEach(rp => {
            app.use("/api/" + rp.getUrlPrefix(), rp.getRouter());
        });
    }
}
exports.RouteInstaller = RouteInstaller;
//# sourceMappingURL=routs-installer.js.map