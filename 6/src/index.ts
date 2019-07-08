import { app } from "./app";
import { OauthInstaller } from "./infrastractures/security/oauthinstaller";
import { PORT } from "./infrastractures/config/config";


new OauthInstaller();
app.listen(PORT);
console.log("Listenning on port:", PORT);
