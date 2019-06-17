"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const logger_1 = require("./infrastractures/utils/logger");
const port = 3000;
app_1.app.listen(port);
logger_1.logger.info("Listenning on port:" + port);
//# sourceMappingURL=index.js.map