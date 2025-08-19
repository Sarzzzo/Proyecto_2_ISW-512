document.addEventListener('DOMContentLoaded', function () {
  // Escuchar el envío del formulario de login
  document.getElementById('login_form')
    .addEventListener('submit', function (event) {
      event.preventDefault();
      validateLogin();
    });
});

function validateLogin() {
  const emailInput = document.getElementById('username').value.trim();
  const passwordInput = document.getElementById('password').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];
  let drivers = JSON.parse(localStorage.getItem('drivers')) || [];

  let allAccounts = [...users, ...drivers];

  if (allAccounts.length === 0) {
    alert('No users registered. Please create an account.');
    return;
  }

  const foundUser = allAccounts.find(user => 
    user.email === emailInput && user.password === passwordInput
  );

  if (foundUser) {
    localStorage.setItem('loggedUser', JSON.stringify(foundUser));

    if (foundUser.role === true) {
      alert(`Welcome driver ${foundUser.firstName}`);
    } else {
      alert(`Welcome user ${foundUser.firstName}`);
    }

    window.location.href = 'Home_Main.html';
  } else {
    alert('Invalid email or password. Please try again.');
  }
}
