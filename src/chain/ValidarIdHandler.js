const { BaseHandler } = require("./BaseHandler");

class ValidarIdHandler extends BaseHandler {
  handle(context) {
    if (!Number.isInteger(context.id) || context.id <= 0) {
      return { ok: false, message: "Id invalido para reinscripcion" };
    }
    return super.handle(context);
  }
}

module.exports = { ValidarIdHandler };
