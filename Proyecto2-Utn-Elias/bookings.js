document.addEventListener("DOMContentLoaded", () => {
    const bookingsTableBody = document.getElementById("bookingsTableBody");

    // Usuario logeado actualmente
    const loggedUser = localStorage.getItem("loggedUser"); // por ejemplo el username
    if (!loggedUser) return; // nadie logeado, no mostrar nada

    // Obtener todas las solicitudes guardadas
    let requests = JSON.parse(localStorage.getItem("rideRequests")) || [];

    // Filtrar solicitudes donde el ride pertenece al driver logeado
    const myRequests = requests.filter(req => req.ride.driverName === loggedUser);

    // Función para renderizar las solicitudes
    function renderRequests() {
        bookingsTableBody.innerHTML = "";
        if (myRequests.length === 0) {
            bookingsTableBody.innerHTML = `<tr><td colspan="3" style="text-align:center;">No bookings found.</td></tr>`;
            return;
        }

        myRequests.forEach((req, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="driver-cell">
                    <img src="img/LogoPersona.png" class="user-icon-small" alt="User Icon">
                    ${req.userName}
                </td>
                <td>${req.ride.departure} - ${req.ride.arrive} (${req.ride.time})</td>
                <td>
                    <a href="#" class="accept-link" data-index="${index}">Accept</a> | 
                    <a href="#" class="reject-link" data-index="${index}">Reject</a>
                </td>
            `;
            bookingsTableBody.appendChild(row);
        });
    }

    // Manejo de aceptar/rechazar
    bookingsTableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("accept-link") || e.target.classList.contains("reject-link")) {
            e.preventDefault();
            const index = parseInt(e.target.dataset.index);
            myRequests.splice(index, 1); // eliminar la solicitud
            localStorage.setItem("rideRequests", JSON.stringify(requests)); // actualizar storage
            renderRequests();
        }
    });

    renderRequests();
});
