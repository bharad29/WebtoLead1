let captchachecked = false;

async function checkDuplicateEmail() {
    let emailField = document.getElementById("email");
    let errorText = document.getElementById("email-error");

    if (emailField.value.trim() === "") return;

    try {
        let response = await fetch(`https://your-instance.salesforce.com/services/apexrest/checkLeadEmail/?email=${emailField.value.trim()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
            }
        });

        let emailExists = await response.json();
        if (emailExists) {
            errorText.style.display = "inline";
            emailField.style.border = "2px solid red";
            return true;  // Email exists
        } else {
            errorText.style.display = "none";
            emailField.style.border = "";
            return false; // Email does not exist
        }
    } catch (error) {
        console.error("Error checking email:", error);
    }
}

async function beforesubmit(event) {
    let isDuplicate = await checkDuplicateEmail();

    if (isDuplicate) {
        alert("This email is already registered. Please use a different email.");
        event.preventDefault();
        return false;
    }

    if (!captchachecked) {
        alert("Please check the reCaptcha");
        event.preventDefault();
    }
}

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
