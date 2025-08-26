document.addEventListener("DOMContentLoaded", () => {
  const ridesTableBody = document.getElementById("ridesTableBody");

  // Obtener rides del localStorage
  const rides = JSON.parse(localStorage.getItem("rides")) || [];

  // Limpiar tabla antes de rellenar
  ridesTableBody.innerHTML = "";

  rides.forEach((ride, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${ride.departure}</td>
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
    e.preventDefault();

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
      window.location.href = `new_rides.html?editIndex=${rideIndex}`;
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  checkUserRole();
});

function checkUserRole() {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  if (!loggedUser) {
    console.warn("No user logged in.");
    return;
  }

  // Header: ocultar botón Rides
  const ridesButton = document.querySelector('a[href="Rides_Main.html"]');
  if (loggedUser.role === false && ridesButton) {
    ridesButton.style.display = "none"; 
    ridesButton.setAttribute("disabled", "true"); 
  }

  // Footer: ocultar solo el link Rides
  const footerRidesLink = document.querySelector('footer .footer-nav a[href="Rides_Main.html"]');
  if (loggedUser.role === false && footerRidesLink) {
    // Oculta el link y también el separador "|" que sigue
    const nextSibling = footerRidesLink.nextSibling;
    if (nextSibling && nextSibling.nodeType === Node.TEXT_NODE && nextSibling.textContent.includes("|")) {
      nextSibling.textContent = ""; // elimina la barra vertical
    }
    footerRidesLink.style.display = "none";
  }
}
