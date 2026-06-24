document.addEventListener("DOMContentLoaded", function () {

  let pacienteActual = null;

  const select = document.getElementById("pacienteSelect");

  // llenar select
  pacientes.forEach((p, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.text = p.nombre;
    select.appendChild(option);
  });

  window.login = function () {
    const index = select.value;
    pacienteActual = pacientes[index];

    document.getElementById("panel").classList.remove("hidden");

    document.getElementById("nombrePaciente").innerText =
      pacienteActual.nombre;

    document.getElementById("infoPaciente").innerText =
      `Edad: ${pacienteActual.edad} | Dx: ${pacienteActual.diagnostico} | Médico: ${pacienteActual.medico} | Cita: ${pacienteActual.cita}`;

    mostrarMedicamentos();
  };

  function mostrarMedicamentos() {
    const cont = document.getElementById("medicamentos");
    cont.innerHTML = "";

    pacienteActual.medicamentos.forEach((m, i) => {
      const div = document.createElement("div");

      div.innerHTML = `
        <p><b>${m.nombre}</b> - ${m.dosis} - ${m.indicacion}</p>
        <button onclick="marcar(${i})">
          ${m.estado ? "Hecho ✅" : "Marcar como hecho"}
        </button>
      `;

      if (m.estado) div.style.background = "#d4f7d4";

      cont.appendChild(div);
    });
  }

  window.marcar = function (i) {
    pacienteActual.medicamentos[i].estado = true;
    mostrarMedicamentos();
  };

  window.guardarMedicion = function () {
    const g = document.getElementById("glucosa").value;
    const p = document.getElementById("presion").value;

    const historial = document.getElementById("historial");

    const div = document.createElement("div");
    div.innerHTML =
      `🩸 Glucosa: ${g} | ❤️ Presión: ${p} | ${new Date().toLocaleString()}`;

    historial.appendChild(div);

    if (Notification.permission === "granted") {
      new Notification("Registro guardado");
    } else {
      Notification.requestPermission();
    }
  };

});
