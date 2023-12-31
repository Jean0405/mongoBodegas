import "reflect-metadata";
import { classToPlain, plainToInstance } from "class-transformer";
import { Producto } from "../storage/productoDTO.js";
import { validate } from "class-validator";

const proxyProducto = async (req, res, next) => {
  try {
    let data = plainToInstance(Producto, req.body);
    await validate(data);
    req.body = JSON.parse(JSON.stringify(data));
    next();
  } catch (error) {
    res.status(500).send({
      message: "ERROR DE RECEPCIÓN DE DATA 'undefined'",
      error: error.message,
    });
  }
};

const productoVerify = (req, res, next) => {
  if (!req.rateLimit) return;
  let { payload } = req.data;
  const { iat, exp, ...newPayload } = payload;
  payload = newPayload;
  let Clone = JSON.stringify(
    classToPlain(plainToInstance(Producto, {}, { ignoreDecorators: true }))
  );
  let Verify = Clone === JSON.stringify(payload);
  !Verify
    ? res.status(406).send({ status: 406, message: "No estás autorizado" })
    : next();
};

export { proxyProducto, productoVerify };
