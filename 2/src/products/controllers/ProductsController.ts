import { Application } from "express";
import { ProductDemeRepository } from "../repositorys/productsrepo";
import { Product } from "../models/Product";

export class ProductController {
  private productsRepository: ProductDemeRepository = new ProductDemeRepository();
  constructor(app: Application) {
    app.get("/api/products/", (req, res) =>
      res.send(this.productsRepository.getAll())
    );

    app.get("/api/products/:id", (req, res) => {
      var id: number = req.params.id;
      if (!isNaN(id)) {
        var product = this.productsRepository.getById(id);
        if (product) {
          res.send(product);
        } else {
          res.sendStatus(404);
        }
      } else {
        res.status(401).send("Id is not a number");
      }
    });
  }
}
