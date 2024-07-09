fetch('/user')
      .then(response => response.json())
      .then(userData => {
        document.getElementById('first-name').value = userData.firstName;
        document.getElementById('last-name').value = userData.lastName;
        document.getElementById('username').value = userData.userName;
        document.getElementById('id').value = userData.Id;
        document.getElementById('phone_number').value = userData.phoneNumber;
        document.getElementById('email').value = userData.email;
        document.getElementById('Current_password').value=userData.passWord;

      })
      .catch(error => console.log(error));

      document.getElementById('save').addEventListener('click', (event) => {
        // Get the new values from the input fields
        event.preventDefault();
        var newFirstName = document.getElementById('new_first_name').value;
        var newLastName = document.getElementById('new_last_name').value;
       var newUsername = document.getElementById('new_username').value;

       var newPhoneNumber = document.getElementById('new_phone_number').value;
       var newEmail = document.getElementById('new_email').value;
       var newPassword = document.getElementById('new_password').value;

        // Create a payload object with the new values

       var payload = {
          newFirstName,
          newLastName,
          newUsername,

          newPhoneNumber,
          newEmail,
          newPassword
        };

        // Send a PUT request to update the user information
        fetch('/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
        .then(function(response) {
            if (response.ok) {
              alert('information updated sucessully');

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



