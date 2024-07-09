// Function to submit
// eslint-disable-next-line no-unused-vars
function db_example_submit() {
    // Get form inputs
    let firstNameInput = document.getElementById("first_name");
    let lastNameInput = document.getElementById("last_name");
    let usernameInput = document.getElementById("username");
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    let phoneNumberInput = document.getElementById("phone_number");

    // Create a data object with the form inputs
    let data = {
        first_name: firstNameInput.value,
        last_name: lastNameInput.value,
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        phone_number: phoneNumberInput.value
    };

    // Clear the data
    firstNameInput.value = "";
    lastNameInput.value = "";
    usernameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    phoneNumberInput.value = "";

    // Send the data using AJAX
    let req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            // eslint-disable-next-line no-alert
            alert("All Good");
        } else if (req.readyState === 4 && req.status === 400) {
            // eslint-disable-next-line no-alert
            alert("Invalid Input");
        } else if (req.readyState === 4) {
            // eslint-disable-next-line no-alert
            alert(`Unexpected status of ${req.status}`);
        }
    };

    req.open('POST', '/db_example_create_user');
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(data));
}

// Function for the button to reload all the usernames
// eslint-disable-next-line no-unused-vars
function db_example_reload() {
    // Ask for the user information using AJAX
    let req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            const data = JSON.parse(req.response);

            let name_list = document.getElementById("db_example_all_users");
            name_list.innerHTML = "";

            for (const entry of data) {
                let list_item = document.createElement("li");

                list_item.innerText = `${entry.first_name} ${entry.last_name} - ${entry.username}`;

                name_list.appendChild(list_item);
            }
        }
    };

    req.open('GET', '/db_example_get_all_names');
    req.send();
}
