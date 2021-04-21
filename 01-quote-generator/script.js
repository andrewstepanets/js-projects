

// Using local variables

// function newRandomQuotes() {
//   // Pick a random quote from apiQuotes array
//   const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
//   console.log(quote);
// }
// newRandomQuotes()
// Using Fetch API

const quoteContainer = document.querySelector('#quote-container')
const quoteText = document.querySelector('#quote')
const authorText = document.querySelector('#author')
const twitterBtn = document.querySelector('#twitter')
const newQuoteBtn = document.querySelector('#new-quote')
const loader = document.querySelector('#loader')

let apiQuotes = []


function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

function newRandomQuotes() {
  showLoadingSpinner()
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
  // check if Author field is blank and replace it 
  !quote.author
    ? (authorText.textContent = 'Author Unknown')
    : (authorText.textContent = quote.author);

  //Check Quote length to determine styling 
  (quoteText.textContent.length > 120)
    ? quoteText.classList.add('long-quote')
    : quoteText.classList.remove('long-quote')

  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Get Quotes From API 

// async function getQuotes() {
//   loading();
//   const apiUrl = 'https://type.fit/api/quotes';
//   try {
//     const response = await fetch(apiUrl)
//     apiQuotes = await response.json()
//     newRandomQuotes()
//   } catch (error) {
//     // Catch Error Here 
//     console.log(error);
//   }
// }

// Solving Problem with CORS policy

async function getQuote() {
  loading();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl)
    const data = await response.json()
    // Check if author is 'Unknown'
    if (data.quoteAuthor == '') {
      authorText.innerText = 'Unknown Author'
    } else {
      authorText.innerText = data.quoteAuthor
    }

    // Reduce font size for long quotes

    if (data.authorText.length > 120) {
      quoteText.classList.add('long-quote')
    } else {
      quoteText.classList.remove('long-quote')
    }
    authorText.innerText = data.quoteAuthor
    // Stop Loading 
    complete();
  } catch (error) {
    // Catch Error Here 
    console.log(error);
  }
}

// Tweet Quote 

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterUrl, '_blank')
}

// Event Listeners 
newQuoteBtn.addEventListener('click', newRandomQuotes)
twitterBtn.addEventListener('click', tweetQuote)

getQuote()