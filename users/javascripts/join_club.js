/* eslint-disable no-use-before-define */
/* eslint-disable no-console */





/* eslint-disable no-alert */
fetch('/join')
      .then((response) => response.json())
      .then((userData) => {
        document.getElementById('Firstname').value = userData.firstName;
        document.getElementById('Lastname').value = userData.lastName;
        document.getElementById('username').value = userData.userName;
        document.getElementById('Current_password').value = userData.currentPassword;

      })
      .catch((error) => console.log(error));

      document.addEventListener('DOMContentLoaded', populateClubOptions);

      async function populateClubOptions() {
        const selectElement = document.getElementById('join_club');

        try {
          const response = await fetch('/clubs'); // Route to fetch clubs from the server
          const clubs = await response.json();

          clubs.forEach((club) => {
            const option = document.createElement('option');
            option.textContent = club.name;
            selectElement.appendChild(option);
          });
        } catch (error) {
          console.error('Error:', error);
        }
      }


  document.getElementById('joinclub').addEventListener('click', (event) => {
    // Get the new values from the input fields
    event.preventDefault();
   const selectElement= document.getElementById('join_club');
   const selectedOption = selectElement.value;
    // Create a payload object with the new values
    for (let i = 0; i < selectElement.length; i++) {
     // eslint-disable-next-line no-unused-expressions
     selectElement[i].value === selectedOption;
    }
    console.log(selectedOption);
    var payload ={selectedOption}
    // Send a PUT request to update the user information
    fetch('/joinclub', {
      method: 'POST',
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




