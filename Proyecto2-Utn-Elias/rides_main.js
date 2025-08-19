document.addEventListener("DOMContentLoaded", () => {
  const ridesTableBody = document.getElementById("ridesTableBody");

  // Obtener rides del localStorage
  const rides = JSON.parse(localStorage.getItem("rides")) || [];

  // Limpiar tabla antes de rellenar
  ridesTableBody.innerHTML = "";

  rides.forEach((ride, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><a href="#">${ride.departure}</a></td>
      <td>${ride.arrive}</td>
      <td>${ride.seats}</td>
      <td>${ride.vehicle.make} ${ride.vehicle.model} ${ride.vehicle.year}</td>
      <td>$${ride.fee}</td>
      <td class="actions">
        <a href="#" class="edit-btn" data-index="${index}">Edit</a> | 
        <a href="#" class="delete-btn" data-index="${index}">Delete</a>
      </td>
    `;

    ridesTableBody.appendChild(row);
  });

  // Manejo de acciones
  ridesTableBody.addEventListener("click", (e) => {
    // Eliminar
    if (e.target.classList.contains("delete-btn")) {
      const rideIndex = e.target.getAttribute("data-index");
      rides.splice(rideIndex, 1);
      localStorage.setItem("rides", JSON.stringify(rides));
      location.reload();
    }

    // Editar
    if (e.target.classList.contains("edit-btn")) {
      const rideIndex = e.target.getAttribute("data-index");
      localStorage.setItem("editRideIndex", rideIndex);
      window.location.href = "New_Rides.html"; // redirige al formulario
    }
  });
});
