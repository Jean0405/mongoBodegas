console.clear();
import dotenv from "dotenv";
import express from "express";
// import { SERVER } from "./config/configServer.js";
import { generateToken, verifyToken } from "./jwt/tokens.js";
import { limitRequest } from "./helpers/limitRequest.js";
import BODEGAS from "./routers/bodegasRouter.js";
import PRODUCTOS from "./routers/productoRouter.js";
import INVENTARIO from "./routers/inventarioRouter.js";

dotenv.config();
const SERVER = JSON.parse(process.env.CONFIG_SERVER);
const APP = express();
APP.use(express.json());

APP.use("/token", limitRequest(), generateToken);
APP.use("/bodegas", limitRequest(), verifyToken, BODEGAS);
APP.use("/productos", limitRequest(), verifyToken, PRODUCTOS);
APP.use("/inventarios", limitRequest(), verifyToken, INVENTARIO);

APP.listen(SERVER, () =>
  console.log(`http://${SERVER.hostname}:${SERVER.port}`)
);
