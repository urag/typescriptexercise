"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
class ProductDemeRepository {
    save(obj) {
        var product = this.getById(obj.id);
        if (product) {
            console.log("Changing %s to %s", product, obj);
            product.categoryId = obj.categoryId;
            product.name = obj.name;
            product.itemsInStock = obj.itemsInStock;
        }
        else {
            ProductDemeRepository.products.push(obj);
            console.log("Added %s to repository", obj);
            product = obj;
        }
        return product;
    }
    getById(id) {
        return ProductDemeRepository.products.find(p => p.id === id);
    }
    getAll() {
        return ProductDemeRepository.products;
    }
    removeById(id) {
        var product = this.getById(id);
        if (product) {
            console.log("Removing %s", product);
            ProductDemeRepository.products = ProductDemeRepository.products.filter((val, index, arr) => {
                return val.id !== id;
            });
        }
    }
}
ProductDemeRepository.products = [
    new product_1.Product("132423", "Drinks", "CocaCola", 20),
    new product_1.Product("23432", "Electronics", "PS4", 50),
    new product_1.Product("32342", "Electronics", "Nokia Phone", 35)
];
exports.ProductDemeRepository = ProductDemeRepository;
//# sourceMappingURL=products-repo.js.map