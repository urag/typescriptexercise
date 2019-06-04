import { IRoutesProvider } from "./interfaces/routers/routes-provider-interface";
import { ProductRoutes } from "./products/routes/product-routes";
import { Application } from "express";

export class RouteInstaller {
    private routeProviders: IRoutesProvider[] = [new ProductRoutes()];

    constructor(app: Application) {
        this.routeProviders.forEach(rp => {
            app.use("/api/" + rp.getUrlPrefix(), rp.getRouter());
        });
    }
}