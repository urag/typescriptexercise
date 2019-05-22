import { CrudRepository } from "./RepositoryInterfaces";
import { Product } from "../models/Product";

export class ProductDemeRepository implements CrudRepository {
  private static products: Product[] = [
    new Product("A1", "Drinks", "CocaCola", 20),
    new Product("A2", "Electronics", "PS4", 50),
    new Product("A2", "Electronics", "Nokia Phone", 35)
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
