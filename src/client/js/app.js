// Create a new date instance dynamically with JS

document.getElementById('generate').addEventListener('click', performQuery);
/* Global Variables */
let image = document.getElementById('pixabay');
let lat = document.getElementById('lat');
let long = document.getElementById('long');
let country = document.getElementById('countnry');
let weatherInfo = document.getElementById('weather-info');


/*
    Function to query from openweather and dynamically updates UI
 */
function performQuery(e) {

    try {


        const cityFrom = document.getElementById('from-city').value;
        const cityTo = document.getElementById('to-city').value;
        const date = document.getElementById('trip-date').value;
        const warn = document.getElementById('required');
        if (cityFrom === '' || cityTo === '') {
            warn.innerText = "fields * is required";

        } else {
            warn.innerText = "";
            postData(`http://localhost:8081/add`, {
                "city_from": cityFrom,
                "city_to": cityTo,
                "trip_date": date
            });
        }

    } catch (error) {
        console.log("error", error);
    }
}


/*
 Update UI with the new data
 */
const updateUI = async () => {
    clearUI(
        [lat.id, image.id, long.id, country.id, weatherInfo.id]
    )
    image.hidden =true;
    const request = await fetch(`http://localhost:8081/all`)
    try {
        const data = await request.json()


        if (data.results !== undefined && data.weatherData !== undefined && data.pixabay !== undefined) {
            document.getElementById('no-res').innerHTML = ``;
            console.log("defined res")
            image.src = data.pixabay
            image.hidden =false;
            image.style.height = "150px"
            image.style.width = "150px"
            lat.innerHTML = `Latitude : ${data.results.lat}`
            long.innerHTML = `Longitude : ${data.results.lng}`;
            country.innerHTML = `Going to ${data.results.name},  ${data.results.countryName}  Going from : ${data.cityFrom} Remining days to go : ${data.reminingDate}`;
            weatherInfo.innerHTML = `Weather will be:${data.weatherData.temp}`;
        } else {

            document.getElementById('no-res').innerHTML = `no results found!`;


        }


    } catch (e) {
        console.log(e);

    }

}

function clearUI(id) {
    for (let i = 0; i <= id.length; i++) {

        if (document.getElementById(`${id[i]}`) != null) {
            document.getElementById(`${id[i]}`).innerHTML = "";

        }

    }

}

// Async POST to post data
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        await response.json().catch(function (reason) {

        }).then(function () {
            updateUI();
        });

    } catch (error) {
        console.log("error", error);
    }
};

export {performQuery}