document.addEventListener("DOMContentLoaded", () => {
  const btnCreate = document.getElementById("btnCreate");

  // Verificar si hay un ride para editar
  const editIndex = localStorage.getItem("editRideIndex");
  let rides = JSON.parse(localStorage.getItem("rides")) || [];

  if (editIndex !== null) {
    // Cambiar texto del botón
    btnCreate.textContent = "Save";

    // Cargar datos en el formulario
    const ride = rides[editIndex];
    document.getElementById("driverName").value = ride.driverName || "";
    document.getElementById("departure").value = ride.departure;
    document.getElementById("arrive").value = ride.arrive;
    document.getElementById("seats").value = ride.seats;
    document.getElementById("fee").value = ride.fee;
    document.getElementById("time").value = ride.time;
    document.getElementById("make").value = ride.vehicle.make;
    document.getElementById("model").value = ride.vehicle.model;
    document.getElementById("year").value = ride.vehicle.year;

    // Días seleccionados
    document.querySelectorAll(".checkbox-group input[type='checkbox']").forEach((chk) => {
      chk.checked = ride.days.includes(chk.parentElement.textContent.trim());
    });
  }

  btnCreate.addEventListener("click", () => {
    const driverName = document.getElementById("driverName").value.trim();
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
    document.querySelectorAll(".checkbox-group input[type='checkbox']").forEach((chk) => {
      if (chk.checked) {
        days.push(chk.parentElement.textContent.trim());
      }
    });

    const newRide = {
      driverName, // <-- Guardamos el nombre del conductor
      departure,
      arrive,
      days,
      time,
      seats: parseInt(seats),
      fee: parseFloat(fee),
      vehicle: { make, model, year: parseInt(year) }
    };

    if (editIndex !== null) {
      // Modo edición
      rides[editIndex] = newRide;
      localStorage.removeItem("editRideIndex"); // limpiar índice
    } else {
      // Modo creación
      rides.push(newRide);
    }

    localStorage.setItem("rides", JSON.stringify(rides));
    window.location.href = "Rides_Main.html";
  });
});
