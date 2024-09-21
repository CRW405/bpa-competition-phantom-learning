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
            "<h1 class = 'lesson_heading'> Welcome to the World of Coding!</h1> <p class = 'lesson_paragraph'> Welcome to the exciting world of Python programming! In this journey, we'll explore the basics of Python, a versatile and user-friendly programming language. Whether you're a beginner or have some coding experience, join us as we dive into the fundamentals of Python and discover the power of coding!</p>";
        document.getElementById("back_button").disabled = true;
    }

    else if (lesson == 2) {
        div.innerHTML =
            "<h1 class='lesson_heading'>Objectives</h1> <br> <ul class= 'lesson_bullets'> <li> Understand the basics of Python</li> <li> Learn how to write and execute simple Python code </li> <li> Gain familiarity with common Python concepts </li> <li> Write simple HTML code statement </li> </ul>";
        document.getElementById("back_button").disabled = false;
    }

    else if (lesson == 3) {
        div.innerHTML =
            "<h1 class = 'lesson_heading'> Supplies Needed </h1> <ul class= 'lesson_bullets'> <li> Visual Studio Code </li> <li> A Writing tensil </li> <li> A notebook </li>  </ul> ";

    }

    else if (lesson == 4) {
        div.innerHTML =
            '<center><video controls id="video"><source src="static/Videos/Python.mp4" type="video/mp4"><source src="static/Videos/Python.ogg" type="video/ogg"> Your browser does not support the video tag.</video></center>';
    }


    else if (lesson == 5) {
        div.innerHTML =

            '<div style = "width: 50%"><h1 class = "lesson_heading"> What is Python? </h1> <p class = "lesson_paragraph">  Get ready to meet Python, a powerful and versatile programming language! Python is renowned for its readability and simplicity, making it an excellent choice for beginners. Python' + "isn't" + "just a programming language; it's a tool that brings ideas to life. In this segment, we'll explore real-world applications of Python, from web development to data analysis and artificial intelligence. Witness Python in action and understand how it can be a game-changer in various domains of technology. </div>" + '<img src="static/Images/Python_example2.png" alt="Python Example 2" width="40%" class = "lesson_img">'
    }

    else if (lesson == 6) {
        div.innerHTML =
            '<div style = "width: 50%"> <ul class = "lesson_paragraph"> <li><span class="lesson_vocab">Variable</span>: A named storage location in the' + "computer's" + 'memory, used to store data that can be changed during program execution</li> <li><span class="lesson_vocab">Data Types</span>: The classification of data items, indicating the kind of value they can hold. Common types include int (integer), float (floating-point number), str (string), and bool (boolean)</li> <li><span class="lesson_vocab">Array</span>: An ordered, indexed collection of values in JavaScript. Arrays can hold elements of different data types</li> <li><span class="lesson_vocab">Operator</span>: A symbol that performs a specific operation on one or more operands, producing a result <li><span class="lesson_vocab">Function </span>: A block of organized, reusable code that performs a specific task. Functions allow for code modularity and reusability</li>  </ul> </div>' + '<img src="static/Images/Python_example1.png" alt="Python Example 1" width="40%" class = "lesson_img">'
    }
    else if (lesson == 7) {
        div.innerHTML =
            "<h1 class = 'lesson_heading'> Writing Your First Python Code </h1> <p class = 'lesson_paragraph'> Comments start with a '#,' and they are ignored by the Python interpreter. The 'print' statement outputs 'Hello, World!' to the console. Variables and data types are fundamental in Python. In the code example, 'name' is a string, 'age' is an integer, 'height' is a float, and 'is_adult' is a boolean. Understanding data types is crucial for effective Python programming. </p>" + '<img src="static/Images/Python_example1.png" alt="Python Example 1" class="lesson_img_sq">';
    }

    else if (lesson == 8) {
        div.innerHTML =
            "<div style =" + '"width: 50%">' + "<h1 class='lesson_vocab'>Operators in Python</h1> <p class = 'lesson_paragraph'> Operators in Python enable various operations. For instance take a look at the example image. These operators perform basic arithmetic operations on variables 'x' and 'y.' Python's operators make mathematical computations straightforward.</p> </div>" + '<img src="static/Images/Python_example3.png" alt="Python Example 3" class="lesson_img_sq">';
    }

    else if (lesson == 9) {
        div.innerHTML =
            "<div style =" + '"width: 50%">' + "<h1 class='lesson_vocab'>Control Flow in Python</h1> <p class = 'lesson_paragraph'>Control flow structures, like 'if' statements, guide the flow of your Python program. Consider the image example provided. This code uses an 'if' statement to check if the 'age' variable is greater than or equal to 18, determining whether the person is an adult.</p> </div>" + '<img src="static/Images/Python_example4.png" alt="Python Example 4" class="lesson_img_sq">';
        ;
    }

    else if (lesson == 10) {
        div.innerHTML =
            "<div style =" + '"width: 50%">' + "<h1 class='lesson_vocab'>Loops in Python</h1> <p class = 'lesson_paragraph'> Loops automate repetitive tasks in Python. Consider a" + "'for'" + "loop for example. This loop iterates through the 'fruits' list, printing each fruit. Loops are efficient for handling repetitive actions in your Python code</p> </div>" + '<img src="static/Images/Python_example6.png" class="lesson_img_sq">';
        ;
    }

    else if (lesson == 11) {
        div.innerHTML =
            "<h1 class='lesson_vocab'>Functions in Python</h1> <p class = 'lesson_paragraph'> Functions are essential for code organization and reusability. Here's a simple function in Python: <br> " + ' <br> <img src="static/Images/Python_example5.png" id="pythonspecial" class="lesson_img_sq" style="margin: 2%;"> <br> ' + "<span> The 'square' function takes a number as an argument and returns its square. The result is then printed to the console, showcasing the power of functions in Python</span>.</p>  ";
        ;
    }

    else if (lesson == 12) {
        div.innerHTML =
            "<div style =" + '"width: 50%">' + "<h1 class='lesson_vocab'>Lists in Python</h1> <p class = 'lesson_paragraph'> Lists in Python offer a dynamic way to organize and manipulate collections of data. Consider the following example image. In this code, the 'colors' list contains three elements. You can access elements using indexes, modify them, add new elements with 'append,' and remove elements with 'remove.' Lists empower you to efficiently manage and update collections of data in your Python programs. </p> </div>" + '<img src="static/Images/Python_example7.png" class="lesson_img_sq">';

        // Enables Next Button
        document.getElementById("next_button").disabled = false;

        // Changes Bar Back to Yellow
        document.getElementById("lesson_style").innerHTML =
            "#progress_bar{width: 50%;text-align: center;background-color: black ;border: 1px solid black;border-radius: 20px;}#progress_bar::-webkit-progress-bar {background-color: black;border-radius: 20px}progress::-webkit-progress-value { background-color: #FFDDB1;;border-radius: 20px;}"
            ;
    }

    else if (lesson == 13) {

        div.innerHTML =
            "<h1 class = 'lesson_heading'> Summary </h1> <p class = 'lesson_paragraph'> As we wrap up our exploration of Python basics, let's reflect on the key concepts we've covered. From understanding Python's fundamentals and writing your initial lines of code to exploring variables, data types, operators, functions, control flow, loops, and the versatile world of lists, you've embarked on a journey that lays a solid foundation for your programming endeavors. Remember, Python's readability and flexibility make it an excellent choice for both beginners and experienced developers. Keep practicing, experimenting, and diving deeper into Python's vast capabilities. Congratulations on completing this introductory journey into the world of Python programming – may your coding adventures continue to flourish!</p> <br>";

        // Disables Next Button
        document.getElementById("next_button").disabled = true;

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

