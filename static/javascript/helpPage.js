// done
function Clear() {
    document.getElementById("inputName").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputText").value = "";
}
    /*const name_icon = document.getElementById("name_icon");

    name_icon.addEventListener("focus", inputName);*/
let name = document.getElementById("name_icon")
let email = document.getElementById("email_icon")
let message = document.getElementById("message_icon")

function focusInputName() { 
  name.style.color = "#B38CB4";
  name.style.transition = "0.5s";
}
function focusInputEmail() { 
  email.style.color = "#B38CB4";
  email.style.transition = "0.5s";
}
function focusInputMessage() { 
  message.style.color = "#B38CB4";
  message.style.transition = "0.5s";
}

function blurInputName() { 
  name.style.color = "black";
}
function blurInputEmail() { 
 email.style.color = "black";
}
function blurInputMessage() { 
 message.style.color = "black";
}
