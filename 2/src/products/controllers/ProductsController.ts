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

    
    app.post("/api/products", (req, res) => {
      const product = req.body as Product;
      // Adding only if product with given id is not pressent yeat
      if (this.productsRepository.getById(product.id) == null) {
        if (product.name.length >= 3) {
          this.productsRepository.save(product);
          res.sendStatus(201);
        } else {
          res.status(409).send("Name needs to be at least 3 characters");
        }
      } else {
        res.status(409).send("Product with given id is already present");
      }
    });

    app.put("/api/products/:id", (req, res) => {
      var id: number = req.params.id;
      if (!isNaN(id)) {
        var product = this.productsRepository.getById(id);
        if (product) {
          const productForUpdate = req.body as Product;
          if (productForUpdate.name.length >= 3) {
            productForUpdate.id = id.toString();
            this.productsRepository.save(productForUpdate);
            res.send(productForUpdate);
          } else {
            res.status(409).send("Name needs to be at least 3 characters");
          }
        } else {
          res.sendStatus(404);
        }
      } else {
        res.status(401).send("Id is not a number");
      }
    });

    app.delete("/api/products/:id", (req, res) => {
      var id: number = req.params.id;
      if (!isNaN(id)) {
        var product = this.productsRepository.getById(id);
        if (product) {
          this.productsRepository.removeById(id);
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      } else {
        res.status(400).send("Id is not a number");
      }
    });
  }
}
