class Alumno {
  constructor({ id, nombre, matricula, promedio, tieneAdeudo }) {
    this.id = id;
    this.nombre = nombre;
    this.matricula = matricula;
    this.promedio = promedio;
    this.tieneAdeudo = tieneAdeudo;
  }
}

module.exports = { Alumno };
