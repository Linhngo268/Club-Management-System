function handleEditDescription() {
    const description = document.getElementById("club-description");
    description.contentEditable = "true";
    description.focus();
}

function handleEditEvents() {
    const events = document.getElementById("club-events");
    events.contentEditable = "true";
    events.focus();
}

function handleEditUpdates() {
    const updates = document.getElementById("club-updates");
    updates.contentEditable = "true";
    updates.focus();
}
document.getElementById("edit-description-button").addEventListener("click", handleEditDescription);
document.getElementById("edit-events-button").addEventListener("click", handleEditEvents);
document.getElementById("edit-updates-button").addEventListener("click", handleEditUpdates);