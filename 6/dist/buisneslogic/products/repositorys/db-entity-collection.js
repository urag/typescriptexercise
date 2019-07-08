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
class DbEntityCollection {
    constructor(collection) {
        this.collection = collection;
    }
    all(stripObjectId = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const projection = stripObjectId ? { _id: 0 } : undefined;
            return yield this.collection.find({}, { projection }).toArray();
        });
    }
    findById(id, stripObjectId = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const documentId = new mongodb_1.ObjectID(id);
            return yield this.findOne({ _id: documentId }, stripObjectId);
        });
    }
    findOne(filter, stripObjectId = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const projection = stripObjectId ? { _id: 0 } : undefined;
            return yield this.collection.findOne(filter, { projection });
        });
    }
    add(entities) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEntities = entities.map(p => {
                const id = new mongodb_1.ObjectID();
                p.id = id.toHexString();
                return Object.assign({}, p, {
                    _id: id,
                });
            });
            yield this.collection.insertMany(newEntities);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const documentId = new mongodb_1.ObjectID(id);
            const result = yield this.collection.deleteOne({ _id: documentId });
            return !!result.deletedCount;
        });
    }
    replace(entity, upsert = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const documentId = new mongodb_1.ObjectID(entity.id);
            const result = yield this.collection.replaceOne({ _id: documentId }, entity, { upsert });
            return !!(result.modifiedCount + result.upsertedCount);
        });
    }
}
exports.DbEntityCollection = DbEntityCollection;
//# sourceMappingURL=db-entity-collection.js.map