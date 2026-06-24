console.log("SCRIPT CARGÓ");

document.addEventListener("DOMContentLoaded", () => {

  const select = document.getElementById("pacienteSelect");

  if (!select) {
    console.error("NO EXISTE pacienteSelect en el HTML");
    return;
  }

  pacientes.forEach((p, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = p.nombre;
    select.appendChild(option);
  });

  window.login = function () {

    const index = document.getElementById("pacienteSelect").value;

    if (!pacientes[index]) {
      alert("Paciente no encontrado");
      return;
    }

    const pacienteActual = pacientes[index];

    document.getElementById("panel").classList.remove("hidden");

    document.getElementById("nombrePaciente").textContent =
      pacienteActual.nombre;

    document.getElementById("infoPaciente").textContent =
      `Edad: ${pacienteActual.edad} | Dx: ${pacienteActual.diagnostico} | Médico: ${pacienteActual.medico} | Cita: ${pacienteActual.cita}`;

    const cont = document.getElementById("medicamentos");
    cont.innerHTML = "";

    pacienteActual.medicamentos.forEach((m, i) => {
      const div = document.createElement("div");

      div.innerHTML = `
        <p><b>${m.nombre}</b> - ${m.dosis} - ${m.indicacion}</p>
        <button onclick="alert('Función básica OK')">
          ${m.estado ? "Hecho" : "Marcar"}
        </button>
      `;

      cont.appendChild(div);
    });
  };

});
