"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
class ProductDemeRepository {
    constructor() {
        http.get('http://127.0.0.1:3000/static/products.json', (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                ProductDemeRepository.products = JSON.parse(data);
                console.log("Got products from static file ", ProductDemeRepository.products);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
    findBy(predicate) {
        return ProductDemeRepository.products.filter(predicate);
    }
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
exports.ProductDemeRepository = ProductDemeRepository;
//# sourceMappingURL=products-repo.js.map