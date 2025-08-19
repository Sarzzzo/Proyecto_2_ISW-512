document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("configForm");
  const publicNameInput = document.getElementById("publicName");
  const publicBioInput = document.getElementById("publicBio");

  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  if (!loggedUser) {
    alert("No user logged in.");
    window.location.href = "index.html";
    return;
  }

  // Pre-cargar si ya existen
  publicNameInput.value = loggedUser.publicName || "";
  publicBioInput.value = loggedUser.publicBio || "";

  // Guardar cambios
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    loggedUser.publicName = publicNameInput.value.trim();
    loggedUser.publicBio = publicBioInput.value.trim();

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

    alert("Configuration saved!");
    window.location.href = "Rides_Main.html";
  });
});
