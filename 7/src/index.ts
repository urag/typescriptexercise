import { OauthInstaller } from "./infrastractures/security/oauthinstaller";
import { PORT } from "./infrastractures/config/config";
import { app } from "./app";


init();

function init() {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/store', { useNewUrlParser: true });
    mongoose.set('debug', true);
    new OauthInstaller();
    app.listen(PORT);
    console.log("Listenning on port:", PORT);
}

