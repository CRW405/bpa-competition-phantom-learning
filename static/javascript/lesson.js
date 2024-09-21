// done
var lesson = document.getElementById("progress_bar").value;

// go back in lesson
function back_lesson() {
    lesson = Number(lesson) - 1;
    console.log(lesson);
    document.getElementById("progress_bar").value = lesson;
    Lesson(lesson);
}

// Moves forward in lesson
function next_lesson() {
    lesson = Number(lesson) + 1;
    console.log(lesson);
    document.getElementById("progress_bar").value = lesson;
    Lesson(lesson);
}

function Lesson() {
    var div = document.getElementById("lesson_div");


    if (lesson == 1) {
        div.innerHTML =
            "<h1 class = 'lesson_heading'> Welcome to the World of Coding!</h1> <p class = 'lesson_paragraph'>  Hello and welcome to our HTML and CSS course! We're excited to have you on board. In this class, we'll guide you through the basics of creating websites. Whether you're new to web development or looking to sharpen your skills, you're in the right place. Over the coming weeks, you'll learn how to build web pages with HTML and style them with CSS. We're here to make this journey fun and easy, so let's get started together!</p>";
        document.getElementById("back_button").disabled = true;
    }

    else if (lesson == 2) {
        div.innerHTML =
            "<h1 class='lesson_heading'>Objectives</h1> <br> <ul class= 'lesson_bullets'> <li> Define Hypertext Markup Language (HTML)</li> <li> Define HTML tags, elements, and properties </li> <li> Identify common HTML elements, different types of properties, and the structure of HTML code </li> <li> Write simple HTML code statement </li> </ul>";
        document.getElementById("back_button").disabled = false;
    }

    else if (lesson == 3) {
        div.innerHTML =
            "<h1 class = 'lesson_heading'> Supplies Needed </h1> <ul class= 'lesson_bullets'> <li> Visual Studio Code </li> <li> A Writing utensil </li> <li> A notebook </li> <li> Write simple HTML code statement </li> </ul> ";

    }

    else if (lesson == 4) {
        div.innerHTML =
            '<center><video controls id="video"><source src="static/Videos/HTML_and_CSS.mp4" type="video/mp4"><source src="static/Videos/HTML_and_CSS.ogg" type="video/ogg"> Your browser does not support the video tag.</video></center>';
    }


    else if (lesson == 5) {
        div.innerHTML =

            '<div style = "width: 50%"><h1 class = "lesson_heading"> What is HTML? </h1> <p class = "lesson_paragraph">   HTML stands for HyperText Markup Language.' + " It's " + "like the 'skeleton' of a web page; it tells the browser what content to display." + " HTML is the foundation of every webpage on the internet. It's a simple and standardized way to structure and format content on a web page. HTML uses special codes called 'tags' to define different elements on a page, like headings, paragraphs, links, images, and more.</p> </div>" + "<img src='static/Images/html_css_example_1.png' alt='html_css_example_1' width='40%' class = 'lesson_img'>"
    }

    else if (lesson == 6) {
        div.innerHTML =
            '<div style = "width: 50%"> <ul class = "lesson_paragraph"> <li><span class="lesson_vocab">&lt!DOCTYPE html></span>: This declaration tells the browser that the document is written in HTML5</li> <li><span class="lesson_vocab">&lthtml></span>: The root element that contains all the other HTML elements</li> <li><span class="lesson_vocab">&lthead></span>: This section contains information about the webpage, like its title, which appears in the' + "browser's" + 'tab</li> <li><span class="lesson_vocab">&lttitle></span>: Sets the title of the webpage</li> <li><span class="lesson_vocab">&ltbody>:</span> This is where the main content of the webpage goes.</li> <li><span class="lesson_vocab">&lth1></span>: Defines a top-level heading.</li> <li><span class="lesson_vocab">&ltp></span>: Represents a paragraph of text.</li> <li><span class="lesson_vocab">&lta></span>: Creates a link to another webpage.</li> </ul> </div>' + "<img src='static/Images/html_css_example_1.png' alt='html_css_s_example_1' width='40%' class = 'lesson_img'>"
    }
    else if (lesson == 7) {
        div.innerHTML =
            "<h1 class = 'lesson_heading'> What is CSS? </h1> <p class = 'lesson_paragraph'> (Cascading Style Sheets) Learning CSS is like unlocking the magical power to transform a simple web page into a visually stunning and captivating work of art. It's the key to making your web content not only informative but also a delight to the eyes of your visitors. Here's why learning CSS can be incredibly appealing. CSS empowers you to turn your design ideas into reality. You can choose from an endless palette of colors, experiment with fonts, and craft layouts that express your unique artistic vision. </p>" + "<img src='static/Images/css.png' alt='css example' class='lesson_img_sq'>";
    }

    else if (lesson == 8) {
        div.innerHTML =
            "<p class = 'lesson_paragraph'>  Using CSS involves defining styles and applying them to HTML elements. Here are the basic steps to get you started with using CSS: </p> <div style =" + '"width: 50%">' + "<h1 class='lesson_vocab'>1. Create a CSS File:</h1> <p class = 'lesson_paragraph'> Start by creating a separate CSS file (usually with a .css extension) to keep your styles organized. You can use a text editor like Notepad, Visual Studio Code, or any code editor of your choice.</p> </div>" + "<img src='static/Images/create_css_file.png' alt='create css file' class='lesson_img_sq'>";
    }

    else if (lesson == 9) {
        div.innerHTML =
            "<div style =" + '"width: 50%">' + "<h1 class='lesson_vocab'>2. Link CSS to HTML:</h1> <p class = 'lesson_paragraph'> In your HTML document, link to your CSS file in the &lthead> section using the &ltlink> element. This tells the browser where to find your CSS styles.</p> </div>" + "<img src='static/Images/html_css_example_2.png' alt='create css file' class='lesson_img_sq'>";
    }

    else if (lesson == 10) {
        div.innerHTML =
            "<div style =" + '"width: 50%">' + "<h1 class='lesson_vocab'>3. Select HTML Elements:</h1> <p class = 'lesson_paragraph'> In your CSS file, you'll select the HTML elements to which you want to apply styles. You can use element selectors (like p for paragraphs) or class and ID selectors for more precise targeting.</p> </div>" + "<img src='static/Images/html_css_example_3.png' class='lesson_img_sq'>";
    }

    else if (lesson == 11) {
        div.innerHTML =
            "<div style =" + '"width: 50%">' + "<h1 class='lesson_vocab'>4. Apply Styles:</h1> <p class = 'lesson_paragraph'> Within the selected CSS rules, you can define the styles you want to apply to the selected elements. Common style properties include <span class='lesson_vocab'> color, </span> <span class='lesson_vocab'> font-size, </span> <span class='lesson_vocab'> margin, </span> <span class='lesson_vocab'> padding, </span> and more.</p> </div>" + "<img src='static/Images/html_css_example_3.png' class='lesson_img_sq'>";

    }

    else if (lesson == 12) {
        div.innerHTML =
            "<div style =" + '"width: 50%">' + "<h1 class='lesson_vocab'>5. Save and Refresh:</h1> <p class = 'lesson_paragraph'> Save both your HTML and CSS files, then refresh your web page in the browser. You'll see your styles applied to the selected HTML elements.</p> </div>" + "<img src='static/Images/html_css_example_3.png' class='lesson_img_sq'>";

        // Enables Next Button
        document.getElementById("next_button").disabled = false;

        // Changes Bar Back to Yellow
        document.getElementById("lesson_style").innerHTML =
            "#progress_bar{width: 50%;text-align: center;background-color: black ;border: 1px solid black;border-radius: 20px;}#progress_bar::-webkit-progress-bar {background-color: black;border-radius: 20px}progress::-webkit-progress-value { background-color: #FFDDB1;;border-radius: 20px;}";
    }

    else if (lesson == 13) {

        div.innerHTML =
            "<h1 class = 'lesson_heading'> Summary </h1> <p class = 'lesson_paragraph'> HTML (HyperText Markup Language) is the standard language for creating the structure and content of web pages. It uses tags to define elements such as headings, paragraphs, links, and images, providing the foundation for web documents.CSS (Cascading Style Sheets) complements HTML by controlling the presentation and styling of web content. It allows you to change the colors, fonts, layout, and other visual aspects of HTML elements, making web pages visually appealing and user-friendly.</p> <br>";

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

