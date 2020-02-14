const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quote-display');
const writingPad = document.getElementById('writing-pad');
const startBtn = document.getElementById('startBtn');
const timerElem = document.getElementById('timer');
const bannerElem = document.getElementById('banner');
const top5ListItems = document.getElementById('top-5-list-items');

async function getTop5() {
    try { 
    resp = await fetch("/top5")
} catch (err) {
    console.log("Top 5 fetching error")
    console.log(err)
}
// console.log(`top 5 found ${resp.json()}`)
var respJSON = await resp.json();
console.log(`top 5 found ${JSON.stringify(respJSON)}`)
let currentTop5 = ''
respJSON.forEach((item) => currentTop5 += `<li>${item.name}- ${item.time}</li>`)
top5ListItems.innerHTML = currentTop5;
}
getTop5();

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
    if (correct) {
        writingPad.disabled = true
        startBtn.disabled = false
        const elapsedSecs = (new Date().getTime() - startTime)/1000
        console.log(elapsedSecs + " total seconds elapsed")
        clearInterval(timerID)
        bannerElem.innerText = `Great job David. You did that in ${elapsedSecs} seconds.` +
        ` I'd like to use this as a base for the next mini project we do and record` +
        ` a top 5 using db connection.  Let me know what you think. -JP`
        bannerElem.style.display = "block"
    }
})

startBtn.addEventListener('click', () => {
    console.log('click')
    startBtn.disabled = true
    writingPad.value = null
    writingPad.disabled = false
    bannerElem.style.display = "none"
    startCountdown().then(() => {
        console.log("finished countdown")
        console.log(timerID);
        renderNewQuote()
        writingPad.focus()
        startTimer()
        //startBtn.disabled = false;
    });

})

const startCountdown = () => {
    return new Promise((resolve, reject) => {
        timerElem.innerText = "-";
        quoteDisplayElement.innerText = "3"
        console.log("3")
        let i = 2
        let countdown = setInterval(() => {
            quoteDisplayElement.innerText = i
            console.log(i)
            i--
            if (i === -1) {
                clearInterval(countdown)
                resolve(countdown)
            }
        }, 1 * 1000)
    })
}

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

let startTime, timerID
function startTimer() {
    startTime = new Date().getTime();
    timerElem.innerText = 0;
    timerID = setInterval(() => {
        const currentSecond = Math.floor((new Date().getTime() - startTime) / 1000)
        timerElem.innerText = currentSecond
    }, 1000);
}

