
let registration_form = document.getElementById('signup');

registration_form.addEventListener("submit", function (e) {

    e.preventDefault();
    
    let input_name = document.getElementById("name");
    let input_email = document.getElementById("email");
    let input_password = document.getElementById("password");

    let name_value = input_name.value;
    let email_value = input_email.value;
    let password_value = input_password.value;

    let data = {
        name: name_value,
        email: email_value,
        password: password_value,
    }
    console.log(data);
    
    if (name_value == "" || email_value == "" || password_value == "") {
        alert("Please complete each field");
        return;
    }
      
     var xhttp = new XMLHttpRequest();
     xhttp.open("POST", "/post-signup", true);
     xhttp.setRequestHeader("Content-type", "application/json");
     xhttp.onreadystatechange = () => {
         
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                window.location.href = "/welcome";
                //setTimeout(() => {
                    //window.location.href = "/myspoons_home";
                //}, 6000);
            } else {
                alert("Request to register failed.")
            }
        }
     }
     xhttp.send(JSON.stringify(data));
});
