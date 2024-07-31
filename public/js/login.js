let login_form = document.getElementById('login');

login_form.addEventListener("submit", function (e) {

    e.preventDefault();
    
    let input_email = document.getElementById("email");
    let input_password = document.getElementById("password");

    let email_value = input_email.value;
    let password_value = input_password.value;

    let data = {
        email: email_value,
        password: password_value,
    }

    if (email_value == "" || password_value == "") {
        alert("Please complete each field");
        return;
    }
      
     var xhttp = new XMLHttpRequest();
     xhttp.open("POST", "/post-login", true);
     xhttp.setRequestHeader("Content-type", "application/json");
 
     xhttp.onreadystatechange = () => {
         if (xhttp.readyState == 4 && xhttp.status == 200) {
             window.location.href = "/myspoons_home";
         }
         else if (xhttp.readyState == 4 && xhttp.status != 200) {
             alert("There was an error with the input.")
         }
     }
     xhttp.send(JSON.stringify(data));
});
