const appId = '7d1e9298abb364ee3facc16be9cac6e8';
let units = 'imperial';
let searchMethod;

// determines search type
function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

// performs the weather search
function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
    return result.json();
    }).then(result => {
        init(result);
    })
}

// changes background image based on weather
function init(serverResult) {
    switch(serverResult.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("clear.jpg")';
            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url("cloudy.jpg")';
            break;
        case 'Rain':
        case 'Drizzle':
        case "Mist":
            document.body.style.backgroundImage = 'url("rain.jpg")';
            break;
        case "Thunderstorm":
            document.body.style.backgroundImage = 'url("storm.jpg")';
            break;
        case "Snow":
            document.body.style.backgroundImage = 'url("snow.jpg")';
            break;
        case "Fog":
        case "Haze":
            document.body.style.backgroundImage = 'url(fog.jpg)';
            break;
        default:
            break;
    }

    var date = new Date(serverResult.dt * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    let cityHeader = document.getElementById('city-header');
    let timeCollectedElement = document.getElementById('time-collected');
    let weatherIcon = document.getElementById("document-icon-image");
    let temperatureElement = document.getElementById('temperature');
    let resultDescription = serverResult.weather[0].description;
    let weatherDescriptionHeader = document.getElementById('weather-description-header');
    let cloudinessElement = document.getElementById('cloudiness');
    let windSpeedElement = document.getElementById('wind-speed');
    let windDirectionElemenet = document.getElementById('wind-direction');
    let humidityElement = document.getElementById('humidity');

    // displays results as text
    cityHeader.innerHTML = serverResult.name + ', ' + serverResult.sys.country;
    timeCollectedElement.innerHTML = 'As of: ' + formattedTime + ' EST';
    weatherIcon.src = 'http://openweathermap.org/img/w/' + serverResult.weather[0].icon +'.png';
    temperatureElement.innerHTML = Math.floor(serverResult.main.temp) + '&#176 F' + ' / ' + Math.floor((Math.floor(serverResult.main.temp) - 32) * (5 / 9)) + '&#176 C';
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    cloudinessElement.innerHTML = serverResult.clouds.all + '% Cloudy';
    windSpeedElement.innerHTML = 'Wind speed: ' + Math.floor(serverResult.wind.speed)  + ' mph';
    windDirectionElemenet.innerHTML = 'Wind direction: ' + Math.floor(serverResult.wind.deg) + '&#176';
    humidityElement.innerHTML = 'Humidity level: ' + serverResult.main.humidity + '%';
}

// search button click detection
document.getElementById('search-button').addEventListener('click', () => {
    let searchTerm = document.getElementById('search-input').value;
    if(searchTerm)
        searchWeather(searchTerm);
});

// event listener for searching on Enter press
document.addEventListener("keyup", function(event) {
    if (event.code === 'Enter') {
        let searchTerm = document.getElementById('search-input').value;
        if(searchTerm)
            searchWeather(searchTerm);
    }
});
