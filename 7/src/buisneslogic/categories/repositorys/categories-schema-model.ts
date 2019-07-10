import { Schema, model } from 'mongoose';


const schema = new Schema(
    {
        id: { type: Number, unique: true },
        name: { type: String }
    },

);


export function getCategoiesDB() {
    return model('Categories', schema);
}

