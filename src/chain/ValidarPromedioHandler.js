const { BaseHandler } = require("./BaseHandler");

class ValidarPromedioHandler extends BaseHandler {
  handle(context) {
    const promedio = context.alumno.promedio;
    if (promedio === null || promedio === undefined) {
      return super.handle(context);
    }
    if (typeof promedio !== "number" || Number.isNaN(promedio)) {
      return { ok: false, message: "Promedio invalido" };
    }
    if (promedio < 7) {
      return { ok: false, message: "Promedio insuficiente" };
    }
    return super.handle(context);
  }
}

module.exports = { ValidarPromedioHandler };
