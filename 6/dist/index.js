"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const oauthinstaller_1 = require("./infrastractures/security/oauthinstaller");
const config_1 = require("./infrastractures/config/config");
new oauthinstaller_1.OauthInstaller();
app_1.app.listen(config_1.PORT);
console.log("Listenning on port:", config_1.PORT);
//# sourceMappingURL=index.js.map