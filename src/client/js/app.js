/* Global Variables */
let defualtCountry = 'US';
let lang = '&lang=ar';
let baseURL = `http://api.geonames.org/`;
const userName = `falbellaihi`;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
const hostUrl = window.location.href;

document.getElementById('generate').addEventListener('click', performQuery);


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
            console.log("sdldskldsklfdskjl")
            postData(`http://localhost:8081/add`, {
                "city_from": cityFrom,
                "city_to": cityTo,
                "trip_date": date
            })
        }

    } catch (e) {
        console.log("error", e);
    }
}

/*
    Fetches data from open weather map API takes URI + api key
 */
const getWeather = async (baseURL, queryURL) => {

    const res = await fetch(baseURL + queryURL)
    try {
        return await res.json();
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}
/*
 Update UI with the new data
 */
const updateUI = async () => {
    console.log("this is update")
    const request = await fetch(`http://localhost:8081/all`)
    try {
        const data = await request.json()


        let image = document.getElementById('pixabay');


        if (data.results !== undefined && data.weatherData !== undefined && data.pixabay !== undefined) {
            document.getElementById('no-res').innerHTML = ``;
            console.log("defined res")
            image.src = data.pixabay
            image.style.height = "150px"
            image.style.width = "150px"
            document.getElementById('lat').innerHTML = `Latitude : ${data.results.lat}`
            document.getElementById('long').innerHTML = `Longitude : ${data.results.lng}`;
            document.getElementById('countnry').innerHTML = `Going to ${data.results.name},  ${data.results.countryName}  Going from : ${data.cityFrom} Remining days to go : ${data.reminingDate}`;
            document.getElementById('weather-info').innerHTML = `Weather will be:${data.weatherData.temp}`;
        } else {
            document.getElementById('no-res').innerHTML = `no results found!`;

        }


    } catch (e) {
        console.log(e);

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
        await response.json();
        updateUI()
    } catch (error) {
        console.log("error", error);
    }
};

export {performQuery}