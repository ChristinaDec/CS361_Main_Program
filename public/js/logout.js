let logout_button = document.getElementById('global-top');

logout_button.addEventListener("click", function (e) {

    e.preventDefault();
    

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            window.location.href = "/logout";
            setTimeout(() => {
               window.location.href = "/index";
           }, 6000);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            alert("There was an error with the input.")
        }
    }
     xhttp.send(JSON.stringify(data));
});