

// Using local variables

// function newRandomQuotes() {
//   // Pick a random quote from apiQuotes array
//   const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
//   console.log(quote);
// }
// newRandomQuotes()
// Using Fetch API
let apiQuotes = []


function newRandomQuotes() {
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
  console.log(quote);
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