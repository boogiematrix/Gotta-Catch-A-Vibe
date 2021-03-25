
var searchSubmitButtonE1 = $("#searchSubmitButton");
var recentCitySearch1E1 = $("#recentCitySearch1"); // The city blocks displayed in search history 

var searchHistoryArray= [];
var searchHistoryArrayIndex = 0;


searchSubmitButtonE1.on("click", function(event){
    // triggers off of button click

    event.preventDefault();
    var citySearchBoxText = document.getElementById("searchInput").value; // Text we want stored. From the search bar
    recentCitySearch1E1.text(citySearchBoxText); // Displays to screen using what was typed into search bar

    localStorage.setItem("searchInputStorage", citySearchBoxText); // like declaring a new variable. 



    searchHistoryPopulate(citySearchBoxText); // passes on the city name
})


function searchHistoryPopulate(cityName) {
    // triggered by search button press 
    searchHistoryArrayIndex += 1;
    console.log("after incrament " + searchHistoryArrayIndex + " | City name is " + cityName);


    searchHistoryListE1 = document.getElementById("searchHistoryList");
    var newHeading = document.createElement("li");
    newHeading.innerText = cityName;
    searchHistoryListE1.appendChild(newHeading);


}





/*      --          local storage          --      */

$("#recentCitySearch1").text(localStorage.getItem("searchInputStorage"));






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


let cityGeocodeJson
let hourlyJson

const weatherApi = 'f7539453617679dd406d1369cc371b9e'


const geocode = async () => {
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=austin&limit=1&appid=${weatherApi}`;

    try {
        let response = await fetch(geocodeUrl);
        if (response.ok) {
            cityGeocodeJson = await response.json();
            console.log(cityGeocodeJson)
            return cityGeocodeJson
        }
    }
    catch (error) { console.log(error) }
}


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
}


let weatherBoosters = {
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



geocode()
    .then(hourlyWeather)
    .then(function (pokeWeather) {
        let condition = [];
        let boostedTypes = [];
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
            } else if (main === clear) {
                condition.push('Clear')
            }
        }
        console.log(condition)

        for (let i = 0; i < condition.length; i++) {
            boostedTypes.push(weatherBoosters[condition[i]])
        }
        console.log(boostedTypes)
        return boostedTypes
    })