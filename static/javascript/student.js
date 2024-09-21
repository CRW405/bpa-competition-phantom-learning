locked = document.getElementsByClassName('locked')
unlocked = document.getElementsByClassName('unlocked')

for (var i = 0; i < locked.length; i++) {
    id = locked[i].id
    document.getElementById(id).removeAttribute('id')
    locked[i].classList.add('locked');
}

// This helps to decide whether it is displayed or not for the Html/css section
let html_css_dropdown_counter = false;

// Carries the actual process
function html_css_dropdown(access) {
    // If nothing is displayed then make the buttons
    // Html and CSS stuff
    if (html_css_dropdown_counter == false) {
        for (let i = 1; i < 4; i++) {
            document.getElementById('Span_' + i).style.display = "block";
        }
        if (access == 'locked') {
            document.getElementById('lesson').style.display = "none"
            document.getElementById('activity').style.display = "none"
            document.getElementById('quiz').style.display = "none"
        }

        // this makes sure that no that is dose not make multiple
        html_css_dropdown_counter = true;

    }

    // If it is open then this deletes the buttons
    else if (html_css_dropdown_counter == true) {
        for (let i = 1; i < 4; i++) {
            document.getElementById('Span_' + i).style.display = "none";
        }
        // this changes to make sure to make some next time
        html_css_dropdown_counter = false;
    }
}

// This helps to decide whether it is displayed or not for the JavaScript section
let javascript_dropdown_counter = false;
// Carries the actual process
function javascript_dropdown(access) {

    // If nothing is displayed then make the buttons
    if (javascript_dropdown_counter == false) {
        for (let i = 4; i < 7; i++) {
            document.getElementById('Span_' + i).style.display = "block";
        }
        if (access == 'locked') {
            document.getElementById('jsLesson').style.display = "none"
            document.getElementById('jsActivity').style.display = "none"
            document.getElementById('jsQuiz').style.display = "none"
        }

        // this makes sure that no that is dose not make multiple
        javascript_dropdown_counter = true;
    }

    // If it is open then this deletes the buttons
    else if (javascript_dropdown_counter == true) {
        for (let i = 4; i < 7; i++) {
            document.getElementById('Span_' + i).style.display = "none";
        }

        // this changes to make sure to make some next time
        javascript_dropdown_counter = false;
    }
}

// This helps to decide wheather it is desplad or not for the Python section
let python_dropdown_counter = false;
// Carrys the actual prosess
function python_dropdown(access) {
    // If nothing is displayed then make the buttons
    if (python_dropdown_counter == false) {
        // document.getElementsByClassName('Python_btn').style.display = "block";
        for (let i = 7; i < 10; i++) {
            document.getElementById('Span_' + i).style.display = "block";
        }
        if (access == 'locked') {
            document.getElementById('pyLesson').style.display = "none"
            document.getElementById('pyActivity').style.display = "none"
            document.getElementById('pyQuiz').style.display = "none"
        }
        // this makes sure that no that is dose not make multiple
        python_dropdown_counter = true;
    }

    // If it is open then this deletes the buttons
    else if (python_dropdown_counter == true) {

        for (let i = 7; i < 10; i++) {
            document.getElementById('Span_' + i).style.display = "none";
        }
        // this changes to make sure to make some next time
        python_dropdown_counter = false;
    }
}

