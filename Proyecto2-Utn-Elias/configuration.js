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

  publicNameInput.value = loggedUser.publicName || "";
  publicBioInput.value = loggedUser.publicBio || "";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    loggedUser.publicName = publicNameInput.value.trim();
    loggedUser.publicBio = publicBioInput.value.trim();

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
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

    alert("Configuration saved!");
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
