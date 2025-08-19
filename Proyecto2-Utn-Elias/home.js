document.addEventListener("DOMContentLoaded", () => {
  const ridesTableBody = document.getElementById("ridesTableBody");
  const fromSelect = document.getElementById("from");
  const toSelect = document.getElementById("to");
  const searchBtn = document.querySelector(".btn-search");

  let rides = JSON.parse(localStorage.getItem("rides")) || [];

  // Llenar selects con lugares únicos
  const fromPlaces = [...new Set(rides.map(r => r.departure))];
  const toPlaces = [...new Set(rides.map(r => r.arrive))];

  fromSelect.innerHTML = "";
  toSelect.innerHTML = "";

  fromPlaces.forEach(place => {
    const option = document.createElement("option");
    option.value = place;
    option.textContent = place;
    fromSelect.appendChild(option);
  });

  toPlaces.forEach(place => {
    const option = document.createElement("option");
    option.value = place;
    option.textContent = place;
    toSelect.appendChild(option);
  });

  // Función para mostrar rides en la tabla
  function renderRides(ridesArray) {
    ridesTableBody.innerHTML = "";

    if (ridesArray.length === 0) {
      ridesTableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center;">No rides found.</td>
        </tr>
      `;
      return;
    }

    ridesArray.forEach(ride => {
      const vehicle = ride.vehicle || { make: "", model: "", year: "" };
      const row = document.createElement("tr");
      row.dataset.days = JSON.stringify(ride.days || []);
      row.dataset.time = ride.time || "";

      row.innerHTML = `
        <td class="driver-cell">
          <img src="img/LogoPersona.png" class="user-icon-small" alt="User Icon"> 
          ${ride.driverName || "Driver"}
        </td>
        <td>${ride.departure}</td>
        <td>${ride.arrive}</td>
        <td>${ride.seats}</td>
        <td>${vehicle.make} ${vehicle.model} ${vehicle.year}</td>
        <td>${ride.fee ? `$${ride.fee}` : "--"}</td>
        <td><a href="#" class="request-link">Request</a></td>
      `;
      ridesTableBody.appendChild(row);
    });
  }

  // Filtrar y mostrar solo al presionar Find Rides
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const selectedFrom = fromSelect.value;
    const selectedTo = toSelect.value;

    const checkedDays = Array.from(document.querySelectorAll(".days-row input[type='checkbox']"))
      .filter(cb => cb.checked)
      .map(cb => cb.nextSibling.textContent.trim());

    const filteredRides = rides.filter(ride =>
      ride.departure === selectedFrom &&
      ride.arrive === selectedTo &&
      ride.days?.some(day => checkedDays.includes(day))
    );

    renderRides(filteredRides);
  });

  // Manejo del click en "Request"
  ridesTableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("request-link")) {
      e.preventDefault();
      const row = e.target.closest("tr");
      const rideData = {
        driverName: row.querySelector(".driver-cell").textContent.trim(),
        departure: row.children[1].textContent.trim(),
        arrive: row.children[2].textContent.trim(),
        seats: parseInt(row.children[3].textContent.trim()),
        vehicle: (() => {
          const parts = row.children[4].textContent.trim().split(" ");
          return { make: parts[0] || "", model: parts[1] || "", year: parseInt(parts[2]) || "" };
        })(),
        fee: row.children[5].textContent.includes("$") ? parseFloat(row.children[5].textContent.replace("$", "")) : 0,
        days: JSON.parse(row.dataset.days),
        time: row.dataset.time
      };

      localStorage.setItem("selectedRide", JSON.stringify(rideData));
      window.location.href = "Ride_Details.html";
    }
  });
});
