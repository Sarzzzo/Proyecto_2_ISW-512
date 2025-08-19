document.addEventListener("DOMContentLoaded", () => {
  const btnCreate = document.getElementById("btnCreate");

  btnCreate.addEventListener("click", () => {
    // Obtener valores del formulario
    const departure = document.getElementById("departure").value.trim();
    const arrive = document.getElementById("arrive").value.trim();
    const seats = document.getElementById("seats").value;
    const fee = document.getElementById("fee").value;
    const time = document.getElementById("time").value;
    const make = document.getElementById("make").value;
    const model = document.getElementById("model").value.trim();
    const year = document.getElementById("year").value;

    // Días seleccionados
    const days = [];
    document.querySelectorAll(".checkbox-group input[type='checkbox']").forEach((chk, index) => {
      if (chk.checked) {
        days.push(chk.parentElement.textContent.trim());
      }
    });

    // Crear objeto ride
    const newRide = {
      departure,
      arrive,
      days,
      time,
      seats: parseInt(seats),
      fee: parseFloat(fee),
      vehicle: {
        make,
        model,
        year: parseInt(year)
      }
    };

    // Guardar en localStorage
    let rides = JSON.parse(localStorage.getItem("rides")) || [];
    rides.push(newRide);
    localStorage.setItem("rides", JSON.stringify(rides));

    // Redirigir a la página de Rides
    window.location.href = "Rides_Main.html";
  });
});
