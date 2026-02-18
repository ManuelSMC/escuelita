const { BaseHandler } = require("./BaseHandler");

class ValidarReinscritoHandler extends BaseHandler {
  handle(context) {
    if (context.alumno.reinscrito === true) {
      return { ok: false, message: "El alumno ya esta reinscrito" };
    }
    return super.handle(context);
  }
}

module.exports = { ValidarReinscritoHandler };
