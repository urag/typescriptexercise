"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(code, message) {
        super(message);
        this.statusCode = code;
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=api_error.js.map