


var recentCitySearch1E1 = $("#recentCitySearch1"); // The city blocks displayed in search history 
var recentCitySearch2E1 = $("#recentCitySearch2");
var recentCitySearch3E1 = $("#recentCitySearch3");
var recentCitySearch4E1 = $("#recentCitySearch4");
var recentCitySearch5E1 = $("#recentCitySearch5");
var recentCitySearch6E1 = $("#recentCitySearch6");

var searchSubmitButtonE1 = document.getElementById("searchSubmitButton");
var recentCitySearch1E1 = document.getElementById("recentCitySearch1"); // The city blocks displayed in search history 
let city = document.getElementById('searchInput');
let cityGeocodeJson;
let hourlyJson;
var mainCardsDiv = document.querySelector(".mainCard");
var dayCardsDiv = document.querySelector(".dayCard");
var hourlyCardsDiv = document.querySelector(".hourlyCards");



const weatherApi = 'f7539453617679dd406d1369cc371b9e';




var searchHistoryArray = [];
var searchHistoryArrayIndex = 0;
var searchButtonPresses = 0;


searchSubmitButtonE1.addEventListener("click", function (event) {
    event.preventDefault();
  
    getDataAndRender();

    searchHistoryPopulate(city.value); // passes on the city name

})

//if (!localStorage.getItem("searchInputStorage")) {
//    recentCitySearch1E1.textContent = localStorage.getItem("searchInputStorage");
//}

   
function searchHistoryPopulate(cityName) {
    // triggered by search button press 

    //Updates the searchHistoryArray values
    searchHistoryArray.unshift(cityName); // adds last city name to beginning of the array. 
    searchHistoryArrayLength = searchHistoryArray.length; 
    desiredArrayLength = 7;

    if (searchHistoryArrayLength >= desiredArrayLength) {
        // this happens when there are too many searches.

        searchHistoryArray.pop(); // removes the oldest search once we reach our desired limit. Keeps the array max length equal to desiredArrayLength.
        searchHistoryArrayIndex = desiredArrayLength - 1; // assures the index does not exceed the maximum desired length. Important for referencing.   
        // index will always be one below the current array length
    }
    

    // Displays to screen under Recent Search History
    recentCitySearch1E1.text(searchHistoryArray[0]); // Displays to screen using what was typed into search bar. Appears in the search box with the green dashed borders
    recentCitySearch2E1.text(searchHistoryArray[1]);
    recentCitySearch3E1.text(searchHistoryArray[2]);
    recentCitySearch4E1.text(searchHistoryArray[3]);
    recentCitySearch5E1.text(searchHistoryArray[4]);
    recentCitySearch6E1.text(searchHistoryArray[5]);     

    // sets to local storage

    localStorage.setItem("searchInputStorage1", searchHistoryArray[0]); // for the first text under search history 1
    localStorage.setItem("searchInputStorage2", searchHistoryArray[1]);
    localStorage.setItem("searchInputStorage3", searchHistoryArray[2]);
    localStorage.setItem("searchInputStorage4", searchHistoryArray[3]);
    localStorage.setItem("searchInputStorage5", searchHistoryArray[4]);
    localStorage.setItem("searchInputStorage6", searchHistoryArray[5]);

    

    if (searchHistoryArrayLength < desiredArrayLength) {
        // triggers only if the current is less than a certain amount. 

        searchHistoryArrayIndex += 1; // incriments index per push.  
    }
  
    

} 



$("#recentCitySearch1").text(localStorage.getItem("searchInputStorage1"));
$("#recentCitySearch2").text(localStorage.getItem("searchInputStorage2"));
$("#recentCitySearch3").text(localStorage.getItem("searchInputStorage3"));
$("#recentCitySearch4").text(localStorage.getItem("searchInputStorage4"));
$("#recentCitySearch5").text(localStorage.getItem("searchInputStorage5"));
$("#recentCitySearch6").text(localStorage.getItem("searchInputStorage6"));


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

//gets a random pokemon of a random type that is boosted at that hour
const pokemonOfAType = async (boostedTypes) => {
    let backgroundpokemontype = [];
    let backgroundPokemon = [];
    for (i = 0; i < boostedTypes.length; i++) {
        backgroundpokemontype.push(boostedTypes[i][Math.floor(Math.random() * boostedTypes[i].length)])
    }
    for (i = 0; i < backgroundpokemontype.length; i++) {
        let pokeApiUrl = `https://pokeapi.co/api/v2/type/${backgroundpokemontype[i].toLowerCase()}`;
        try {
            let response = await fetch(pokeApiUrl);
            if (response.ok) {
                pokeTypeApiJson = await response.json();
                console.log(pokeTypeApiJson)
                backgroundPokemon.push(pokeTypeApiJson.pokemon[Math.floor(Math.random() * pokeTypeApiJson.pokemon.length)].pokemon.name)
            }
        }
        catch (error) { console.log(error) }
        
    }

    console.log(backgroundPokemon)
    return backgroundPokemon
}
//gets a pokemon image from the api
const pokemonSprites = async (backgroundPokemon) => {
    let pokemonImages = [];
    for (i = 0; i < backgroundPokemon.length; i++) {
        let pokeImageUrl = `https://pokeapi.co/api/v2/pokemon/${backgroundPokemon[i]}/`;
        try {
            let response = await fetch(pokeImageUrl);
            if (response.ok) {
                pokeImageApiJson = await response.json();
                console.log(pokeImageApiJson)
                if (pokeImageApiJson.sprites.other.dream_world.front_default) {
                    pokemonImages.push(pokeImageApiJson.sprites.other["official-artwork"].front_default)
                } else {
                    pokemonImages.push(pokeImageApiJson.sprites.front_default)
                }
            }
        }
        catch (error) { console.log(error) }
    }
    console.log(pokemonImages)
    
    //sets the background pokemon image for each hour
    mainCardsDiv.setAttribute('style', `background-image: url(${pokemonImages[0]}); background-repeat: no-repeat; background-size: 100%; background-position: bottom`);
    for (i = 1; i < backgroundPokemon.length - 1; i++) {
        hourCardBackground = document.getElementById(`hour${i}`);
        hourCardBackground.setAttribute('style', `background-image: url(${pokemonImages[i]}); background-repeat: no-repeat; background-size: 100%; background-position: bottom;`)
    }
    dayCardsDiv.setAttribute('style', `background-image: url(${pokemonImages[8]}); background-repeat: no-repeat; background-size: 100%; background-position: bottom`)
    return pokemonImages
}

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
            for (i = 0; i < 24; i++) {
                if (i > 7 && i < 23) {
                    continue;
                }
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
            console.log(condition);

            //plugs the weather condition at the hour into the pokemon go array to get the types boosted
            for (let i = 0; i < condition.length; i++) {
                boostedTypes.push(weatherBoosters[condition[i]])
            }
            
            console.log(boostedTypes)
            pokemonOfAType(boostedTypes)
                .then(pokemonSprites)

            displayMainCard(pokeWeather, boostedTypes);
            displayDaycard(pokeWeather, boostedTypes);
            displayHourCard(pokeWeather, boostedTypes);
            

           return boostedTypes

        })

        

       function displayMainCard(PokeWeather, typesOb){
           
     //connecting to weatherCards dive
        //var mainCardsDiv = document.querySelector(".mainCard");
  
    
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
            //mainCardsDiv.setAttribute("style","border:3px solid black; width:50%;")
            mainCardsDiv.setAttribute('class', 'container ring-2 ring-gray-900 h-80 w-40 mx-4 focus:scale-110')
    
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
            theTypesEl.textContent = typesO[8];
            //console.log(pokeWeather[0].main);
            //dayCardsDiv.setAttribute("style","border:3px solid black; width:50%;")
           dayCardsDiv.setAttribute('class', 'container ring-2 ring-gray-900 h-80 w-40 mx-4 focus:scale-110')
    
          // console.log(currentDate,currentTime, duration);
          dayCardsDiv.append(dateEl,conditionsEL,weatherIconEl,tempEl);


       }
       
       function displayHourCard(poki,boss)
       {
           for (var i = 1; i < 8; i++) {
                     //connecting to weatherCards dive
        //var hourlyCardsDiv = document.querySelector(".hourlyCards");
            let hourCard = document.getElementById(`hour${i}`)
    
        //displays for times and dates
           var currentTime = moment();
           //currentTime.add("1","hours");
           var newtime = currentTime.add(i,'hours');
           newtime.format("LT");

            
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
            //hourCard.setAttribute("style","border:3px solid black; width:50%;height:50%; display:flex; justify-content: space-between")
            hourCard.setAttribute('class', 'container ring-2 ring-gray-900 h-80 w-40 mx-4 hover:scale-110 font-semibold')
          // console.log(currentDate,currentTime, duration);
          hourCard.append(timeSlotEl,conditionsEL,weatherIconEl,tempEl,theTypesEl);
   
           }

       }
}


