let captchachecked = false;

function beforesubmit (event)
{
    if(captchachecked){

        let outputdate = document.querySelector(".outputdate");
        let inputdate = document.querySelector(".inputdate");
        console.log("inputdate.value",inputdate.value);
    }
else{
    alert("Please check the reCaptcha");
    event.preventDefault();
}

}

function timestamp()
{
     var response = document.getElementById("g-recaptcha-response"); 
     if (response == null || response.value.trim() == "") 
        {
            var elems = JSON.parse(
                document.getElementsByName("captcha_settings")[0].value
            );
            elems["ts"] = JSON.stringify(new Date().getTime());
            document.getElementsByName("captcha_settings")[0].value = JSON.stringify(elems);
         } } setInterval(timestamp, 500); 

 function captchasuccess()
 {
    captchachecked=true;

 }
