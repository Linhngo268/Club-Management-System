/* eslint-disable no-alert */
document.getElementById("new_admin").addEventListener('submit', function(event) {
    event.preventDefault();

    var Firstname = document.getElementById('new_admin_first_name').value;
    var Lastname = document.getElementById('new_admin_last_name').value;
    var Username = document.getElementById('new_admin_username').value;
    var Admin_id= document.getElementById('admin_id').value;
    var Phone = document.getElementById('phone').value;
    var Email = document.getElementById('email').value;
    var Password = document.getElementById('password').value;



    var admin = {
      first_name: Firstname,
      last_name: Lastname,
      username: Username,
      admin_id: Admin_id,
       phone: Phone,
       email: Email,
      password: Password


    };

    fetch('/new_admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(admin)
    })
    .then(function(response) {
      if (response.ok) {
        alert('succesfully add new admin');
        window.location.href= "./main.html?logged_in=true";
        // Redirect to a different page or perform other actions as needed
      } else {
        alert('Invalid');
      }
    })
    .catch(function(error) {
      // eslint-disable-next-line no-console
      console.error('Error:', error);
    });

});
