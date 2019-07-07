"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
dotenv.config({ path: "${__dirname}" });
exports.PORT = process.env.PORT;
exports.AUTH_ON = process.env.AUTH_ON;
exports.DB_CONNECTION_URI = process.env.DB_CONNECTION_URI;
//# sourceMappingURL=config.js.map