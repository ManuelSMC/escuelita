const { Alumno } = require("../entity/Alumno");

class AlumnoRepository {
  constructor(db) {
    this.db = db;
    this.tableName = "alumnos";
  }

  getAll() {
    return this.db.table(this.tableName);
  }

  findById(id) {
    return this.getAll().find((alumno) => alumno.id === id) || null;
  }

  findByMatricula(matricula) {
    return this.getAll().find((alumno) => alumno.matricula === matricula) || null;
  }

  create(data) {
    const alumno = new Alumno(data);
    this.getAll().push(alumno);
    return alumno;
  }
}

module.exports = { AlumnoRepository };
