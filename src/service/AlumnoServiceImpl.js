const { AlumnoService } = require("./AlumnoService");

class AlumnoServiceImpl extends AlumnoService {
  constructor(repository, reinscripcionChain) {
    super();
    this.repository = repository;
    this.reinscripcionChain = reinscripcionChain;
    this.nextId = 1;
  }

  registrar(data) {
    const nombre = (data.nombre || "").trim();
    const matricula = (data.matricula || "").trim().toUpperCase();
    const promedio = this.normalizePromedio(data.promedio);
    const tieneAdeudo = this.normalizeAdeudo(data.tieneAdeudo);

    if (!nombre) {
      throw new Error("El nombre es obligatorio");
    }
    if (nombre.length < 3 || nombre.length > 60) {
      throw new Error("El nombre debe tener entre 3 y 60 caracteres");
    }
    if (!/^[A-Z0-9\-]{6,12}$/.test(matricula)) {
      throw new Error("La matricula debe ser alfanumerica de 6 a 12 caracteres");
    }
    if (this.repository.findByMatricula(matricula)) {
      throw new Error("La matricula ya esta registrada");
    }
    if (promedio !== null && (promedio < 0 || promedio > 10)) {
      throw new Error("El promedio debe estar entre 0 y 10");
    }

    const alumno = this.repository.create({
      id: this.nextId++,
      nombre,
      matricula,
      promedio,
      tieneAdeudo,
      reinscrito: false,
      fechaRegistro: new Date().toISOString(),
    });

    return alumno;
  }

  reinscribir(data) {
    const id = Number(data.id);
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Id invalido");
    }

    const context = { id };
    const validation = this.reinscripcionChain.handle(context);
    if (!validation.ok) {
      throw new Error(validation.message);
    }

    context.alumno.reinscrito = true;
    context.alumno.fechaReinscripcion = new Date().toISOString();

    return {
      id,
      mensaje: "Reinscripcion exitosa",
    };
  }

  getAll() {
    return this.repository.getAll();
  }

  normalizePromedio(value) {
    if (value === undefined || value === null || value === "") {
      return null;
    }
    const promedio = Number(value);
    return Number.isNaN(promedio) ? null : promedio;
  }

  normalizeAdeudo(value) {
    if (value === true || value === "true" || value === "on") {
      return true;
    }
    if (value === false || value === "false" || value === undefined || value === null || value === "") {
      return false;
    }
    return Boolean(value);
  }
}

module.exports = { AlumnoServiceImpl };
