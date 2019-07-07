"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const config_1 = require("../../../infrastractures/config/config");
const http = require('http');
class ProductDemeRepository {
    constructor() {
        this.connect(config_1.DB_CONNECTION_URI + "/store");
    }
    connect(url) {
        return __awaiter(this, void 0, void 0, function* () {
            var client = yield mongodb_1.MongoClient.connect(url, { useNewUrlParser: true });
            var db = client.db();
            ProductDemeRepository.products = db.collection("products");
        });
    }
    findBy(predicate) {
        throw new Error("Not implmented");
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
            ProductDemeRepository.products.insert(obj);
            console.log("Added %s to repository", obj);
            product = obj;
        }
        return product;
    }
    getById(id) {
        throw new Error("Not implmented");
    }
    getAll() {
        var result = [];
        ProductDemeRepository.products.find({}, undefined).toArray((err, funcResult) => {
            console.log(funcResult);
        });
        return result;
    }
    removeById(id) {
        var product = this.getById(id);
        if (product) {
            console.log("Removing %s", product);
            throw new Error("Not implmented");
        }
    }
}
exports.ProductDemeRepository = ProductDemeRepository;
//# sourceMappingURL=products-repo.js.map