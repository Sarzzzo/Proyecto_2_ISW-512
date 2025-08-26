document.addEventListener("DOMContentLoaded", () => {
  const bookingsTableBody = document.getElementById("bookingsTableBody");
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (!loggedUser) {
    bookingsTableBody.innerHTML = `<tr><td colspan="3" style="text-align:center;">No user logged in.</td></tr>`;
    return;
  }

  if (!loggedUser.role) {
    bookingsTableBody.innerHTML = `<tr><td colspan="3" style="text-align:center;">Only drivers can view bookings.</td></tr>`;
    return;
  }

  let rideRequests = JSON.parse(localStorage.getItem("rideRequests")) || [];

  function renderRequests() {
    bookingsTableBody.innerHTML = "";

    const myRequests = rideRequests.filter(r => r.driverName === `${loggedUser.firstName} ${loggedUser.lastName}` || r.driverName === loggedUser.firstName);

    if (myRequests.length === 0) {
      bookingsTableBody.innerHTML = `<tr><td colspan="3" style="text-align:center;">No bookings found.</td></tr>`;
      return;
    }

    myRequests.forEach((req, index) => {
      const userDisplay = req.userName || req.user || "User";
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <img src="img/LogoPersona.png" class="user-icon-small" alt="User Icon">
          ${userDisplay}
        </td>
        <td>${req.departure} → ${req.arrive} (${req.time})</td>
        <td>
          <a href="#" class="accept-link" data-index="${index}">Accept</a> | 
          <a href="#" class="reject-link" data-index="${index}">Reject</a>
        </td>
      `;
      bookingsTableBody.appendChild(row);
    });
  }

  bookingsTableBody.addEventListener("click", e => {
    if (!e.target.classList.contains("accept-link") && !e.target.classList.contains("reject-link")) return;
    e.preventDefault();

    const myRequests = rideRequests.filter(r => r.driverName === `${loggedUser.firstName} ${loggedUser.lastName}` || r.driverName === loggedUser.firstName);
    const index = parseInt(e.target.dataset.index);
    const selectedRequest = myRequests[index];
    if (!selectedRequest) return;

    if (e.target.classList.contains("accept-link")) {
      let acceptedRides = JSON.parse(localStorage.getItem("acceptedRides")) || [];
      acceptedRides.push(selectedRequest);
      localStorage.setItem("acceptedRides", JSON.stringify(acceptedRides));

      rideRequests = rideRequests.filter(r => r !== selectedRequest);
      localStorage.setItem("rideRequests", JSON.stringify(rideRequests));
      renderRequests();
    }

    if (e.target.classList.contains("reject-link")) {
      rideRequests = rideRequests.filter(r => r !== selectedRequest);
      localStorage.setItem("rideRequests", JSON.stringify(rideRequests));
      renderRequests();
    }
  });

  renderRequests();
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
