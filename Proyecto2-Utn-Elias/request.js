document.addEventListener("DOMContentLoaded", () => {
  const btnCreate = document.getElementById("btnCreate");
  const ride = JSON.parse(localStorage.getItem("selectedRide"));
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  if (!ride || !loggedUser) return;

  // Mostrar nombre del driver debajo de la imagen
  const driverDisplay = document.getElementById("driverNameDisplay");
  driverDisplay.textContent = ride.driverName || "Driver";

  // Cargar info en inputs (solo visual)
  const fields = ["departure", "arrive", "seats", "fee", "time", "make", "model", "year"];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el.tagName === "SELECT") {
      el.value = ride[id] || ride.vehicle[id] || "";
      el.disabled = true; // no editable
    } else {
      el.value = ride[id] || ride.vehicle[id] || "";
      el.readOnly = true; // no editable
    }
  });

  // Días seleccionados (checkboxes)
  document.querySelectorAll(".checkbox-group input[type='checkbox']").forEach(chk => {
    chk.checked = ride.days.includes(chk.parentElement.textContent.trim());
    chk.disabled = true; // no editable
  });

  // Click en "Request"
  btnCreate.addEventListener("click", () => {
    const rideRequests = JSON.parse(localStorage.getItem("rideRequests")) || [];

    const request = {
      driverName: ride.driverName,
      driverEmail: ride.driverEmail || ride.driver?.email,
      userName: loggedUser.firstName,
      departure: ride.departure,
      arrive: ride.arrive,
      time: ride.time,
      date: new Date().toISOString()
    };

    rideRequests.push(request);
    localStorage.setItem("rideRequests", JSON.stringify(rideRequests));

    alert(`Ride request sent to ${ride.driverName}!`);
    window.location.href = "Home_Main.html";
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
