import { IRoutesFactory } from "./infrastractures/interfaces/routers/routes-provider-interface";
import { Application } from "express";
import { CategoriesController } from "./buisneslogic/categories/controllers/categories-controller";
import { RestRoutesFactory } from "./infrastractures/utils/rest-controller-routes-factory";
import { ProductsRoutesFactory } from "./infrastractures/utils/products-controller-routes-factory"
import { ProductsController } from "./buisneslogic/products/controllers/products-controller";

export class RouteInstaller {
    private routeProviders: IRoutesFactory[] = [new RestRoutesFactory(new CategoriesController(), "categories"), new RestRoutesFactory(new ProductsController(), "products"),new ProductsRoutesFactory(new ProductsController(), "categories")];

    constructor(app: Application) {
        this.routeProviders.forEach(rp => {
            const prefix = "/api/" + rp.getUrlPrefix();
            console.log('Installing routes for:', prefix)
            app.use(prefix, rp.getRouter());
        });
    }
}