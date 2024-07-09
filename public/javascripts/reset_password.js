/* eslint-disable no-alert */
    document.getElementById('signupForm').addEventListener('submit', function(event) {
      event.preventDefault();

      var email = document.getElementById('email').value;
      var username = document.getElementById('ID').value;
      var passwordValidationMsg = document.getElementById('passwordValidationMsg');
      var pass = document.getElementById('pass').value;


      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      var rest = {
        email: email,
        username: username,
        password: pass
      };
      if (passwordRegex.test(pass)) {
      fetch('/reset_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rest)
      })
        .then(function(response) {
          if (response.ok) {
            // Handle success response
            var errorPopup1 = document.getElementById('errorPopup');
            var errorMessage2 = document.getElementById('errorMessage');
            var closeErrorPopup3 = document.getElementById('closeErrorPopup');

            errorMessage2.textContent = 'reset password successful';
            errorPopup1.style.display = 'block';

            closeErrorPopup3.addEventListener('click', function() {

              errorPopup1.style.display = 'none';
              window.location.href= "./main.html?logged_in=true";
            });

          } else {
            // Handle error response
            var errorPopup = document.getElementById('errorPopup');
            var errorMessage = document.getElementById('errorMessage');
            var closeErrorPopup = document.getElementById('closeErrorPopup');

            errorMessage.textContent = 'Invalid email or ID, please make sure you\'ve entered the correct information.';
            errorPopup.style.display = 'block';

            closeErrorPopup.addEventListener('click', function() {
              errorPopup.style.display = 'none';
            });
          }
        })
        .catch(function(error) {
          // Handle network or fetch API errors
          // eslint-disable-next-line no-console
          console.error('Error:', error);
        });
    } else{
      passwordValidationMsg.textContent = 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.';
    }
  });


