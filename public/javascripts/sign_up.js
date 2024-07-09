/* eslint-disable no-alert */
document.getElementById('signupForm').addEventListener('submit', function (event) {
  event.preventDefault();

  var first_name = document.getElementById('first_name').value;
  var last_name = document.getElementById('last_name').value;
  var email = document.getElementById('email').value;
  var user_id = document.getElementById('ID').value;
  var Phone = document.getElementById('Phone').value;
  var pass = document.getElementById('pass').value;
  // var confirmPassword = document.getElementById('passcon').value;
  var passwordValidationMsg = document.getElementById('passwordValidationMsg');

  // Define password requirements using regular expressions
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  var users = {
    first_name: first_name,
    last_name: last_name,
    username: user_id,
    email: email,
    password: pass,
    phone_number: Phone

  };

  if (passwordRegex.test(pass)) {

      fetch('/sign_up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(users)
      })
        .then(function (response) {
          if (response.ok) {
            alert('sign_up successful');
            window.location.href = "./main.html?logged_in=true";
            // Redirect to a different page or perform other actions as needed
          } else {
            alert('Invalid');
          }
        });
    } else{
            // Password and confirm password do not match
            passwordValidationMsg.textContent = 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.';
  }
});
