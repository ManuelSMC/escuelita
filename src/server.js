const express = require("express");
const path = require("path");
const { InMemoryDatabase } = require("./repository/InMemoryDatabase");
const { AlumnoRepository } = require("./repository/AlumnoRepository");
const { AlumnoServiceImpl } = require("./service/AlumnoServiceImpl");
const { AlumnoServiceProxy } = require("./proxy/AlumnoServiceProxy");
const { buildReinscripcionChain } = require("./chain/buildReinscripcionChain");

const app = express();
const port = process.env.PORT || 3000;
//
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

const db = new InMemoryDatabase();
db.init();
const alumnoRepository = new AlumnoRepository(db);
const chain = buildReinscripcionChain(alumnoRepository);
const alumnoService = new AlumnoServiceImpl(alumnoRepository, chain);
const alumnoServiceProxy = new AlumnoServiceProxy(alumnoService);

app.get("/api/alumnos", (req, res) => {
  const alumnos = alumnoService.getAll();
  res.json({ ok: true, data: alumnos });
});

app.post("/api/alumnos", (req, res) => {
  try {
    const alumno = alumnoService.registrar(req.body);
    res.json({ ok: true, data: alumno });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
});

app.post("/api/reinscribir", (req, res) => {
  try {
    const result = alumnoServiceProxy.reinscribir(req.body);
    res.json({ ok: true, data: result });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
