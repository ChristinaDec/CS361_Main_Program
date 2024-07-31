
let edit_activity_form = document.getElementById('oneActivity');

edit_activity_form.addEventListener("submit", function (e) {

    e.preventDefault();

    let input_index = document.getElementById("id");
    let input_activity = document.getElementById("activity");
    let input_spoons = document.getElementById("spoons");

    let index_value = input_index.value;
    let activity_value = input_activity.value;
    let spoons_value = parseInt(input_spoons.value);
    
    let data = {
        index: index_value,
        activity: activity_value,
        spoons: spoons_value,
    }

    if (activity_value == "" || isNaN(spoons_value)) {
        alert("Please complete each field");
        return;
    }
  
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put_single_activity", true);
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
})
