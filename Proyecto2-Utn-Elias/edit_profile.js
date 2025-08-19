document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("editProfileForm");
  const driverFieldsContainer = document.getElementById("driverFields");

  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  if (!loggedUser) {
    alert("No user logged in.");
    window.location.href = "index.html";
    return;
  }

  // Rellenar los campos comunes
  document.getElementById("firstName").value = loggedUser.firstName || "";
  document.getElementById("lastName").value = loggedUser.lastName || "";
  document.getElementById("email").value = loggedUser.email || "";
  document.getElementById("password").value = loggedUser.password || "";
  document.getElementById("repeatPassword").value = loggedUser.password || "";
  document.getElementById("address").value = loggedUser.address || "";
  document.getElementById("country").value = loggedUser.country || "";
  document.getElementById("state").value = loggedUser.state || "";
  document.getElementById("city").value = loggedUser.city || "";
  document.getElementById("phone").value = loggedUser.phone || "";

  // Si es driver, mostrar campos adicionales
  if (loggedUser.role === true) {
    driverFieldsContainer.innerHTML = `
      <div class="fila-doble">
        <div class="campo">
          <label for="brand">Car Brand</label>
          <input type="text" id="brand" name="brand" required>
        </div>
        <div class="campo">
          <label for="model">Car Model</label>
          <input type="text" id="model" name="model" required>
        </div>
      </div>
      <div class="fila-doble">
        <div class="campo">
          <label for="year">Year</label>
          <input type="text" id="year" name="year" required>
        </div>
        <div class="campo">
          <label for="plate">Plate</label>
          <input type="text" id="plate" name="plate" required>
        </div>
      </div>
    `;

    // Rellenar datos existentes
    document.getElementById("brand").value = loggedUser.brand || "";
    document.getElementById("model").value = loggedUser.model || "";
    document.getElementById("year").value = loggedUser.year || "";
    document.getElementById("plate").value = loggedUser.plate || "";
  }

  // Guardar cambios al dar submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    loggedUser.firstName = document.getElementById("firstName").value.trim();
    loggedUser.lastName = document.getElementById("lastName").value.trim();
    loggedUser.email = document.getElementById("email").value.trim();
    loggedUser.password = document.getElementById("password").value;
    loggedUser.address = document.getElementById("address").value.trim();
    loggedUser.country = document.getElementById("country").value;
    loggedUser.state = document.getElementById("state").value.trim();
    loggedUser.city = document.getElementById("city").value.trim();
    loggedUser.phone = document.getElementById("phone").value.trim();

    if (loggedUser.role === true) {
      loggedUser.brand = document.getElementById("brand").value.trim();
      loggedUser.model = document.getElementById("model").value.trim();
      loggedUser.year = document.getElementById("year").value.trim();
      loggedUser.plate = document.getElementById("plate").value.trim();
    }

    // Actualizar en su array correspondiente
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let drivers = JSON.parse(localStorage.getItem("drivers")) || [];

    if (loggedUser.role === true) {
      const idx = drivers.findIndex(d => d.email === loggedUser.email);
      if (idx !== -1) drivers[idx] = loggedUser;
      localStorage.setItem("drivers", JSON.stringify(drivers));
    } else {
      const idx = users.findIndex(u => u.email === loggedUser.email);
      if (idx !== -1) users[idx] = loggedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }

    // Actualizar sesión
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

    alert("Profile updated successfully!");
    window.location.href = "Home_Main.html";
  });
});
