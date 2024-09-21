function myFunction() {
	input = document.getElementById("SeachButton");
    filter = input.value.toUpperCase();
    table = document.getElementById("teacher_table");
    tbody = table.getElementsByTagName("tbody");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tbody[i].getElementsByTagName("td")[0];
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

let countdown = 1 // we use this count down to refresh the page because it takes a little time for the actions to be done and have the app reflect the update
function startTimer() {
	countdown--
	if (countdown >= 0) {
		setTimeout(startTimer, 100)
	} else {
		location.reload()
	}
}

function statusFunction(x, y, z) {
	const data = {
		user: x,
		section: y,
		access: z,
	}

	fetch("/update_access", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			if (response.ok) {
				return response.json()
			} else {
			}
		})
	startTimer()
}

function deleteStudent(email) {
	if (confirm("Are you sure you want to delete Student?")) {
		fetch("/delete_Student", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(email),
		})
		return response.json()
	}
	startTimer()
}


