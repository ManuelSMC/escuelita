const { BaseHandler } = require("./BaseHandler");

class ValidarExistenciaHandler extends BaseHandler {
  constructor(repository) {
    super();
    this.repository = repository;
  }

  handle(context) {
    const alumno = this.repository.findById(context.id);
    if (!alumno) {
      return { ok: false, message: "Alumno no existe" };
    }
    context.alumno = alumno;
    return super.handle(context);
  }
}

module.exports = { ValidarExistenciaHandler };
