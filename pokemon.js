var searchSubmitButtonE1 = document.getElementById("searchSubmitButton");
var recentCitySearch1E1 = document.getElementById("recentCitySearch1"); // The city blocks displayed in search history 
let city = document.getElementById('searchInput');
let cityGeocodeJson;
let hourlyJson;


const weatherApi = 'f7539453617679dd406d1369cc371b9e';

var searchHistoryArray= [];
var searchHistoryArrayIndex = 0;


searchSubmitButtonE1.addEventListener("click", function (event) {
    event.preventDefault();

    searchHistoryPopulate(citySearchBoxText); // passes on the city name
  
    getDataAndRender();

    recentCitySearch1E1.textContent = city.value; // Displays to screen using what was typed into search bar

    localStorage.setItem("searchInputStorage", city.value); 
    searchHistoryPopulate(city.value); // passes on the city name

})


recentCitySearch1E1.textContent = localStorage.getItem("searchInputStorage");

function searchHistoryPopulate(cityName) {
    // triggered by search button press 

    
    searchHistoryArrayIndex += 1; // incriments index per push 
    searchHistoryArray.push(cityName); // adds last city name to this array


    
    // displays to screen 
    var searchHistoryListE1 = document.getElementById("searchHistoryList");
    var newHeading = document.createElement("li");
    
    var idTag = "searchInput" + searchHistoryArrayIndex;
        //var idTag = "searchInput" + searchHistoryArrayIndex;
    
    newHeading.setAttribute("id", idTag);
    newHeading.innerText = cityName;
    searchHistoryListE1.appendChild(newHeading);

    // sets to local storage
    var storageLocal = "searchInputStorage" + searchHistoryArrayIndex;
        // var storageLocal = "searchInputStorage" + searchHistoryArrayIndex;
    localStorage.setItem(storageLocal, cityName); // like declaring a new variable. 
    localStorage.setItem("searchInputStorage", cityName); // for the first text under search history 1

    // debugging 
    console.log(searchHistoryArray);
    console.log("-- idTag & index " + idTag + " | getElement result " + newHeading.getAttribute("id"));
    console.log("the storageLocal " + storageLocal);
}


$("#recentCitySearch1").text(localStorage.getItem("searchInputStorage"));




/*      --          local storage          --      */


// original 
//localStorage.setItem("searchInputStorage", cityName); // like declaring a new variable.
//$("#recentCitySearch1").text(localStorage.getItem("searchInputStorage"));

//$(idTag).text(localStorage.getItem(storageLocal));
//$(HTMLreference ID).text(localStorage.getItem(where it was stored))





/* Variable Definition 
. searchSubmitButtonE1 | References search button in HTML
. recentCitySearch1E1  | References text for HTML display 
. 
.
.
.
git push like this below -- 
git push origin localStorage
*/


//api call for the longitude and latitude
const geocode = async () => {
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=1&appid=${weatherApi}`;

    try {
        let response = await fetch(geocodeUrl);
        if (response.ok) {
            cityGeocodeJson = await response.json();
            console.log(cityGeocodeJson)
            return cityGeocodeJson
        }
    }
    catch (error) { console.log(error) }
};

//api call for the hourly weather
const hourlyWeather = async () => {

    const hourlyUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityGeocodeJson[0].lat}&lon=${cityGeocodeJson[0].lon}&exclude=minutely,daily,alerts&appid=${weatherApi}`


    try {
        let response = await fetch(hourlyUrl);
        if (response.ok) {
            hourlyJson = await response.json();
            console.log(hourlyJson)
            return hourlyJson
        }
    }
    catch (error) { console.log(error) }
};

//data from pokemon go api weather that boosts pokemon types
const weatherBoosters = {
    Clear: [
        "Grass",
        "Ground",
        "Fire"
    ],
    Fog: [
        "Dark",
        "Ghost"
    ],
    Overcast: [
        "Fairy",
        "Fighting",
        "Poison"
    ],
    Partly_Cloudy: [
        "Normal",
        "Rock"
    ],
    Rainy: [
        "Water",
        "Electric",
        "Bug"
    ],
    Snow: [
        "Ice",
        "Steel"
    ],
    Windy: [
        "Dragon",
        "Flying",
        "Psychic"
    ]
}


const getDataAndRender = function () {
    geocode()
        .then(hourlyWeather)
        .then(function (pokeWeather) {
            let condition = [];
            let boostedTypes = [];
            
            //translates openweather weather conditions into the 7 weather types used by pokemon go
            for (i = 0; i < 8; i++) {
                let weatherId = pokeWeather.hourly[i].weather[0].id;
                let main = pokeWeather.hourly[i].weather[0].main
                if (main === 'Rain' || main === 'Drizzle' || main === 'Thunderstorm') {
                    condition.push('Rainy');
                } else if (main === 'Snow') {
                    condition.push('Snow');
                } else if (weatherId >= 801 && weatherId <= 803) {
                    condition.push('Partly_Cloudy');
                } else if (pokeWeather.hourly[i].wind_gust + pokeWeather.hourly[i].wind_speed > 34.2) {
                    condition.push('Windy');
                } else if (weatherId >= 701 && weatherId <= 762) {
                    condition.push('Fog')
                } else if (weatherId === 804) {
                    condition.push('Overcast')
                } else if (main === 'Clear') {
                    condition.push('Clear')
                }
            }
            console.log(condition)

            //plugs the weather condition at the hour into the pokemon go array to get the types boosted
            for (let i = 0; i < condition.length; i++) {
                boostedTypes.push(weatherBoosters[condition[i]])
            }
            console.log(boostedTypes)
            return boostedTypes
        })
}