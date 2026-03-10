# Sistema web monolitico de alumnos -

Proyecto sencillo cliente-servidor en un solo repo. Todo corre en un solo proceso Node.js y sirve el frontend desde el mismo servidor.

## Arquitectura

- Monolitico cliente-servidor.
- Una sola base de codigo con frontend y backend.
- La base de datos es en memoria (arreglo en el servidor).

## Patrones solicitados

### Proxy

- Interfaz: `AlumnoService` en `src/service/AlumnoService.js`.
- Implementacion real: `AlumnoServiceImpl` en `src/service/AlumnoServiceImpl.js`.
- Proxy: `AlumnoServiceProxy` en `src/proxy/AlumnoServiceProxy.js`.
- El proxy valida que la solicitud de reinscripcion sea valida antes de llamar al servicio.

### Chain of Responsibility

Cadena de validaciones para reinscribir en `src/chain`:

1. `ValidarIdHandler` valida id positivo.
2. `ValidarExistenciaHandler` valida que el alumno exista.
3. `ValidarReinscritoHandler` valida que no este reinscrito.
4. `ValidarNombreHandler` valida longitud y caracteres del nombre.
5. `ValidarMatriculaHandler` valida formato de matricula.
6. `ValidarPromedioHandler` valida promedio >= 7 si existe.
7. `ValidarAdeudoHandler` valida que no tenga adeudo.

Si alguna validacion falla, se detiene el proceso y se envia el mensaje.

## Paquetes principales

- `src/entity`: entidad `Alumno`.
- `src/repository`: base de datos en memoria y repositorio.
- `src/service`: logica de negocio.
- `src/proxy`: control de acceso.
- `src/chain`: validaciones encadenadas.
- `public`: frontend responsive (funciona en telefono y pc).

## Ejecutar

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar servidor:
   ```bash
   npm start
   ```
3. Abrir: http://localhost:3000

## Notas

- El promedio y el adeudo son opcionales al registrar.
- La base de datos se reinicia cada vez que se reinicia el servidor.
