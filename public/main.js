// Main code for fetching/displaying data
function showPosition(pos) {
    // Displays message to user that data is being fetched and processed; disappears after 5 seconds
    document.getElementById("message").innerHTML = '<p>Fetching forecast for lat ' + pos.coords.latitude + ', lon ' + pos.coords.longitude + '</p>';
    setTimeout(function () {document.getElementById("message").innerHTML = '';},5000);

    // Requesting from hw4server.js endpoint: /getweather
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load",function () {
        let weatherArea = document.getElementById("weatherArea");

        // Loads weather data if there are no errors
        if (this.status === 200) {
            let areaStr = '';
            let data = this.response;
            for (var i = 0; i<data.length; i++) {
                areaStr += '<div class="card">';
                if (data[i][1] < 32) {
                    areaStr += '<div><img src="img/cold.svg" alt="Thermometer showing cold temperature"></div>';
                } else if (32 <= data[i][1] < 50) {
                    areaStr += '<div><img src="img/cool.svg" alt="Thermometer showing cool temperature"></div>';
                } else if (50 <= data[i][1] < 70) {
                    areaStr += '<div><img src="img/warm.svg" alt="Thermometer showing warm temperature"></div>';
                } else {
                    areaStr += '<div><img src="img/hot.svg" alt="Thermometer showing hot temperature"></div>';
                }

                areaStr += '<div><h2>' + data[i][0] + '</h2><p>' + data[i][5] + '</p><p>Temp: ' + String(data[i][1]) + '&deg;F/' + String(data[i][2]) + '&deg;C</p><p>Feels Like: ' + String(data[i][3]) + '&deg;F/' + String(data[i][4]) + '&deg;C</p></div></div>';
            }

            weatherArea.innerHTML = areaStr;
        } else { // Else, give error message
            weatherArea.innerHTML = '<div style="text-align: center;"><h2 style="padding: 15px 0 15px 0;">Weather data currently unavailable; please try again later.</h2></div>';
        }
    });
    xhr.responseType = "json";
    xhr.open("GET", "http://localhost:8080/getweather?lat=" + String(Math.round(pos.coords.latitude)) + "&lon=" + String(Math.round(pos.coords.longitude)));
    xhr.send();
}

// Displays red error message if GeoLocation is not enabled; disappears in 5 seconds
function error(error) {
    document.getElementById("message").innerHTML = '<span style="color: red">' + error + '</span>';
    setTimeout(function () {document.getElementById("message").innerHTML = '';},5000);
}

// Function that's run on button click
function getLoc() {
    navigator.geolocation.getCurrentPosition(showPosition,error);
}