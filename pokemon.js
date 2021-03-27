
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

    //searchHistoryPopulate(citySearchBoxText); // passes on the city name
  
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
            elementTypes = "";
            
            //translates openweather weather conditions into the 7 weather types used by pokemon go
            for (i = 0; i < 8; i++) {
                let weatherId = pokeWeather.hourly[i].weather[0].id;
                let main = pokeWeather.hourly[i].weather[0].main
                if (main === 'Rain' || main === 'Drizzle' || main === 'Thunderstorm') {
                     condition.push('Rainy');
                     elementTypes = "Water, Electric, Bug";
                } 
                else if (main === 'Snow') {
                    condition.push('Snow');
                    elementTypes = "Steel, Ice";

                } else if (weatherId >= 801 && weatherId <= 803) {
                    condition.push('Partly_Cloudy');
                    elementTypes = "Normal, Rock";

                } else if (pokeWeather.hourly[i].wind_gust + pokeWeather.hourly[i].wind_speed > 34.2) {
                    condition.push('Windy');
                    elementTypes = "Dragon, Flying, Psychic";

                } else if (weatherId >= 701 && weatherId <= 762) {
                    condition.push('Fog')
                    elementTypes = "Dark, Ghost";

                } else if (weatherId === 804) {
                    condition.push('Overcast')
                    elementTypes = "Fairy,Fighting, Poison";
                } else if (main === 'Clear') {
                    condition.push('Clear')
                    elementTypes = "Grass, Ground, Fire";
                }
            }
            console.log( pokeWeather);

            //plugs the weather condition at the hour into the pokemon go array to get the types boosted
            for (let i = 0; i < condition.length; i++) {
                boostedTypes.push(weatherBoosters[condition[i]])
            }
            console.log(boostedTypes[0])
           displayMainCard(pokeWeather,boostedTypes);
           displayDaycard(pokeWeather,boostedTypes);
           displayHourCard(pokeWeather,boostedTypes);
      

           // return boostedTypes

        })

        

       function displayMainCard(PokeWeather, typesOb){
           
     //connecting to weatherCards dive
        var mainCardsDiv = document.querySelector(".mainCard");
  
    
        //displays for times and dates
           var currentTime = moment().format("LT");
            var currentDate = moment().format("LL");
           // var duration = moment.duration(8,"hours");
            //var numberOfHours = currentTime.add(duration);
           // var stamp = pokeWeather[0].hourly[0].dt * 1000;
           // var newTime = stamp.getHours();
            
            //Creating the html elements  
            var dateEl = document.createElement("h2");
            //The time html Element
            var timeSlotEl = document.createElement("h3");
            //weather Icon
            var weatherIconEl = document.createElement("img");
             //weather condition
            var conditionsEL = document.createElement("p");
            // the temperature
            var tempEl = document.createElement("h4");
            //the types
            var theTypesEl = document.createElement("p");
    
            //Setting the html elements for the first card EX
            dateEl.textContent = currentDate;
            var ftemp = Math.floor((PokeWeather.hourly[0].temp -273.15) * 1.8 +32);
            timeSlotEl.textContent = currentTime;
    
            weatherIconEl.setAttribute("src","http://openweathermap.org/img/w/"+ PokeWeather.hourly[0].weather[0].icon + ".png");
            tempEl.textContent ="Temp: " + ftemp;
            conditionsEL.textContent = PokeWeather.hourly[0].weather[0].main;
            theTypesEl.textContent = typesOb[0];
            //console.log(pokeWeather[0].main);
            mainCardsDiv.setAttribute("style","border:3px solid black; width:50%;")
    
    
          // console.log(currentDate,currentTime, duration);
          mainCardsDiv.append(dateEl,timeSlotEl,conditionsEL,weatherIconEl,tempEl, theTypesEl);


       }
       function displayDaycard(pokeW,typesO){
              //connecting to weatherCards dive
        var dayCardsDiv = document.querySelector(".dayCard");
  
    
        //displays for times and dates
           var currentTime = moment();

            var currentDate = moment();
          var nextDay =  currentDate.add('1', 'days');
           // var duration = moment.duration(8,"hours");
            //var numberOfHours = currentTime.add(duration);
           // var stamp = pokeWeather[0].hourly[0].dt * 1000;
           // var newTime = stamp.getHours();
            
            //Creating the html elements  
            var dateEl = document.createElement("h2");
            //The time html Element
            var timeSlotEl = document.createElement("h3");
            //weather Icon
            var weatherIconEl = document.createElement("img");
             //weather condition
            var conditionsEL = document.createElement("p");
            // the temperature
            var tempEl = document.createElement("h4");
            //the types
            var theTypesEl = document.createElement("p");
    
            //Setting the html elements for the first card EX
            dateEl.textContent = nextDay.format("LL");
            var ftemp = Math.floor((pokeW.hourly[47].temp -273.15) * 1.8 +32);
            timeSlotEl.textContent = currentTime;
    
            weatherIconEl.setAttribute("src","http://openweathermap.org/img/w/"+ pokeW.hourly[47].weather[0].icon + ".png");
            tempEl.textContent ="Temp: " + ftemp;
            conditionsEL.textContent = pokeW.hourly[47].weather[0].main;
            theTypesEl.textContent = typesO[0].value;
            //console.log(pokeWeather[0].main);
            dayCardsDiv.setAttribute("style","border:3px solid black; width:50%;")
    
    
          // console.log(currentDate,currentTime, duration);
          dayCardsDiv.append(dateEl,conditionsEL,weatherIconEl,tempEl);


       }
       
       function displayHourCard(poki,boss)
       {
           for (var i = 0; i < 6; i++) {
                     //connecting to weatherCards dive
        var hourlyCardsDiv = document.querySelector(".hourlyCards");
  
    
        //displays for times and dates
           var currentTime = moment();
           currentTime.add("1","hours");
           var newtime = currentTime.add(i,'hours');
           newtime.format("LT");

            var currentDate = moment();
          //var nextDay =  currentDate.add('1', 'days');
           // var duration = moment.duration(8,"hours");
            //var numberOfHours = currentTime.add(duration);
           // var stamp = pokeWeather[0].hourly[0].dt * 1000;
           // var newTime = stamp.getHours();
            
            //Creating the html elements  
           // var dateEl = document.createElement("h2");
            //The time html Element
            var timeSlotEl = document.createElement("h3");
            //weather Icon
            var weatherIconEl = document.createElement("img");
             //weather condition
            var conditionsEL = document.createElement("p");
            // the temperature
            var tempEl = document.createElement("h4");
            //the types
            var theTypesEl = document.createElement("p");
    
            //Setting the html elements for the first card EX
            //dateEl.textContent = nextDay.format("LL");
            var ftemp = Math.floor((poki.hourly[i].temp -273.15) * 1.8 +32);
            timeSlotEl.textContent = newtime.format("LT");
    
            weatherIconEl.setAttribute("src","http://openweathermap.org/img/w/"+ poki.hourly[i].weather[0].icon + ".png");
            tempEl.textContent ="Temp: " + ftemp;
            conditionsEL.textContent = poki.hourly[i].weather[0].main;
            theTypesEl.textContent = boss[i];
            //console.log(pokeWeather[0].main);
            hourlyCardsDiv.setAttribute("style","border:3px solid black; width:50%;height:50%; display:flex; justify-content: space-between")
    
          // console.log(currentDate,currentTime, duration);
          hourlyCardsDiv.append(timeSlotEl,conditionsEL,weatherIconEl,tempEl,theTypesEl);

           
               
           }

       
       }
}