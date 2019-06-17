import { app } from "./app";
import { logger } from "./infrastractures/utils/logger";
import { User } from "./buisneslogic/users/model/user";

const port = 3000;
app.listen(port);
logger.info("Listenning on port:" + port);
