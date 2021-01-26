var path = require('path');
const express = require('express');
/* ENV VARS */
const dotenv = require('dotenv');
dotenv.config();
const user = process.env.USER_NAME;
const GEO_API_URI = "http://api.geonames.org/";
const WEATER_API_URI = "https://api.weatherbit.io/v2.0/forecast/";
const userName = `falbellaihi`;
const PIZABAY_API_URI = "https://pixabay.com/api/?key=";
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

let projectData = {};

/* EXPRESS */
const app = express();
const bodyParser = require('body-parser');


/* fetch node */
const fetch = require("node-fetch");


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
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
    console.log(`Your API key is ${user}, `, process.env.USER_NAME);
});


app.get('/all', function (req, res) {
    console.log("get called");
    res.send(projectData);
});

app.post('/add', addCityData);

function addCityData(request, response) {
    let cityTo = "";
    let cityFrom = "";
    let currentDate = new Date();
    let tripDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    cityFrom = request.body.city_from;
    cityTo = request.body.city_to;
    tripDate = new Date(request.body.trip_date);
    let stringDate = request.body.trip_date;
    let remaining = Math.floor((tripDate - currentDate) / (1000 * 60 * 60 * 24));
    console.log(typeof (currentDate), "  ", (tripDate), "remn", remaining);
    // console.log(request.body);
    cityTo = cityTo.replace(/\s/g, "+");
    let cityQuery = `searchJSON?q=${cityTo}&maxRows=10&username=${userName}`;
    console.log(cityTo);

    getData(GEO_API_URI + cityQuery).then(function (result) {
        try {
            projectData["results"] = result.geonames[0];
            projectData["cityFrom"] = cityFrom;
            projectData["reminingDate"] = remaining;
        } catch (e) {
            console.log("no results");
        }


    }).then(
        (async function f() {
            console.log("next")
            if (projectData.results !== undefined) {
                let queryUrl = `daily?lat=${projectData.results.lat}&lon=${projectData.results.lng}&key=${WEATHER_API_KEY}`
                getData(WEATER_API_URI + queryUrl).then(function (a) {
                    for (let i = 0; i < a.data.length; i++) {
                        if (a.data[i].valid_date === stringDate) {
                            projectData["weatherData"] = a.data[i];
                            console.log(projectData);

                        }
                    }

                });
            }


        })
    ).then(async function image() {
        if (projectData.results !== undefined) {
            cityName = projectData["results"].name;
            console.log(cityName);
            cityName = cityName.replace(/\s/g, "+")
            let pixabayUrl = `${PIXABAY_API_KEY}&q=${cityName}&image_type=photo`
            console.log(pixabayUrl);
            getData(PIZABAY_API_URI + pixabayUrl).then(function (im) {
                try {
                    console.log("im images : ", im["hits"][0]["largeImageURL"])
                    projectData["pixabay"] = im["hits"][0]["largeImageURL"];
                } catch (e) {
                    console.log("none found");
                }
                response.send(projectData);

            })
        } else {
            response.send(projectData);
        }

    });


}

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




