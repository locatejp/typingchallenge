const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quote-display');
 const writingPad = document.getElementById('writing-pad');

function getRandomQuote () {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote () {
const quote = await getRandomQuote();
console.log(quote);
quoteDisplayElement.innerText = '';
quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.classList.add('correct')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
});
writingPad.value = null;
}

renderNewQuote();

