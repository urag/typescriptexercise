"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oauthinstaller_1 = require("./infrastractures/security/oauthinstaller");
const config_1 = require("./infrastractures/config/config");
const app_1 = require("./app");
init();
function init() {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/store', { useNewUrlParser: true });
    mongoose.set('debug', true);
    new oauthinstaller_1.OauthInstaller();
    app_1.app.listen(config_1.PORT);
    console.log("Listenning on port:", config_1.PORT);
}
//# sourceMappingURL=index.js.map