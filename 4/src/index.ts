import { app } from "./app";
import { logger } from "./infrastractures/utils/logger";
import { OauthInstaller } from "./infrastractures/security/oauthinstaller";

const port = 3000;
new OauthInstaller();
app.listen(port);
logger.info("Listenning on port:" + port);
