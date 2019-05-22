import { Application } from "express";
import { ProductDemeRepository } from "../repositorys/productsrepo";

export class ProductController {
  private productsRepository: ProductDemeRepository = new ProductDemeRepository();
  constructor(app: Application) {
    app.get("/api/products/", (req, res) =>
      res.send(this.productsRepository.getAll())
    );
  }
}
