// done
var lesson = document.getElementById("progress_bar").value;

// go back in lesson
function back_lesson() {
  lesson = Number(lesson) - 1;
  document.getElementById("progress_bar").value = lesson;
  Lesson(lesson);
}

// Moves forward in lesson
function next_lesson() {
  lesson = Number(lesson) + 1;
  document.getElementById("progress_bar").value = lesson;
  Lesson(lesson);
}

function Lesson() {
  var div = document.getElementById("lesson_div");


  if (lesson == 1) {
    div.innerHTML =
      "<img src='static/Images/0001.jpg' alt='no' width='100%' class = 'py_img';>";
    document.getElementById("back_button").disabled = true;
  }

  else if (lesson == 2) {
    div.innerHTML =
      "<img src='static/Images/0002.jpg' alt='no' width='100%' class = 'py_img';>";
    document.getElementById("back_button").disabled = false;
  }

  else if (lesson == 3) {
    div.innerHTML =
      "<img src='static/Images/0003.jpg' alt='no' width='100%' class = 'py_img';>";
  }

  else if (lesson == 4) {
    div.innerHTML =
      "<img src='static/Images/0004.jpg' alt='no' width='100%' class = 'py_img';>";
  }

  else if (lesson == 5) {
    div.innerHTML =
      "<img src='static/Images/0005.jpg' alt='no' width='100%' class = 'py_img';>";
  }

  else if (lesson == 6) {
    div.innerHTML =
      "<img src='static/Images/0006.jpg' alt='no' width='100%' class = 'py_img';>";
  }

  else if (lesson == 7) {
    div.innerHTML =
      "<img src='static/Images/0007.jpg' alt='no' width='100%' class = 'py_img';>";
  }

  else if (lesson == 8) {
    div.innerHTML =
      "<img src='static/Images/0008.jpg' alt='no' width='100%' class = 'py_img';>";

    // Changes Back to Next Button
    document.getElementById("next_to_finished").innerHTML = '<button class="lesson_buttons" name="Next Button" id="next_button" onclick="next_lesson()">Next <i class="fa-solid fa-forward"></i></button>'

    // Changes Bar Back to Yellow
    document.getElementById("lesson_style").innerHTML =
      "#progress_bar{width: 50%;text-align: center;background-color: black ;border: 1px solid black;border-radius: 20px;}#progress_bar::-webkit-progress-bar {background-color: black;border-radius: 20px}progress::-webkit-progress-value { background-color: #FFDDB1;;border-radius: 20px;}"
      ;
  }

  else if (lesson == 9) {

    div.innerHTML =
      '<img src="static/Images/0009.jpg" alt="no" width="100%" class = "py_img";>';;

    // Changes to Finished Button
    // document.getElementById("next_to_finished").innerHTML = "<a href= '{{ url_for('static', filename='student')}}'><button class='lesson_buttons' name='Finished Button'>Exit <i class='fa-solid fa-door-open'></i> </button></a>"

    document.getElementById("finish").disabled = false;

    // Changes Bar to Green
    document.getElementById("lesson_style").innerHTML =
      "#progress_bar{width: 50%;text-align: center;background-color: black ;border: 1px solid black;border-radius: 20px;}#progress_bar::-webkit-progress-bar {background-color: black;border-radius: 20px}progress::-webkit-progress-value { background-color: lightgreen;;border-radius: 20px;}"
  }

}

function finish() {
  grade = 100
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

