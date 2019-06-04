import { IRoutesProvider } from "./infrastractures/interfaces/routers/routes-provider-interface";
import { ProductRoutes } from "./buisneslogic/products/routes/product-routes";
import { Application } from "express";
import { CategoriesRoutes } from "./buisneslogic/categories/routes/categorie-routes";

export class RouteInstaller {
    private routeProviders: IRoutesProvider[] = [new ProductRoutes(), new CategoriesRoutes()];

    constructor(app: Application) {
        this.routeProviders.forEach(rp => {
            app.use("/api/" + rp.getUrlPrefix(), rp.getRouter());
        });
    }
}