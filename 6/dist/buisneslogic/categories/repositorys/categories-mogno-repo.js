"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_entity_collection_1 = require("../../../infrastractures/db-entity-collection");
class CategoriesMongoRepository {
    constructor(db) {
        this.collection = new db_entity_collection_1.DbEntityCollection(db.collection('categories'));
    }
    save(obj) {
        return this.collection.add([obj]);
    }
    getById(id) {
        return this.collection.findById(id, true);
    }
    getAll() {
        return this.collection.all(true);
    }
    removeById(id) {
        return this.collection.deleteById(id);
    }
    findBy(predicate) {
        throw new Error("Method not implemented.");
    }
}
exports.CategoriesMongoRepository = CategoriesMongoRepository;
//# sourceMappingURL=categories-mogno-repo.js.map