'strict'
const quotecontainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn =document.getElementById('twitter');
const newQuoteBtn =document.getElementById('new-quote');
const loader = document.getElementById('loader')


/// show loading
function showLoadingSpinner () {
  loader.hidden = false;
  quotecontainer.hidden = true
}
 
// Hide loading
function removeLoadingSpinner() {
   if (!loader.hidden) {
     quotecontainer.hidden = false;
     loader.hidden = true
   }
}

//// get Quote from API 
 async function getQuote() {  
 showLoadingSpinner ()
  const proxyUrl = 'https://rocky-shore-01472.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
  try{
    const response = await fetch(proxyUrl+apiUrl);
 const data = await response.json()
//// if author is blank, add 'unknown';
 if (data.quoteAuthor === "") {
  authorText.innerText = 'unknown'
 
 } else { 
  authorText.innerText = data.quoteAuthor
 
}

//// reduce font size for long quotes
if (data.quoteText.length > 120) {
  quoteText.classList.add('long-quote')
}else {
  quoteText.classList.remove('long-quote')
}
quoteText.innerText = data.quoteText
   
/// stop loader, showquote
removeLoadingSpinner()
  }catch(error) {
  //  getQuote();
    console.log(`whoops, no quote`, error )
  }
  
 } 

/// tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author =authorText.innerText
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

/// Eventlistener
newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

 // On Load
 getQuote() 
//loading()

 







