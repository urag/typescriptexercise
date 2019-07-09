import * as dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: "${__dirname}" });

export const PORT = process.env.PORT;
export const AUTH_ON = process.env.AUTH_ON;
export const DB_CONNECTION_URI = process.env.DB_CONNECTION_URI;
