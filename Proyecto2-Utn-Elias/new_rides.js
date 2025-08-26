document.addEventListener("DOMContentLoaded", () => {
  const btnCreate = document.getElementById("btnCreate");
  const formTitle = document.getElementById("formTitle");

  const urlParams = new URLSearchParams(window.location.search);
  const editIndex = urlParams.get("editIndex");

  let rides = JSON.parse(localStorage.getItem("rides")) || [];
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser")) || null;

  if (!loggedUser) {
    alert("No driver logged in. Please login first.");
    window.location.href = "index.html";
    return;
  }

  // Si viene en modo edición, cargar datos
  if (editIndex !== null && rides[editIndex]) {
    const ride = rides[editIndex];
    document.getElementById("departure").value = ride.departure;
    document.getElementById("arrive").value = ride.arrive;
    document.getElementById("seats").value = ride.seats;
    document.getElementById("fee").value = ride.fee;
    document.getElementById("time").value = ride.time;
    document.getElementById("make").value = ride.vehicle.make;
    document.getElementById("model").value = ride.vehicle.model;
    document.getElementById("year").value = ride.vehicle.year;

    document.querySelectorAll(".checkbox-group input[type='checkbox']").forEach((chk) => {
      const dayText = chk.parentElement.textContent.trim();
      chk.checked = ride.days.includes(dayText);
    });

    formTitle.textContent = "Edit Ride";
    btnCreate.textContent = "Save";
  }

  btnCreate.addEventListener("click", () => {
    const departure = document.getElementById("departure").value.trim();
    const arrive = document.getElementById("arrive").value.trim();
    const seats = document.getElementById("seats").value;
    const fee = document.getElementById("fee").value;
    const time = document.getElementById("time").value;
    const make = document.getElementById("make").value;
    const model = document.getElementById("model").value.trim();
    const year = document.getElementById("year").value;

    const days = [];
    document.querySelectorAll(".checkbox-group input[type='checkbox']").forEach((chk) => {
      if (chk.checked) {
        days.push(chk.parentElement.textContent.trim());
      }
    });

    const newRide = {
      departure,
      arrive,
      days,
      time,
      seats: parseInt(seats),
      fee: parseFloat(fee),
      vehicle: { make, model, year: parseInt(year) },
      driver: {   // <-- agregamos info del driver logeado
        firstName: loggedUser.firstName,
        lastName: loggedUser.lastName,
        email: loggedUser.email
      }
    };

    if (editIndex !== null && rides[editIndex]) {
      rides[editIndex] = newRide; // actualizar
    } else {
      rides.push(newRide); // crear
    }

    localStorage.setItem("rides", JSON.stringify(rides));
    window.location.href = "Rides_Main.html";
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
