const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quote-display');
const writingPad = document.getElementById('writing-pad');
const startBtn = document.getElementById('startBtn');

writingPad.addEventListener('input', () => {
    const writingPadArray = writingPad.value.split('')
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    let correct = true
    arrayQuote.forEach((spanLetter, index) => {
        if (writingPadArray[index] === undefined) {
            arrayQuote[index].classList.remove('correct')
            arrayQuote[index].classList.remove('incorrect')
            correct = false
        } else if (spanLetter.innerHTML === writingPadArray[index]) {
            arrayQuote[index].classList.remove('incorrect')
            arrayQuote[index].classList.add('correct')
        } else {
            arrayQuote[index].classList.remove('correct')
            arrayQuote[index].classList.add('incorrect')
            correct = false
        }
    })
    if (correct) console.log(renderNewQuote())
})

startBtn.addEventListener('click', () => {
    console.log('click')
    startBtn.disabled = true;
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    console.log(quote);
    quoteDisplayElement.innerText = '';
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    });
    writingPad.value = null;
}

renderNewQuote();

