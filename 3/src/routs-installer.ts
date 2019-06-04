import { IRoutesProvider } from "./interfaces/routers/routes-provider-interface";
import { ProductRoutes } from "./products/routes/product-routes";
import { Application } from "express";
import { CategoriesRoutes } from "./categories/routes/categorie-routes";

export class RouteInstaller {
    private routeProviders: IRoutesProvider[] = [new ProductRoutes(), new CategoriesRoutes()];

    constructor(app: Application) {
        this.routeProviders.forEach(rp => {
            app.use("/api/" + rp.getUrlPrefix(), rp.getRouter());
        });
    }
}