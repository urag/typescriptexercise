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
class MongoConnection {
    constructor(url) {
        this.url = url;
        this.initialized = false;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client = yield mongodb_1.MongoClient.connect(this.url, { useNewUrlParser: true });
            MongoConnection.db = this.client.db();
            this.initialized = true;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.initialized)
                return;
            yield this.client.close();
            this.initialized = false;
        });
    }
}
exports.MongoConnection = MongoConnection;
//# sourceMappingURL=mongo-connection.js.map