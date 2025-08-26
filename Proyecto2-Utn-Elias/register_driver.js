document.addEventListener('DOMContentLoaded', function () {
  // Asegura que el DOM esté cargado antes de añadir eventos
  document.getElementById('registration_form')
    .addEventListener('submit', function (event) {
      event.preventDefault(); // Evita envío del formulario
      storeInputs(); // Ejecuta lógica de almacenamiento
    });
});

function storeInputs() {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const repeatPassword = document.getElementById('repeatPassword').value;
  const address = document.getElementById('address').value.trim();
  const country = document.getElementById('country').value;
  const state = document.getElementById('state').value.trim();
  const city = document.getElementById('city').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const brand = document.getElementById('brand').value.trim();
  const model = document.getElementById('model').value.trim();
  const year = document.getElementById('year').value.trim();
  const plate = document.getElementById('plate').value.trim();
  const role = true;

  // Validar campos vacíos
  if (!firstName || !lastName || !email || !password || !repeatPassword || !address || !country || !state || !city || !phone || 
    !brand || !model || !year || !plate)  {
    alert('Please fill in all fields.');
    return;
  }

  // Validar que las contraseñas coincidan
  if (password !== repeatPassword) {
    alert('Passwords do not match. Please try again.');
    return;
  }

  // Crear objeto de driver
  const driversData = {
    firstName,
    lastName,
    email,
    password,
    address,
    country,
    state,
    city,
    phone,
    brand,
    model,
    year,
    plate,
    role
  };

  // Obtener usuarios existentes o crear nuevo array
  let drivers = JSON.parse(localStorage.getItem('drivers'));
  if (drivers) {
    drivers.push(driversData);
  } else {
    drivers = [driversData];
  }


  // Guardar en localStorage
  localStorage.setItem('drivers', JSON.stringify(drivers));
  alert('Registration successful!');
  // (Opcional) Resetear formulario
  document.getElementById('registration_form').reset();
}
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
