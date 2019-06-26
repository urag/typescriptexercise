const Joi = require('joi');

export const schema = Joi.object().keys({
    id: Joi.number().integer().error(new Error('Id is not a number')),
    name: Joi.string().alphanum().min(3).error(new Error('Name needs to be at leaset 3 characters')),
    categoryId: Joi.string().alphanum(),
    itemsInStock: Joi.number().integer()
}).with('id', 'name');
