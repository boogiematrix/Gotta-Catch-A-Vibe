var searchSubmitButtonE1 = document.getElementById("searchSubmitButton");
let city = document.getElementById('searchInput');
let cityGeocodeJson;
let hourlyJson;
var mainCardsDiv = document.querySelector(".mainCard");
var dayCardsDiv = document.querySelector(".dayCard");
var hourlyCardsDiv = document.querySelector(".hourlyCards");

const weatherApi = 'f7539453617679dd406d1369cc371b9e';

searchSubmitButtonE1.addEventListener("click", function (event) {
    event.preventDefault();
  
    getDataAndRender();

    //searchHistoryPopulate(city.value); // passes on the city name

})

//api call for the longitude and latitude
const geocode = async () => {
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=1&appid=${weatherApi}`;

    try {
        let response = await fetch(geocodeUrl);
        if (response.ok) {
            cityGeocodeJson = await response.json();
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
                backgroundPokemon.push(pokeTypeApiJson.pokemon[Math.floor(Math.random() * pokeTypeApiJson.pokemon.length)].pokemon.name)
            }
        }
        catch (error) { console.log(error) }     
    }
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
                if (pokeImageApiJson.sprites.other["official-artwork"].front_default) {
                    pokemonImages.push(pokeImageApiJson.sprites.other["official-artwork"].front_default)
                } else {
                    pokemonImages.push(pokeImageApiJson.sprites.front_default)
                }
            }
        }
        catch (error) { console.log(error) }
    }
    
    //sets the background pokemon image for each hour
    mainCardsDiv.setAttribute('style', `background-image: url(${pokemonImages[0]}); background-repeat: no-repeat; background-size: 45%; background-position: bottom`);
    for (i = 1; i < backgroundPokemon.length - 1; i++) {
        hourCardBackground = document.getElementById(`hour${i}`);
        hourCardBackground.setAttribute('style', `background-image: url(${pokemonImages[i]}); background-repeat: no-repeat; background-size: 75%; background-position: bottom;`)
    }
    //dayCardsDiv.setAttribute('style', `background-image: url(${pokemonImages[8]}); background-repeat: no-repeat; background-size: 35%; background-position: bottom`)
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
            var condition = [];
            let boostedTypes = [];

            elementTypes = "";
    
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

            //plugs the weather condition at the hour into the pokemon go array to get the types boosted
            for (let i = 0; i < condition.length; i++) {
                boostedTypes.push(weatherBoosters[condition[i]])
            }
            console.log(pokeWeather)
            pokemonOfAType(boostedTypes)
                .then(pokemonSprites)

            displayMainCard(condition, boostedTypes);
            //displayDaycard(condition, boostedTypes);
            displayHourCard(condition, boostedTypes);
            
            return boostedTypes

        })

}
function displayMainCard(condition, typesOb){
           
     //connecting to weatherCards div
    var mainCardsDiv = document.querySelector(".mainCard");
  
        //displays for times and dates
    var currentDate = moment().format("LL");

            //Creating the html elements  
    var dateEl = document.createElement("h4");
            //The time html Element
    var timeSlotEl = document.createElement("h3");
            //weather Icon
    var poweredTypes = document.createElement("h4");
             //weather condition
    var conditionsEL = document.createElement("p");
            // the temperature
    var tempEl = document.createElement("h4");
            //the types
    var theTypesEl = document.createElement("p");
    
            //Setting the html elements for the first card EX
    dateEl.textContent = 'Current Conditions';
    //var ftemp = Math.floor((PokeWeather.hourly[0].temp -273.15) * 1.8 +32);
    //timeSlotEl.textContent = "Now";
    poweredTypes.textContent = 'Boosted Types'
    //weatherIconEl.setAttribute("src","http://openweathermap.org/img/w/"+ PokeWeather.hourly[0].weather[0].icon + ".png");
    //tempEl.textContent ="Temp: " + ftemp;
    conditionsEL.textContent = condition[0].split('_').join(' ');
    theTypesEl.textContent = typesOb[0].join(", ");

    mainCardsDiv.setAttribute('class', 'container bg-blue-100 shadow-2xl rounded-md h-96 max-w-xl p-4 my-4 mx-auto text-center shadow-xl font-semibold')
    mainCardsDiv.append(dateEl, conditionsEL, poweredTypes, theTypesEl);


}
       
function displayDaycard(condition, typesO) {
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
    //var ftemp = Math.floor((pokeW.hourly[23].temp -273.15) * 1.8 +32);
    timeSlotEl.textContent = currentTime;
    
    //weatherIconEl.setAttribute("src","http://openweathermap.org/img/w/"+ pokeW.hourly[23].weather[0].icon + ".png");
    //tempEl.textContent ="Temp: " + ftemp;

    conditionsEL.textContent = condition[-1]//pokeW.hourly[23].weather[0].main;
    theTypesEl.textContent = typesO[8].join(", ");

    dayCardsDiv.setAttribute('class', 'container bg-blue-100 ring-2 ring-gray-900 h-96 max-w-xl p-4 my-4 mx-auto text-center font-semibold shadow-inner-lg')
    dayCardsDiv.append("Tommorow",conditionsEL,weatherIconEl,tempEl, "Powered-Up Types:", theTypesEl);


}
       
function displayHourCard(condition, boss) {
    
    for (var i = 1; i < 7; i++) {
                     //connecting to weatherCards dive
        let hourCard = document.getElementById(`hour${i}`)
    
        //displays for times and dates
        var currentTime = moment();
           //currentTime.add("1","hours");
        var newtime = currentTime.add(i,'hours');
        newtime.format("LT");
        
            //Creating the html elements  
            //The time html Element
        var timeSlotEl = document.createElement("h4");
            //weather Icon
        var weatherIconEl = document.createElement("img");
             //weather condition
        var conditionsEL = document.createElement("p");
            // the temperature
        let poweredTypes = document.createElement("h4");
            //the types
        var theTypesEl = document.createElement("p");
    
            //Setting the html elements for the first card EX
        //var ftemp = Math.floor((poki.hourly[i].temp -273.15) * 1.8 +32);
        timeSlotEl.textContent = newtime.format("LT");
        poweredTypes.textContent = 'Boosted Types'
        //weatherIconEl.setAttribute("src","http://openweathermap.org/img/w/"+ poki.hourly[i].weather[0].icon + ".png");
        //tempEl.textContent ="Temp: " + ftemp;
        conditionsEL.textContent = condition[i].split('_').join(' ')//poki.hourly[i].weather[0].main;
        theTypesEl.textContent = boss[i].join(", ");

        hourCard.setAttribute('class', 'container bg-blue-100 shadow-2xl rounded-md h-96 w-60 text-center p-4 my-4 mx-2 font-semibold justify-center inline-block')

          hourCard.append(timeSlotEl,conditionsEL, poweredTypes, theTypesEl);
   
    }

}



