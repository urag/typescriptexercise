"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = require("../errors/api_error");
function idValidation(req, res, next) {
    var id = req.params.id;
    if (typeof id !== 'undefined') {
        if (isNaN(id)) {
            throw new api_error_1.ApiError(400, "Id is not a number");
        }
    }
    else {
        console.log('Id is undefined for METHOD:%s and body:%s', req.method, req.body);
    }
    next();
}
exports.idValidation = idValidation;
function nameValidation(req, res, next) {
    const name = req.body.name;
    if (typeof name !== 'undefined') {
        if (name.length < 3) {
            throw new api_error_1.ApiError(400, "Name needs to be at least 3 characters");
        }
    }
    else {
        console.log('Name is undefined for METHOD:%s and body:%s', req.method, req.body);
    }
    next();
}
exports.nameValidation = nameValidation;
//# sourceMappingURL=validation-utils.js.map