class AlumnoServiceProxy {
  constructor(realService) {
    this.realService = realService;
  }

  registrar(data) {
    return this.realService.registrar(data);
  }

  getAll() {
    return this.realService.getAll();
  }

  reinscribir(data) {
    if (!data || data.id === undefined || data.id === null) {
      throw new Error("Solicitud invalida para reinscripcion");
    }
    return this.realService.reinscribir(data);
  }
}

module.exports = { AlumnoServiceProxy };
