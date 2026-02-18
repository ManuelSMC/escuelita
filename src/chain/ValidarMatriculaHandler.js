const { BaseHandler } = require("./BaseHandler");

class ValidarMatriculaHandler extends BaseHandler {
  handle(context) {
    const matricula = (context.alumno.matricula || "").trim().toUpperCase();
    if (!/^[A-Z0-9\-]{6,12}$/.test(matricula)) {
      return { ok: false, message: "Matricula invalida" };
    }
    if (/^0+$/.test(matricula)) {
      return { ok: false, message: "Matricula no permitida" };
    }
    return super.handle(context);
  }
}

module.exports = { ValidarMatriculaHandler };
