/*jslint es6:true*/

/* PATH */
const path = require('path');
/* EXPRESS */
const express = require('express');
/* ENV VARS */
const dotenv = require('dotenv');
dotenv.config();
/* GLOBAL VARIABLES */
const user = process.env.USER_NAME;
const GEO_API_URI = "http://api.geonames.org/";
const WEATER_API_URI = "https://api.weatherbit.io/v2.0/forecast/";
const userName = `falbellaihi`;
const PIZABAY_API_URI = "https://pixabay.com/api/?key=";
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
let projectData = {};

/* APP EXPRESS */
const app = express();
/* BODY PARSER */
const bodyParser = require('body-parser');


/* fetch node */
const fetch = require("node-fetch");

/* USING DIST FOLDER */
app.use(express.static('dist'));

/* Middleware*/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
/*DotENV*/


app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'));
});

// designates what port the app will listen to for incoming requests
const server = app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
});


app.get('/all', function (req, res) {
    res.send(projectData);
});

app.post('/add', addCityData);

function addCityData(request, response) { // GET DATA CITY
    let currentDate = new Date(); // NEW CURRENT DATE
    currentDate.setHours(0, 0, 0, 0);
    let cityFrom = request.body.city_from;// CITY FROM
    let cityTo = request.body.city_to; // CITY TO
    let tripDate = new Date(request.body.trip_date); // GET THE DATE AS DATE
    let stringDate = request.body.trip_date; // STRING TO STORE DATE
    let remaining = Math.floor((tripDate - currentDate) / (1000 * 60 * 60 * 24)); // CALCULATE REMAINING DAYS TO TRAVEL DATE
    cityTo = cityTo.replace(/\s/g, "+"); // REMOVE SPACES BETWEEN TWO CHARS AND SWAP IT WITH + SO THAT IT CAN BE QUERIED
    let cityQuery = `searchJSON?q=${cityTo}&maxRows=10&username=${userName}`;
    getData(GEO_API_URI + cityQuery).then(function (result) { // CALL GEO TO GET LAT AND LOT OF THE CITY
        try {
            projectData["results"] = result.geonames[0]; // STORE GEO RESULTS FOR THE FOUND CITY
            projectData["cityFrom"] = cityFrom; // STORE FROM INTO THE DIC
            projectData["reminingDate"] = remaining; // AFTER CALCULATING THE NUM OF DAYS STORE IT IN THE DATA
        } catch (e) {
            console.log("no results"); // LOG NO RESULTS FOUND
        }


    }).then(
        (async function weather() { // FUNCTION TO CALL GET DATA FROM WEATHER API

            if (projectData.results !== undefined) {
                let queryUrl = `daily?lat=${projectData.results.lat}&lon=${projectData.results.lng}&key=${WEATHER_API_KEY}`
                getData(WEATER_API_URI + queryUrl).then(function (a) {
                    for (let i = 0; i < a.data.length; i++) { // LOOP THROUGH THE RESULTS LENGTHH
                        if (a.data[i].valid_date === stringDate) { /// IF THE DATE IS EQUAL TO THE DATE OF TRAVEL
                            projectData["weatherData"] = a.data[i]; // STORE THE DATA

                        }
                    }

                });
            }


        })
    ).then(async function image() { // FUNCTION TO CALL GETDATA FOR PIXABAY
        if (projectData.results !== undefined) { // IF RESULTS IS DEFINED, IT MEANS CITIES WERE FOUND
            let cityName = projectData["results"].name; // GET THE CITY NAME FROM GEO
            cityName = cityName.replace(/\s/g, "+") // REMOVE SPACES AND SWAP IT WITH +
            let pixabayUrl = `${PIXABAY_API_KEY}&q=${cityName}&image_type=photo`
            getData(PIZABAY_API_URI + pixabayUrl).then(function (im) {
                try {
                    projectData["pixabay"] = im["hits"][0]["largeImageURL"]; // GET FIRST HIT AND STORE IT
                } catch (e) {
                    console.log("none found");
                }
                response.send(projectData);

            })
        } else {/// IF NO CITIES WERE FOUND
            response.send(projectData);
        }

    });


}

/*
 RETREVE DATA
 */
const getData = async (API_URI) => {

    console.log(API_URI);
    const res = await fetch(API_URI)
    try {
        return await res.json();
    } catch (error) {
        console.log("error", error.code);
        // appropriately handle the error
    }

}


module.exports = app;