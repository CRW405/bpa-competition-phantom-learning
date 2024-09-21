// done
function ValidateEmail(input) {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.value.match(validRegex)) {
        alert("Valid Email Address!");
        document.form1.text1.focus();
        return true;
    }
    else {
        alert("Invalid Email Address!");
        document.form1.text1.focus();
        return false;
    }
}