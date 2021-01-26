# Webpacks Evaluate news NLP



## Getting Setup

## introduction 
This application is for Udacity frontend project. It was meant to get exposed to Node JS environment and tools such as that webpacks and how they work. 

 - The project allows users to run NLP on articles and blogs found in external websites [NLP](https://www.npmjs.com/package/node-nlp)
 The project used dotevn for API credentials [dotenv docs](https://www.npmjs.com/package/dotenv) 

### Dependencies
 ```
 "body-parser": "^1.19.0",
    "clean-webpack-plugin": "^3.0.0",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "html-webpack-plugin": "^4.5.1",
    "mini-css-extract-plugin": "^1.3.4",
    "node-fetch": "^2.6.1",
    "optimize-css-assets-webpack-plugin": "^5.0.4",
    "terser-webpack-plugin": "^4.2.3",
    "webpack": "^4.46.0",
    "webpack-cli": "^3.3.12",
    "workbox-webpack-plugin": "^6.0.2"
 ```
 The project uses MeaningCloud API find the instructions of how to set it up in the later API section


#### Installing Node and NPM

This project depends on Nodejs and Node Package Manager (NPM). you must download and install Node (the download includes NPM) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).

#### Express Documentation

Express tool for HTTP servers for making single page applications [Express documentation](https://www.npmjs.com/package/express).

#### babel loader Documentation

"This package allows transpiling JavaScript files using Babel and webpack." [Babel documentation](https://www.npmjs.com/package/babel-loader).

#### style loader Documentation

To inject css into DOM [style loader documentation](https://www.npmjs.com/package/style-loader).

#### Installing project dependencies

This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the `root` directory of this repository. After cloning, open your terminal and locate to the project directory and run:

```bash
npm install
```

## Project structure 



```

.
├── dist
|   |──index.html
|   |──main.css
|   |──main.js
├── src                     # source files folder
│   ├── client              # client folder
│   ├── server              # server folder
│          
└── ...
```

### GEONAMES API
  To obtain GEONAMES API KEY by visiting and registering: [GEONAMES API](http://www.geonames.org/export/web-services.html) 
  -To use the API, use your username
  
```.env
USER_NAME=**************************
```

### WEATHERBIT API
  To obtain WEATHERBIT API KEY by visiting and registering: [WEATHERBIT API](https://www.weatherbit.io/account/create) 
  - To get your API key, Go [Dashboard](https://www.weatherbit.io/account/dashboard)
  
```.env
WEATHER_API_KEY=**************************
```

### PIXABY API
  To obtain PIXABY API KEY by visiting and registering: [PIXABY API](https://pixabay.com/api/docs/) 
  - To get your API key, Go [API docs](https://pixabay.com/api/docs/)
  - You will find it in the documentation examples ```"Your API Key: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"```
  
```.env
WEATHER_API_KEY=**************************
```

### Run the project
After installing the dependencies in your terminal run 
```bash
npm build-prod
npm build-dev
```
open new Terminal and run
```bash
npm start
```


### Test the project

```bash
    jest ....
```


