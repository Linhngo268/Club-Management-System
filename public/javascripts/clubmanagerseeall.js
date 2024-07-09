function searchTable() {
    var input = document.getElementById("search").value.toLowerCase();

    var rows = document.getElementById("memberTable").getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++) {
        var name = rows[i].getElementsByTagName("td")[0];
        if (name.innerHTML.toLowerCase().indexOf(input) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}
