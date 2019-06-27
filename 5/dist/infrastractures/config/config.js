"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
dotenv.config({ path: "${__dirname}" });
exports.PORT = process.env.PORT;
exports.AUTH_ON = process.env.AUTH_ON;
//# sourceMappingURL=config.js.map