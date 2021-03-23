//const sprite = document.getElementById('sprite');
//const quote = document.getElementById('quote');
let cityGeocodeJson
let hourlyJson
//let bulbadata = '';
//let quoteData = '';

const weatherApi = 'f7539453617679dd406d1369cc371b9e'


/*async function randomQuote() {
    const response = await fetch('https://api.quotable.io/random')
    quoteData = await response.json()
    console.log(`${quoteData.content} —${quoteData.author}`)
}

async function randomPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/')
    const data = await response.json();
    const bulbasaur = await fetch(data.results[0].url)
    bulbadata = await bulbasaur.json();
    console.log(bulbadata)
    //obj = bulbadata
}

randomQuote()
    .then(
        randomPokemon())
    .then(function () {
        console.log(bulbadata)
        sprite.src = bulbadata.sprites.other.dream_world.front_default
        quote.textContent = `${quoteData.content} -${bulbadata.name}`
    })*/

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

const pokemonGo = async () => {

    try {
        let response = await fetch('https://pokemon-go1.p.rapidapi.com/weather_boosts.json', {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "119f8e8ccdmsh2f0baf11616eba9p17e7e2jsn222509c198f4",
                "x-rapidapi-host": "pokemon-go1.p.rapidapi.com"
            }
        });
        if (response.ok) {
            pokemonGoJson = await response.json();
            console.log(pokemonGoJson)
            return pokemonGoJson
        }
    }
    catch (error) { console.log(error) }
}


geocode()
    //.then(hourlyWeather)
    //.then(pokemonGo)
    .then(function () {
        return Promise.all([hourlyWeather(), pokemonGo()])
    })
    .then(function (pokeWeather) {
        let condition = [];

        for (i = 0; i < 8; i++) {
            let weatherId = pokeWeather[0].hourly[i].weather[0].id;
            let main = pokeWeather[0].hourly[i].weather[0].main
            if (main === 'Rain' || main === 'Drizzle') {
                condition.push('Rainy');
            } else if (main === 'Snow') {
                condiiton.push('Snow');
            } else if (weatherId >= 801 && weatherId <= 803) {
                condition.push('Partly cloudy');
            } else if (pokeWeather[0].hourly[i].wind_gust + pokeWeather[0].hourly[i].wind_speed > 34.2) {
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
        //rendering

    })