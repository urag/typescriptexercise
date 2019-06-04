import { ICrudRepository } from "../../interfaces/repositorys/crud-repository-interface";
import { Product } from "../models/product";

export class ProductDemeRepository implements ICrudRepository {
  private static products: Product[] = [
    new Product("132423", "Drinks", "CocaCola", 20),
    new Product("23432", "Electronics", "PS4", 50),
    new Product("32342", "Electronics", "Nokia Phone", 35)
  ];

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
