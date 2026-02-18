const { BaseHandler } = require("./BaseHandler");

class ValidarAdeudoHandler extends BaseHandler {
  handle(context) {
    if (context.alumno.tieneAdeudo === true) {
      return { ok: false, message: "El alumno tiene adeudo" };
    }
    return super.handle(context);
  }
}

module.exports = { ValidarAdeudoHandler };
