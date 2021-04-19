

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

let apiQuotes = []


function newRandomQuotes() {
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
  quoteText.textContent = quote.text;
}

// Get Quotes From API 

async function getQuotes() {
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
    newRandomQuotes()
  } catch (error) {
    // Catch Error Here 
    console.log(error);
  }
}

getQuotes()