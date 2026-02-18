const { BaseHandler } = require("./BaseHandler");

class ValidarNombreHandler extends BaseHandler {
  handle(context) {
    const nombre = (context.alumno.nombre || "").trim();
    if (nombre.length < 3 || nombre.length > 60) {
      return { ok: false, message: "Nombre con longitud invalida" };
    }
    if (!/^[A-Za-z .'-]+$/.test(nombre)) {
      return { ok: false, message: "Nombre con caracteres no permitidos" };
    }
    return super.handle(context);
  }
}

module.exports = { ValidarNombreHandler };
