document.addEventListener("DOMContentLoaded", function () {

  let pacienteActual = null;

  // =========================
  // CARGAR PACIENTES EN SELECT
  // =========================
  const select = document.getElementById("pacienteSelect");

  pacientes.forEach((p, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.text = p.nombre;
    select.appendChild(option);
  });

  // =========================
  // LOGIN
  // =========================
  window.login = function () {
    const index = document.getElementById("pacienteSelect").value;

    pacienteActual = pacientes[index];

    document.getElementById("panel").classList.remove("hidden");

    document.getElementById("nombrePaciente").innerText =
      pacienteActual.nombre;

    document.getElementById("infoPaciente").innerText =
      `Edad: ${pacienteActual.edad} | Dx: ${pacienteActual.diagnostico} | Médico: ${pacienteActual.medico} | Cita: ${pacienteActual.cita}`;

    mostrarMedicamentos();
  };

  // =========================
  // MOSTRAR MEDICAMENTOS
  // =========================
  function mostrarMedicamentos() {
    const cont = document.getElementById("medicamentos");
    cont.innerHTML = "";

    pacienteActual.medicamentos.forEach((m, i) => {

      const div = document.createElement("div");

      div.innerHTML = `
        <p><b>${m.nombre}</b> - ${m.dosis} - ${m.indicacion}</p>
        <button onclick="marcarMedicamento(${i})">
          ${m.estado ? "Hecho ✅" : "Marcar como hecho"}
        </button>
      `;

      if (m.estado) {
        div.style.background = "#d4f7d4";
      }

      cont.appendChild(div);
    });
  }

  // =========================
  // MARCAR MEDICAMENTO
  // =========================
  window.marcarMedicamento = function (i) {
    pacienteActual.medicamentos[i].estado = true;
    mostrarMedicamentos();
  };

  // =========================
  // GUARDAR MEDICIONES
  // =========================
  window.guardarMedicion = function () {

    const glucosa = document.getElementById("glucosa").value;
    const presion = document.getElementById("presion").value;

    const historial = document.getElementById("historial");

    const div = document.createElement("div");

    div.innerHTML = `
      🩸 Glucosa: ${glucosa} | ❤️ Presión: ${presion} | ${new Date().toLocaleString()}
    `;

    historial.appendChild(div);

    // Notificación
    if (Notification.permission === "granted") {
      new Notification("Registro guardado correctamente");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  };

});
