let answer_1;
let answer_2;
let answer_3;
let answer_4;
let answer_5;
let answer_6;
let answer_7;
let answer_8;
let answer_9;
let answer_10;
let total = 0;
let div = document.getElementById("quiz_div")

function check() {
    answer_1 = document.querySelector("input[type=radio][name=Question1]:checked").value;
    answer_2 = document.querySelector("input[type=radio][name=Question2]:checked").value;
    answer_3 = document.querySelector("input[type=radio][name=Question3]:checked").value;
    answer_4 = document.querySelector("input[type=radio][name=Question4]:checked").value;
    answer_5 = document.querySelector("input[type=radio][name=Question5]:checked").value;
    answer_6 = document.querySelector("input[type=radio][name=Question6]:checked").value;
    answer_7 = document.querySelector("input[type=radio][name=Question7]:checked").value;
    answer_8 = document.querySelector("input[type=radio][name=Question8]:checked").value;
    answer_9 = document.querySelector("input[type=radio][name=Question9]:checked").value;
    answer_10 = document.querySelector("input[type=radio][name=Question10]:checked").value;
}

function answers() {
    if (confirm("Are you sure you want to submit? If so Press OK. Otherwise press cancel")) {
        calculate();
        div.innerHTML = '<div id="title_span"> <h1 id="quiz_title">Quiz One: HTML CSS Results</h1><hr> <h1 id="quiz_results"> </h1></div>';
        document.getElementById("quiz_results").innerHTML = total + "%";
        document.getElementById("finish-to-exit").innerHTML = '<button class="lesson_buttons" name="Exit Test Button" id="exit_button" onclick="finish()"> EXIT </button>'
    }

    else {
        ""
    }
}

function calculate() {

    // Q1
    if (answer_1 == "Option 1") {
        total += 10;
    }

    else if (answer_1 != "Option 1") {
        total += 0;
    };

    // Q2
    if (answer_2 == "Option 1") {
        total += 10;
    }

    else if (answer_2 != "Option 1") {
        total += 0;
    };

    // Q3
    if (answer_3 == "Option 3") {
        total += 10;
    }

    else if (answer_3 != "Option 3") {
        total += 0;
    };

    // Q4
    if (answer_4 == "Option 1") {
        total += 10;
    }

    else if (answer_4 != "Option 1") {
        total += 0;
    };

    // Q5
    if (answer_5 == "Option 4") {
        total += 10;
    }

    else if (answer_5 != "Option 4") {
        total += 0;
    };

    // Q6
    if (answer_6 == "Option 2") {
        total += 10;
    }

    else if (answer_6 != "Option 2") {
        total += 0;
    };

    // Q7
    if (answer_7 == "Option 1") {
        total += 10;
    }

    else if (answer_7 != "Option 1") {
        total += 0;
    };

    // Q8
    if (answer_8 == "Option 4") {
        total += 10;
    }

    else if (answer_8 != "Option 4") {
        total += 0;
    };

    // Q9
    if (answer_9 == "Option 4") {
        total += 10;
    }

    else if (answer_9 != "Option 4") {
        total += 0;
    };

    // Q10
    if (answer_10 == "Option 3") {
        total += 10;
    }

    else if (answer_10 != "Option 3") {
        total += 0;
    };
}

function finish() {
    grade = total
    fetch('/submit_grade', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ grade }),
    }).then(response => {
        if (response.ok) {
            window.location.href = '/student'
        } else {
            alert('There was an error saving your progress, try again')
        }
    }).catch(error => {
        alert('There was an error saving your progress, try again')
    })
}

