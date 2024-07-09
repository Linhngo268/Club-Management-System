// eslint-disable-next-line no-unused-vars, no-undef
var Id=[];
    var eventName=[];
                var eventHappen=[];
                var eventDes=[];

const users_mr_vue = Vue.createApp({
    data() {
        return {
            // Information about the club
            club_info: {},
            club_events: [],
            club_updates: [],
            eventReservations: {},
            // All the query parameters
            query_parameters: [],

            // The id of the current club we are working with
            working_club_id: 1
        };
    },

    created() {
        const params = new URLSearchParams(window.location.search);

        params.forEach((value, key) => {
            this.query_parameters[key] = value;
        });

        if ('club_id' in this.query_parameters) {
            // Assign the club_id value to the working_club_id attribute
            this.working_club_id = parseInt(this.query_parameters.club_id, 10);
        }
    },

    methods: {
        get_clubinfo: function () {
            let req = new XMLHttpRequest();
            const vue_this = this;

            req.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    // eslint-disable-next-line prefer-destructuring
                    vue_this.club_info = JSON.parse(req.response)[0];
                    vue_this.edited_club_description = vue_this.club_info.description;
                } else {
                    vue_this.club_info = {
                        name: "Unknown Club",
                        description: "..."
                    };
                }
            };

            let url = new URL("/get_clubinfo", window.location.href);
            let params = new URLSearchParams(url.search);

            params.append("club_id", this.working_club_id);

            url.search = params.toString();

            req.open("GET", url.toString());
            req.send();
        },
        get_eventinfo: function () {
            let req = new XMLHttpRequest();
            const vue_this = this;

            req.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    vue_this.club_events = JSON.parse(req.response);
                } else {
                    vue_this.club_events = [];
                }
            };

            let url = new URL("/get_eventinfo", window.location.href);
            let params = new URLSearchParams(url.search);

            params.append("club_id", this.working_club_id);

            url.search = params.toString();

            req.open("GET", url.toString());
            req.send();
        },
        get_eventupdates: function () {
            let req = new XMLHttpRequest();
            const vue_this = this;

            req.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    vue_this.club_updates = JSON.parse(req.response);
                } else {
                    vue_this.club_updates = [];
                }
            };

            let url = new URL("/get_eventupdates", window.location.href);
            let params = new URLSearchParams(url.search);

            params.append("club_id", this.working_club_id);

            url.search = params.toString();

            req.open("GET", url.toString());
            req.send();
        },
        get_all_club_info: function () {
            this.get_clubinfo(this.working_club_id);
            this.get_eventinfo(this.working_club_id);
            this.get_eventupdates(this.working_club_id);

        },
            sendEmail: function(eventId,eventname,eventhappen,eventdes) {

                var EventId = document.getElementsByClassName("eventid");

                // Using getElementsByClassName
                for (var i = 0; i < EventId.length; i++) {
                  var id = EventId[i];
                  console.log(id);

                }
                 Id=eventId;
                 eventName=eventname;
                 eventHappen=eventhappen;
                 eventDes=eventdes;

console.log(Id);
console.log(eventName);
console.log(eventHappen);
console.log(eventDes);


          // Disable the button after it is pressed

              // Make an HTTP POST request to the server endpoint
              fetch('/reserveEvent1', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
id:Id,
name:eventName,
happening:eventHappen,
description:eventDes


                })
              })
                .then((response) => {
                  if (response.ok) {
                    console.log("Email sent successfully");


        // Update the reserved status for the corresponding event


        // Disable the button after it is pressed

                  } else {
                    console.error('Failed to send email');
                  }
                })
                .catch((error) => {
                  console.error('Error sending email:', error);
                });
            }

}
}).mount('#app');

  // email and id session to show up on club_page
  fetch('/api/user')
    .then((response) => response.json())
    .then((data) => {
      // Update the HTML elements with the retrieved data
      document.getElementById('email').innerText = 'Username: ' + data.email;
      document.getElementById('user_id').innerText = 'ID: ' + data.id;
    })
    .catch((error) => console.error(error));

    function showPopup( ) {
        var popup = document.getElementById("popup");
        var timeNow = new Date().toLocaleString();

        // Update the popup content dynamically
        var popupContent = `
          <span class="close" onclick="closePopup()">&times;</span>
          <p>You have reserved for:</p>
          <p><strong>Event ID:</strong> ${Id}</p>
          <p><strong>Event Name:</strong> ${eventName}</p>
          <p><strong>Event Happening:</strong> ${eventHappen}</p>
          <p><strong>Event Description:</strong> ${eventDes}</p>
          <p><strong>Reservation Time:</strong> ${timeNow}</p>
        `;
        popup.innerHTML = popupContent;

        if (document.getElementById("email").innerText === "") {
          popup.style.display = "none";
          window.location.href = "/signin_signup.html";
        } else {

          popup.style.display = "block";
          popup.style.color= "white";
          popup.style.backgroundColor="#296b6d";
          // Disable the button after it is pressed

        }
      }
    function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
    }
