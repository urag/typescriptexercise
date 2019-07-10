"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    id: { type: Number, unique: true },
    name: { type: String }
});
function getCategoiesDB() {
    return mongoose_1.model('Categories', schema);
}
exports.getCategoiesDB = getCategoiesDB;
//# sourceMappingURL=categories-schema-model.js.map