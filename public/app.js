const formRegistrar = document.getElementById("form-registrar");
const formReinscribir = document.getElementById("form-reinscribir");
const alumnosContainer = document.getElementById("alumnos");
const toast = document.getElementById("toast");
const btnRefrescar = document.getElementById("btn-refrescar");

function showToast(message, isError = false) {
  toast.textContent = message;
  toast.style.background = isError ? "#8a2c2c" : "#2d1d16";
  toast.hidden = false;
  setTimeout(() => {
    toast.hidden = true;
  }, 2400);
}

function renderAlumnos(alumnos) {
  if (!alumnos.length) {
    alumnosContainer.innerHTML = "<p>No hay alumnos registrados.</p>";
    return;
  }

  alumnosContainer.innerHTML = alumnos
    .map(
      (alumno) => `
        <div class="table__row">
          <span data-label="Id"><strong>${alumno.id}</strong></span>
          <span data-label="Nombre">${alumno.nombre}</span>
          <span data-label="Matricula">${alumno.matricula}</span>
          <span data-label="Promedio">${alumno.promedio ?? "Sin dato"}</span>
          <span data-label="Adeudo">${alumno.tieneAdeudo ? "Si" : "No"}</span>
        </div>
      `
    )
    .join("");
}

async function fetchAlumnos() {
  const response = await fetch("/api/alumnos");
  const data = await response.json();
  renderAlumnos(data.data || []);
}

formRegistrar.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(formRegistrar);
  const payload = Object.fromEntries(formData.entries());
  payload.tieneAdeudo = formData.get("tieneAdeudo") === "on";

  const response = await fetch("/api/alumnos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!data.ok) {
    showToast(data.message, true);
    return;
  }

  formRegistrar.reset();
  showToast("Alumno registrado");
  fetchAlumnos();
});

formReinscribir.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(formReinscribir);
  const payload = Object.fromEntries(formData.entries());

  const response = await fetch("/api/reinscribir", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: payload.id }),
  });

  const data = await response.json();
  if (!data.ok) {
    showToast(data.message, true);
    return;
  }

  formReinscribir.reset();
  showToast(data.data.mensaje);
});

btnRefrescar.addEventListener("click", fetchAlumnos);

fetchAlumnos();
