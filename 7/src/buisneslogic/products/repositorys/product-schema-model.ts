import { Schema, Document, Model, Mongoose,model } from 'mongoose';


const schema = new Schema(
    {
        id: { type: Number, unique: true },
        name: { type: String },
        categoryId: { type: Number },
        itemsInStock: { type: String },

    },

);


export function getProductDB() {
    // var mongoose = require('mongoose');
    // mongoose.model('Products', schema);
    return model('Products', schema);
}

