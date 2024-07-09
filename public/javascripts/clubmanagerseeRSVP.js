window.addEventListener('DOMContentLoaded', function() {
    var rsvpList = document.getElementById('rsvpList');
    var rsvpCount = rsvpList.getElementsByTagName('li').length;
    var countText = document.createTextNode('RSVP count: ' + rsvpCount);
    var countParagraph = document.createElement('p');
    countParagraph.appendChild(countText);
    document.body.appendChild(countParagraph);
});