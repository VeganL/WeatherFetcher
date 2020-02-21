// Declaring/importing necessary files and frameworks
var aerisKey = require("../aeriskey.json");
var request = require("request");
var express = require("express");

// Instantiating an express instance
var app = express();

// Serves content on port 8080 from the directory named "public"
app.use(express.static("public"));
app.listen(8080);

// This is the /getweather endpoint; it takes latitude and longitude as parameters and fetches weather data based on it
app.get("/getweather", function(req, res) {
    let lat = req.query.lat;
    let lon = req.query.lon;

    // The GET request
    request({
        method: "GET",
        uri: "https://api.aerisapi.com/forecasts/"+lat+","+lon,
        qs: {
            client_id: aerisKey.accessId,
            client_secret: aerisKey.secretKey
        }
    }, function(error, response, body) {
        let data = JSON.parse(body);

        // The following code whitles down the API response down to the components I wanted for the final result
        let parsedData = [];
        for (var i = 0; i<(data.response[0].periods).length; i++) {
            let tempArr = [];

            // Used for translating date given into human readable form
            let monthDict = {
                "01": "January",
                "02": "February",
                "03": "March",
                "04": "April",
                "05": "May",
                "06": "June",
                "07": "July",
                "08": "August",
                "09": "September",
                "10": "October",
                "11": "November",
                "12": "December"
            };

            let month = data.response[0].periods[i].dateTimeISO.substring(5,7);
            let date = data.response[0].periods[i].dateTimeISO.substring(8,10);
            let dateStr = monthDict[month] + ' ' + date;

            // Adding the components I need
            tempArr.push(dateStr);
            tempArr.push(data.response[0].periods[i].avgTempF);
            tempArr.push(data.response[0].periods[i].avgTempC);
            tempArr.push(data.response[0].periods[i].avgFeelslikeF);
            tempArr.push(data.response[0].periods[i].avgFeelslikeC);
            tempArr.push(data.response[0].periods[i].weatherPrimary);
            parsedData.push(tempArr);
        }

        // Sends response to client-side
        res.send(parsedData);
    });
});