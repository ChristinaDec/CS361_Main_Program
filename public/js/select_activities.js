
let add_activity_form = document.getElementById('activities');

add_activity_form.addEventListener("submit", function (e) {
    e.preventDefault();
    items = []
    for(let i = 1; i <= 10; ++i) {
        let name = document.getElementById("activity" + i).value
        let spoons = parseInt(document.getElementById("spoons" + i).value)
        if (name.length > 0 && !isNaN(spoons)) {
            items.push([name, spoons])
        }
    }

    console.log(items);  
    let data = items
      
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/post-activities", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                window.location.href = "/myspoons_home";
            } else {
                alert("Request to add failed.")
            }
        }
    }
    xhttp.send(JSON.stringify(data));
});