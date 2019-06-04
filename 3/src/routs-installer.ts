import { IRoutesProvider } from "./interfaces/routers/IRoutesProvider";
import { ProductRoutes } from "./products/routes/ProductRoutes";
import { Application } from "express";

export class RouteInstaller {
    private routeProviders: IRoutesProvider[] = [new ProductRoutes()];

    constructor(app: Application) {
        this.routeProviders.forEach(rp => {
            app.use("/api/" + rp.getUrlPrefix(), rp.getRouter());
        });
    }
}