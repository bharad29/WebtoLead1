let captchachecked = false;

// Function to check for duplicate email
async function checkDuplicateEmail() {
    let emailField = document.getElementById("email");
    let errorText = document.getElementById("email-error");

    if (emailField.value.trim() === "") return false;

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
        return false;
    }
}

// Function to validate before submitting
async function beforesubmit(event) {
    event.preventDefault(); // Always prevent submission first

    let isDuplicate = await checkDuplicateEmail(); // Wait for the check

    if (isDuplicate) {
        alert("This email is already registered. Please use a different email.");
        return false;
    }

    if (!captchachecked) {
        alert("Please check the reCaptcha");
        return false;
    }

    event.target.submit(); // If all checks pass, manually submit the form
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

// Captcha success function
function captchasuccess() {
    captchachecked = true;
}
