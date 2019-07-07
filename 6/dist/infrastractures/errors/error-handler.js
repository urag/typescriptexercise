"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    console.log('Logging my error', err);
    res.send(err);
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map