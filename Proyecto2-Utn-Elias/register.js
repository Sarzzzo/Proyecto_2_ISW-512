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
  const role = false;

  // Validar campos vacíos
  if (!firstName || !lastName || !email || !password || !repeatPassword || !address || !country || !state || !city || !phone) {
    alert('Please fill in all fields.');
    return;
  }

  // Validar que las contraseñas coincidan
  if (password !== repeatPassword) {
    alert('Passwords do not match. Please try again.');
    return;
  }

  // Obtener usuarios existentes o crear nuevo array
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Validar si ya existe un usuario con el mismo email
  const emailExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    alert('This email is already registered. Please use a different email.');
    return;
  }

  // Crear objeto de usuario
  const userData = {
    firstName,
    lastName,
    email,
    password,
    address,
    country,
    state,
    city,
    phone,
    role
  };

  users.push(userData);

  // Guardar en localStorage
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registration successful, welcome!');
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
