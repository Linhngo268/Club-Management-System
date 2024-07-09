
        // Add event listeners to reserve and donate buttons
        // const reserveButtons = document.querySelectorAll('.reserve');

        // reserveButtons.forEach(button => {

        //     button.addEventListener('click', () => {
        //        alert('Reserved'+" " +"On"+" "+datetime );

        //     });


        //  });


        function showPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "block";
}
function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
  }

// Assuming you're using Fetch API for simplicity
const eventId = 1; // Replace with the event ID you want to retrieve
fetch(`/events/${eventId}`)
  .then((response) => response.json())
  .then((eventData) => {
    const nameElement = document.getElementById('name');
    const whenElement = document.getElementById('when');
    const describeElement = document.getElementById('describe');

    // Populate the <span> elements with the retrieved data
    nameElement.textContent = `  ${eventData.name}`;
    whenElement.textContent = `  ${eventData.happening}`;
    describeElement.textContent = ` ${eventData.description}`;
  })
  .catch((error) => console.error(error));

