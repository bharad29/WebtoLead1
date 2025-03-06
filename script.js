let captchachecked = false;

// Simulated existing emails (Replace this with an API call in real scenario)
let existingEmails = ["test@example.com", "user@example.com", "sample@example.com"];

function beforesubmit(event) {
    let emailField = document.getElementById("email");
    if (existingEmails.includes(emailField.value.trim())) {
        alert("This email is already registered. Please use a different email.");
        event.preventDefault();
        return false;
    }

    if (captchachecked) {
        let outputdate = document.querySelector(".outputdate");
        let inputdate = document.querySelector(".inputdate");
        console.log("inputdate.value", inputdate.value);
    } else {
        alert("Please check the reCaptcha");
        event.preventDefault();
    }
}

// Function to check duplicate email when user enters email
function checkDuplicateEmail() {
    let emailField = document.getElementById("email");
    let errorText = document.getElementById("email-error");

    if (existingEmails.includes(emailField.value.trim())) {
        errorText.style.display = "inline";
        emailField.style.border = "2px solid red";
    } else {
        errorText.style.display = "none";
        emailField.style.border = "";
    }
}

// Captcha timestamp function
function timestamp() {
    var response = document.getElementById("g-recaptcha-response");
    if (response == null || response.value.trim() == "") {
        var elems = JSON.parse(document.getElementsByName("captcha_settings")[0].value);
        elems["ts"] = JSON.stringify(new Date().getTime());
        document.getElementsByName("captcha_settings")[0].value = JSON.stringify(elems);
    }
}
setInterval(timestamp, 500);

function captchasuccess() {
    captchachecked = true;
}
