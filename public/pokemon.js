const sprite = document.getElementById('sprite');
const quote = document.getElementById('quote')
let bulbadata = ''
let quoteData = ''

async function randomQuote() {
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
    })


