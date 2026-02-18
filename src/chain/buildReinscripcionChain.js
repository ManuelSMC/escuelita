const { ValidarPromedioHandler } = require("./ValidarPromedioHandler");
const { ValidarAdeudoHandler } = require("./ValidarAdeudoHandler");
const { ValidarExistenciaHandler } = require("./ValidarExistenciaHandler");
const { ValidarIdHandler } = require("./ValidarIdHandler");
const { ValidarNombreHandler } = require("./ValidarNombreHandler");
const { ValidarMatriculaHandler } = require("./ValidarMatriculaHandler");
const { ValidarReinscritoHandler } = require("./ValidarReinscritoHandler");

function buildReinscripcionChain(repository) {
  const validarId = new ValidarIdHandler();
  const validarExistencia = new ValidarExistenciaHandler(repository);
  const validarReinscrito = new ValidarReinscritoHandler();
  const validarNombre = new ValidarNombreHandler();
  const validarMatricula = new ValidarMatriculaHandler();
  const validarPromedio = new ValidarPromedioHandler();
  const validarAdeudo = new ValidarAdeudoHandler();

  validarId
    .setNext(validarExistencia)
    .setNext(validarReinscrito)
    .setNext(validarNombre)
    .setNext(validarMatricula)
    .setNext(validarPromedio)
    .setNext(validarAdeudo);

  return validarId;
}

module.exports = { buildReinscripcionChain };
