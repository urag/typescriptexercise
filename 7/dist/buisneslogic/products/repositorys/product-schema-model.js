"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    id: { type: String, unique: true },
    name: { type: String },
    categoryId: { type: String },
    itemsInStock: { type: String },
});
function getProductDB() {
    // var mongoose = require('mongoose');
    // mongoose.model('Products', schema);
    return mongoose_1.model('Products', schema);
}
exports.getProductDB = getProductDB;
//# sourceMappingURL=product-schema-model.js.map