"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
exports.logger = winston.createLogger({
    transports: [new winston.transports.Console()]
});
//# sourceMappingURL=logger.js.map