class BaseHandler {
  setNext(handler) {
    this.next = handler;
    return handler;
  }

  handle(context) {
    if (this.next) {
      return this.next.handle(context);
    }
    return { ok: true };
  }
}

module.exports = { BaseHandler };
