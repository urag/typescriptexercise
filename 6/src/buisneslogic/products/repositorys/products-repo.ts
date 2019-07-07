import { ICrudRepository } from "../../../infrastractures/interfaces/repositorys/crud-repository-interface";
import { Product } from "../models/product";
import { Response } from "express-serve-static-core";
import { Db, Collection, MongoClient } from "mongodb";
import { DB_CONNECTION_URI } from "../../../infrastractures/config/config";

const http = require('http');


export class ProductDemeRepository implements ICrudRepository {
  private static products: Collection;

  constructor() {
    this.connect(DB_CONNECTION_URI + "/store");
  }

  public async connect(url: string): Promise<void> {
    var client: MongoClient = await MongoClient.connect(
      url, { useNewUrlParser: true },
    );
    var db: Db = client.db();
    ProductDemeRepository.products = db.collection("products");
  }

  findBy(predicate: (value: any, index: number, obj: any[]) => boolean): any[] {
    throw new Error("Not implmented");
  }

  save(obj: Product): Product | undefined {
    var product = this.getById(obj.id);

    if (product) {
      console.log("Changing %s to %s", product, obj);
      product.categoryId = obj.categoryId;
      product.name = obj.name;
      product.itemsInStock = obj.itemsInStock;
    } else {
      ProductDemeRepository.products.insert(obj);
      console.log("Added %s to repository", obj);
      product = obj;
    }
    return product;
  }

  getById(id: any): Product | undefined {
    throw new Error("Not implmented");
  }

  getAll(): any[] {
    var result: any[] = [];
    ProductDemeRepository.products.find({}, undefined).toArray((err, funcResult) => {
      console.log(funcResult);
    })
    return result;
  }


  removeById(id: any) {
    var product = this.getById(id);
    if (product) {
      console.log("Removing %s", product);
      throw new Error("Not implmented");
    }
  }
}
