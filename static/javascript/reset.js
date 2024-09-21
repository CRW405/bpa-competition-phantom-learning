function resetSearch() {
	input = document.getElementById("SeachButton");
    filter = input.value.toUpperCase();
    table = document.getElementById("teacher_table");
    tbody = table.getElementsByTagName("tbody");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tbody[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tbody[i].style.display = "";
            } else {
                tbody[i].style.display = "none";
            }
        }
    }
}