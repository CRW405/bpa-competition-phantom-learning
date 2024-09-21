// controls the logo btn on the headers
function logout() {
    if (confirm('are you sure you want to log out?')) {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.ok) {
                window.location.href = '/'
            } else {
                alert('There was an error logging out, try again')
            }
        }).catch(error => {
            alert('There was an error logging out, try again')
        })
    }
}

