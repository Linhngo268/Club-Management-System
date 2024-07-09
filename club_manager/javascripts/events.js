/* eslint-disable no-alert */
document.getElementById('event').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('EventName').value;
    var eventDetails = document.getElementById('eventDetails').value;
    var eventDate = document.getElementById('eventDate').value;

    var user = {
      name: name,
      description: eventDetails,
      happening: eventDate
    };

    fetch('/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(function(response) {
      if (response.ok) {
        alert('event updated successfully');
        // Redirect to a different page or perform other actions as needed
      } else {
        alert('event update failed');
      }
    })
    .catch(function(error) {
      // eslint-disable-next-line no-console
      console.error('Error:', error);
    });
  });


document.getElementById('updatesF').addEventListener('submit', function(event) {
    event.preventDefault();

    var updated_event = document.getElementById('updates').value;

    var updated = {
        updates: updated_event
    };

    fetch('/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updated)
    })
    .then(function(response) {
      if (response.ok) {
        alert('updated successfully');
        window.location.href= "./club.html";
        // Redirect to a different page or perform other actions as needed
      } else {
        alert('updated failed');
      }
    })
    .catch(function(error) {
      // eslint-disable-next-line no-console
      console.error('Error:', error);
    });
  });
