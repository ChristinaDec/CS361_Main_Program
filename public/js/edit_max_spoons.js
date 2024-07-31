let edit_max_spoons_form = document.getElementById('max');

edit_max_spoons_form.addEventListener("submit", function (e) {

    e.preventDefault();

    let input_max_spoons = document.getElementById("max_spoons");
    let max_spoons_value = parseInt(input_max_spoons.value);
    
    let data = {
        max: max_spoons_value
    }

    if (isNaN(max_spoons_value)) {
        alert("Please enter a max spoons value");
        return;
    }
  
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-max", true);
    xhttp.setRequestHeader("Content-type", "application/json");


    xhttp.onreadystatechange = () => {
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4) {
                if (xhttp.status == 200) {
                    window.location.href = "/myspoons_home";
                } else {
                    alert("Request to edit failed.")
                }
            }
        }
    }
    xhttp.send(JSON.stringify(data));
})