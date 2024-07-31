function delete_activity(index) {

    let data = {index}
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-activity", true);
    xhttp.setRequestHeader("Content-type", "application/json");


    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                window.location.href = "/myspoons_home";
            } else {
                alert("Request to delete failed.")
            }
        }
    }

    xhttp.send(JSON.stringify(data));
}
