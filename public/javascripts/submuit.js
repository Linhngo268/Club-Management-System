/* eslint-disable no-alert */
/* Makes the user go to the home page */
// eslint-disable-next-line no-unused-vars
function goHome() {
  window.location.href = "/main.html?logged_in=true";
}

// eslint-disable-next-line no-unused-vars
function do_google_login (response){
    window.location.href= "./main.html?logged_in=true";
}

// eslint-disable-next-line no-unused-vars
function keep_me_signed_in() {
  if (document.getElementById("remember_me").checked) {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
      event.preventDefault();

      var email = document.getElementById('UserName').value;
      var password = document.getElementById('Passowrd').value;
      var remember_me = document.getElementById('remember_me').checked;

      var user = {
        email: email,
        password: password,
        keepSignedIn: remember_me
      };

      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(function (response) {
          if (response.ok) {
            alert('Login successful');
            window.location.href = "/main.html?logged_in=true";
            // Redirect to a different page or perform other actions as needed
          } else {
            var errorPopup = document.getElementById('errorPopup');
            var errorMessage = document.getElementById('errorMessage');
            var closeErrorPopup = document.getElementById('closeErrorPopup');

            errorMessage.textContent = 'Invalid email or password, dont have an account? Sign up below';
            errorPopup.style.display = 'block';

            closeErrorPopup.addEventListener('click', function () {
              errorPopup.style.display = 'none';
            });
          }
        })
        .catch(function (error) {
          // eslint-disable-next-line no-console
          console.error('Error:', error);
        });
    });
  }
}


// eslint-disable-next-line no-unused-vars
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  var email = document.getElementById('UserName').value;
  var password = document.getElementById('Passowrd').value;
  var remember_me = document.getElementById('remember_me').checked;

  var user = {
    email: email,
    password: password,
    keepSignedIn: remember_me
  };

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(function(response) {
      if (response.ok) {
        alert('Login successful');
        window.location.href= "./main.html?logged_in=true";
        // Redirect to a different page or perform other actions as needed
      } else {
        alert('Invalid email or password');
      }
    })
    .catch(function (error) {
      // eslint-disable-next-line no-console
      console.error('Error:', error);
    });
});

