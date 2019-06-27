import { ICrudRepository } from "../../../infrastractures/interfaces/repositorys/crud-repository-interface";
import { Product } from "../models/product";
import { Response } from "express-serve-static-core";
const http = require('http');

export class ProductDemeRepository implements ICrudRepository {
  private static products: Product[];

  constructor() {
    http.get('http://127.0.0.1:3000/static/products.json', (resp: Response) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk: any) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        ProductDemeRepository.products = JSON.parse(data);
        console.log("Got products from static file ", ProductDemeRepository.products);
      });

    }).on("error", (err: Error) => {
      console.log("Error: " + err.message);
    });
  }

  findBy(predicate: (value: any, index: number, obj: any[]) => boolean): any[] {
    return ProductDemeRepository.products.filter(predicate);
  }

  save(obj: Product): Product | undefined {
    var product = this.getById(obj.id);

    if (product) {
      console.log("Changing %s to %s", product, obj);
      product.categoryId = obj.categoryId;
      product.name = obj.name;
      product.itemsInStock = obj.itemsInStock;
    } else {
      ProductDemeRepository.products.push(obj);
      console.log("Added %s to repository", obj);
      product = obj;
    }
    return product;
  }

  getById(id: any): Product | undefined {
    return ProductDemeRepository.products.find(p => p.id === id);
  }

  getAll(): any[] {
    return ProductDemeRepository.products;
  }

  removeById(id: any) {
    var product = this.getById(id);
    if (product) {
      console.log("Removing %s", product);
      ProductDemeRepository.products = ProductDemeRepository.products.filter(
        (val, index, arr) => {
          return val.id !== id;
        }
      );
    }
  }
}
