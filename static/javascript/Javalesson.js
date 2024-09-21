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
// the lesson for JavaScript
// controls all the slides
function Lesson() {
  var div = document.getElementById("lesson_div");

  if (lesson == 1) {
    div.innerHTML =
      "<h1 class = 'lesson_heading'> Welcome to the exciting world of JavaScript! </h1> <p class = 'lesson_paragraph'>  Whether you're a complete beginner or have some coding experience, this journey is designed to introduce you to the fundamentals of JavaScript in a simple and enjoyable way. Get ready to explore the language that powers interactivity on the web!</p>";
    document.getElementById("back_button").disabled = true;
  } else if (lesson == 2) {
    div.innerHTML =
      "<h1 class='lesson_heading'>Objectives</h1> <br> <ul class= 'lesson_bullets'> <li> Understand the basics of JavaScript </li> <li> Learn how to write and execute simple JavaScript code </li> <li> Gain familiarity with common JavaScript concepts </li> <li> Be able to apply JavaScript in practical scenarios </li> </ul>";
    document.getElementById("back_button").disabled = false;
  } else if (lesson == 3) {
    div.innerHTML =
      "<h1 class = 'lesson_heading'> Supplies Needed </h1> <ul class= 'lesson_bullets'> <li> Visual Studio Code </li> <li> A Writing tensil </li> <li> A notebook </li> </ul> ";
  } else if (lesson == 4) {
    div.innerHTML =
      '<center><video controls id="video"><source src="static/Videos/Javascript.mp4" type="video/mp4"><source src="static/Videos/Javascript.ogg" type="video/ogg"> Your browser does not support the video tag.</video></center>';
  } else if (lesson == 5) {
    div.innerHTML =
      '<div style = "width: 50%"><h1 class = "lesson_heading"> What is Javascript? </h1> <p class = "lesson_paragraph">   Welcome to the heart of our journey – the introduction to JavaScript. Imagine JavaScript as the wizard behind the curtain, magically bringing your web pages to life.' +
      " It's" +
      " a programming language designed for creating dynamic, interactive, and responsive online experiences. From validating forms to updating content on the fly, JavaScript is the tool that adds the" +
      "'wow'" +
      "factor to the web. In this section," +
      "we'll" +
      "unravel the mystery behind JavaScript, exploring its role and importance in the vast landscape of web development.  " +
      '</p> </div>"' +
      '<img src="static/Images/javascript_example5.png" alt="html_css_example_1" width="40%" class = "lesson_img">';
  } else if (lesson == 6) {
    div.innerHTML =
      "<h1 class = 'lesson_heading'> What is a Function? </h1> <p class = 'lesson_paragraph'> Functions are the superheroes of JavaScript, and this slide is your gateway to unleashing their power! Think of functions as reusable blocks of code that perform specific tasks.  Whether it's a simple calculation or a complex operation, functions allow you to organize your code into manageable, modular pieces. </p>" +
      '<img src="static/Images/javascript_example4.png" alt="css example" class="lesson_img_sq" style = "border: transparent">';
  } else if (lesson == 7) {
    div.innerHTML =
      '<div style = "width: 50%"> <ul class = "lesson_paragraph"> <li><span class="lesson_vocab">function greet(name) { ... }:</span> This declares a function named greet that takes a parameter name. The function body contains the logic to concatenate the name parameter with a greeting message</li> <li><span class="lesson_vocab">var greeting = greet ' +
      "('World')" +
      ":</span> This line calls the greet function with the argument" +
      " 'World'." +
      'The function returns the concatenated greeting, and the result is stored in the variable greeting.</li> <li><span class="lesson_vocab">console.log(greeting): </span> Finally, this line prints the value stored in the greeting variable to the console. In this example, it would output "Hello, World!"</li> </ul> </div>' +
      '<img src="static/Images/javascript_example3.png" alt="html_css_example_1" width="40%" class = "lesson_img">';
  } else if (lesson == 8) {
    div.innerHTML =
      "<h1 class = 'lesson_heading'> What are Variables? </h1> <p class = 'lesson_paragraph'> Imagine variables as containers that hold valuable information, and data types as the various forms that information can take. In this slide, we'll explore the fundamental concept of variables, teaching you how to store and manage data effectively. We'll also delve into different data types like strings, numbers, and booleans, laying the groundwork for building dynamic and responsive code.  In JavaScript, you declare a variable using <span class='lesson_vocab'>var,</span> <span class='lesson_vocab'>let,</span> or <span class='lesson_vocab'>const,</span> followed by the variable name. JavaScript supports various data types: </p> <br> <div style = 'width: 50%'> </div>" +
      '<img src="static/Images/javascript_example2.png" alt="variable example" class="lesson_img_sq" style = "float: center" >';
  } else if (lesson == 9) {
    div.innerHTML =
      "<div style =" +
      '"width: 50%">' +
      "<h1 class='lesson_vocab'> Data Types Examples:</h1> <p class = 'lesson_paragraph'> Understanding variables and data types is foundational for effective coding. Now, armed with this knowledge, let's explore further into the world of JavaScript! </p> <ul class = 'lesson_paragraph'> <li><span class='lesson_vocab'>Strings:</span> Represent text and are enclosed in single or double quotes.</li> <li><span class='lesson_vocab'>Numbers:</span> Represent numerical values, both integers and decimals.</li> <li><span class='lesson_vocab'>Booleans:</span>Represent true or false values.</li> </ul> </div>" +
      '<img src="static/Images/javascript_example.png" alt="create css file" class="lesson_img_sq">';
  } else if (lesson == 10) {
    div.innerHTML =
      "<h1 class='lesson_heading'>Arithmetic & Assignment Operators:</h1> <div style =" +
      '"width: 50%">' +
      " <p class = 'lesson_paragraph'> JavaScript supports standard arithmetic operators:</p> <ul class = 'lesson_paragraph'> <li><span class='lesson_vocab'>Addition (+)</span></li> <li><span class='lesson_vocab'>Subtraction (-)</span></li> <li><span class='lesson_vocab'>Multiplication (*)</span></li>  <li><span class='lesson_vocab'>Division (/)</span></li> <li><span class='lesson_vocab'>Modulus (%)</span> (returns the remainder of a division)</li> </ul> <p class = 'lesson_paragraph'> JavaScript supports standard assignment operators:</p> <ul class = 'lesson_paragraph'> <li><span class='lesson_vocab'>Assignment (=)</span></li> <li><span class='lesson_vocab'>Addition Assignment (+=)</span></li> <li><span class='lesson_vocab'>Subtraction Assignment (-=)</span></li>  <li><span class='lesson_vocab'>Multiplication Assignment (*=)</span></li> <li><span class='lesson_vocab'>Division Assignment (/=)</span></li> <li><span class='lesson_vocab'>Modulus Assignment (%=)</span></li> </ul></div></div>" +
      '<br> <br> <img src="static/Images/javascript_example6.png" class="lesson_img_sq" alt = "Arithmetic Operators example">';
  } else if (lesson == 11) {
    div.innerHTML =
      "<div style =" +
      '"width: 50%">' +
      "<h1 class='lesson_heading'>What are Loops?</h1> <p class = 'lesson_paragraph'> Loops empower you to handle tasks efficiently, such as iterating through arrays or performing actions until a certain condition is met. Array elements are accessed using their index, starting from 0. Arrays are mutable, meaning you can change their elements.</p> <ul class = 'lesson_paragraph'> <li><span class='lesson_vocab'>For Loop:</span> A for loop allows you to execute a block of code repeatedly for a specific number of times. It consists of three parts: initialization, condition, and iteration.</li> <li><span class='lesson_vocab'>While Loop:</span>A while loop continues to execute a block of code as long as the specified condition is true.</li> </ul> </div> <br> " +
      '<br> <br> <img src="static/Images/javascript_example7.png" class="lesson_img_sq";  alt = "Loops examples">';
  } else if (lesson == 12) {
    div.innerHTML =
      "<div style =" +
      '"width: 50%">' +
      "<h1 class='lesson_heading'>What is an Array?</h1> <p class = 'lesson_paragraph'> An array is a data structure that allows you to store multiple values in a single variable. These values can be of any data type, and they are accessed using an index.</p> <ul class = 'lesson_paragraph'> <li><span class='lesson_vocab'>push():</span> Adds elements to the end of an array.</li> <li><span class='lesson_vocab'>pop():</span>Removes the last element from an array.</li> <li><span class='lesson_vocab'>shift():</span> Removes the first element from an array.</li> <li><span class='lesson_vocab'>unshift():</span>Adds elements to the beginning of an array.</li> </ul> </div> <br> " +
      '<br> <br> <img src="static/Images/javascript_example8.png" class="lesson_img_sq";  alt = "Loops examples">';

    // Enables Next Button
    document.getElementById("next_button").disabled = false;

    // Changes Bar Back to Yellow
    document.getElementById("lesson_style").innerHTML =
      "#progress_bar{width: 50%;text-align: center;background-color: black ;border: 1px solid black;border-radius: 20px;}#progress_bar::-webkit-progress-bar {background-color: black;border-radius: 20px}progress::-webkit-progress-value { background-color: #FFDDB1;;border-radius: 20px;}";
  } else if (lesson == 13) {
    div.innerHTML =
      "<h1 class = 'lesson_heading'> Summary </h1> <p class = 'lesson_paragraph'> As we wrap up our introduction to JavaScript basics, let's summarize our key learnings. We started by understanding JavaScript's role in making web pages interactive. From writing your first lines of code to exploring variables, loops, functions, operators, and arrays, you've built a solid foundation. Remember, practice is key to mastering JavaScript. With these foundational skills, you're ready for more advanced topics and projects. Keep coding, stay curious, and congratulations on completing this first step into the world of JavaScript. Happy coding!</p> <br>";

    // Disables Next Button
    document.getElementById("next_button").disabled = true;

    document.getElementById("finish").disabled = false;

    // Changes Bar to Green
    document.getElementById("lesson_style").innerHTML =
      "#progress_bar{width: 50%;text-align: center;background-color: black ;border: 1px solid black;border-radius: 20px;}#progress_bar::-webkit-progress-bar {background-color: black;border-radius: 20px}progress::-webkit-progress-value { background-color: lightgreen;;border-radius: 20px;}";
  }
}

// update database grade
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

