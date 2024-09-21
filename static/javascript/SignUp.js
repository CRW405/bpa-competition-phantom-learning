let para1 = document.createElement("p");
para1.id = "paragraph1";
para1.style.margin = "5";
let para2 = document.createElement("p");
para2.id = "paragraph2";
para2.style.margin = "5";
let element = document.getElementById("Testing");
const enterPassword = document.getElementById("enterPassword");
// const confirmPassword = document.getElementById("confirmPassword");

function showPassword() {
    if (enterPassword.type == "password") {
        document.getElementById("showEnterPassword").innerHTML = "Hide";
        document.getElementById("enterPasswordIcon");
        enterPassword.type = "text";
        confirmPassword.type = "text";
    } else {
        document.getElementById("showEnterPassword").innerHTML =
            'Show <span id="enterPasswordIcon" class="fa-solid fa-unlock"></span>';
        enterPassword.type = "password";
        confirmPassword.type = "password";
    }
}

function checkPassword() {
    if (enterPassword.value != "" || confirmPassword.value != "") {
        if (
            enterPassword.value == confirmPassword.value &&
            enterPassword.value != ""
        ) {
            document.getElementById("enterPasswordIcon").className =
                "fa-solid fa-lock";
            document.getElementById("enterPasswordIcon").style.color = "green";
            // document.getElementById("confirmPasswordIcon").className = "fa-solid fa-lock"
            // document.getElementById("confirmPasswordIcon").style.color = "green";
            return true;
        }
        if (enterPassword.value != confirmPassword.value) {
            document.getElementById("enterPasswordIcon").className =
                "fa-solid fa-unlock";
            document.getElementById("enterPasswordIcon").style.color = "red";
            // document.getElementById("confirmPasswordIcon").className = "fa-solid fa-unlock"
            // document.getElementById("confirmPasswordIcon").style.color = "red";
            return false;
        }
    } else {
        return false;
    }
}
let emailVerify = document.getElementById("enterEmail");
function ValidateEmail() {
    let validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailVerify.value.match(validRegex)) {
        document.form1.text1.focus();
        return true;
    } else {
        document.form1.text1.focus();
        return false;
    }
}

function SignUp() {
    if (checkPassword() === true && ValidateEmail() === true) {
        document.getElementById("Testing").value = "";
        document.getElementById("Testing").style.visibility = "visible";
        document.getElementById("Testing").style.color = "green";
        document.getElementById("Testing").innerHTML = "You Are Good To Go";
        document.getElementById("login2").style.display = "block";
        document.getElementById("fieldset1").style.display = "none";
    } else if (checkPassword() === false && ValidateEmail() === true) {
        document.getElementById("Testing").value = "";
        document.getElementById("Testing").style.visibility = "visible";
        document.getElementById("Testing").innerHTML = "Your Passwords Don't Match";
    } else if (checkPassword() === true && ValidateEmail() === false) {
        document.getElementById("Testing").value = "";
        document.getElementById("Testing").style.visibility = "visible";
        document.getElementById("Testing").innerHTML = "Your Email Is Invalid";
    } else {
        if (para1.innerHTML != "" || para2.innerHTML != "") {
            para1.innerHTML = "";
            para2.innerHTML = "";
            document.getElementById("Testing").style.visibility = "visible";
            let node1 = document.createTextNode("Your Email Is Invalid");
            para1.appendChild(node1);
            let node2 = document.createTextNode("Your Passwords Don't Match");
            para2.appendChild(node2);
            element.appendChild(para1);
            element.appendChild(para2);
        } else {
            document.getElementById("Testing").style.visibility = "visible";
            let node1 = document.createTextNode("Your Email Is Invalid");
            para1.appendChild(node1);
            let node2 = document.createTextNode("Your Passwords Don't Match");
            para2.appendChild(node2);
            element.appendChild(para1);
            element.appendChild(para2);
        }

    }
}
