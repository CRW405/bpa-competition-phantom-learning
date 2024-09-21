// done
var content;
// controls the btn that will let you move on to the quiz
let button = document.getElementById("act-submit");
button.style.visibility = "hidden";
button.disabled = true;

// the actual activity
function runCode() {
  content = document.getElementById("sourceCode").value;
  
  // controls the output display
  var iframe = document.getElementById("targetCode");
  iframe = iframe.contentWindow
    ? iframe.contentWindow
    : iframe.contentDocument.document
      ? iframe.contentDocument.document
      : iframe.contentDocument;
  iframe.document.open();
  iframe.document.write(content);
  iframe.document.close();

  // things to check in order to mover on
  var testList = [
    check(["<!DOCTYPE html>", "<html>", "</html>"]),
    check(["<head>", "</head>"]),
    check(["<body>", "</body>"]),
    checkheader(),
    check("<style>", "</style>"),
    check("{", "text-color: red ;", "}"),
  ];
  var progress = 0;
  for (i in testList) {
    if (testList[i] == true) {
      progress++;
    } else {
      break;
    }
  }

  // this is a complete course run
  /*
<!DOCTYPE html>
<html>
<head>
<style>
p{color: red;}
</style>
</head>
<body>
<h1>HI</h1>
<p>hello</p>
</body>
</html>
*/

// this is the course that will change as you follow the steps
  switch (progress) {
    case 1:
      display(
        "Good job now create a head section for your file, we will use this later on. <strong>Hint:</strong> this is where meta tags and link tags would go."
      );
      break;
    case 2:
      display(
        "HTML files have two main components that contain everything else: the <strong>head</strong> and the <strong>body</strong>. You have created the head, now create the body element.<strong>Hint:</strong> make sure that the body element and the head element are not inside each other but <strong>are</strong> inside the html element."
      );
      break;
    case 3:
      display(
        "Now we will add some text to our file, add a header element and a paragraph element, you can add whatever text you would like(but <strong>Hello World</strong> is the classic sample text). <strong>Hints:</strong> headers can range in sizes: 1-6 - 1 being the largest and 6 being the smallest, remember the first letter."
      );
      break;
    case 4:
      display(
        "Now style that we have basic structure and some sample text, lets beautify our file with <strong>styling</strong>, to do this, we will add a style element into your &lt;head&gt; element."
      );
      break;
    case 5:
      display(
        "This  element is like a CSS file inside your HTML file. inside this element, select your header and change its text color to red. <strong>Hint:</strong> CSS code is different from HTML code, for what we are doing here, it would go:\n(what element(s) you want to select) {\n(attribute-to-change): (value);\n}"
      );
      break;
    case 6:
      display(
        "Congrats, you have created your first HTML page with CSS styling, feel free to experiment further. The <strong>Submit Button</strong> is now enabled."
      );
      // once your done allows you to move on
      button.style.visibility = "visible";
      button.disabled = false;
      break;
      // defualt
    default:
      display(
        "Welcome to the HTML and CSS activity, type your code in the left box and click <strong>run code</strong> to see your output in the right box, to start, specify that this file is an HTML file. <strong>Hints:</strong> DOCTYPE, don't forget ending tags!"
      );
      break;
  }
}

// to make sure the user inputs correctly
function check(keywords) {
  var bool = true;
  for (let i = 0; i < keywords.length; i++) {
    if (content.indexOf(keywords[i]) >= 0) {
    } else {
      bool = false;
    }
  }
  return bool;
}

// headers need more work on there own so we needed a new function
function checkheader() {
  for (i = 1; i <= 6; i++) {
    header = "<h" + i + ">";
    headerEnd = "</h" + i + ">";
    if (
      content.indexOf(header) >= 0 &&
      content.indexOf(headerEnd) >= 0 &&
      check(["<p>", "</p>"])
    ) {
      return true;
    }
  }
}

// shows the user the out put
function display(html) {
  var tar = (document.getElementById("info").innerHTML = html);
}
// updates the database
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

