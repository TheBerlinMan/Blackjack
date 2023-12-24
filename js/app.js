/*-------------------------------- Constants --------------------------------*/
const cards = ['A' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9', 'T', 'J' , 'Q' , 'K']
const suits = ['H' , 'D' , 'C' , 'S'] // Hearts, Diamonds, Clovers, Spades
/*---------------------------- Variables (state) ----------------------------*/
let deck = []
let playerHand = []
let dealerHand = []
/*------------------------ Cached Element References ------------------------*/

let hitBtn = document.getElementById('hit-button')
let dealBtn = document.getElementById('deal-button')
let displayDealerHandValue = document.getElementById('dealer-hand-value')
let displayerPlayerHandValue = document.getElementById('player-hand-value')
let displayPlayerHand = document.getElementById('player-cards')
let displayDealerHand = document.getElementById('dealer-cards')
let resultMessage = document.getElementById('result-message')


/*----------------------------- Event Listeners -----------------------------*/

dealBtn.addEventListener('click', playRound)
hitBtn.addEventListener('click', dealCard)

/*-------------------------------- Functions --------------------------------*/

// to be done:
// - add hit functionality
// - add stay functionality (switch to dealer turn)
// - dealers turn
// - decide winner
// - add purse, bet variables in JS, bet input element in HTML
// - adjust code to include winning/losing of bet 
// - style
// - walk away functionality (add button in HTML too) 
// - new game functionality (add button in HTML too) 
// - adjust ace to be 1 or 11 and effected code

function playRound(){
  playerHand = []
  dealerHand = []
  deck = []
  createDeck()
  shuffleDeck()
  dealCards()
  displayCards()
  displayHandValues()
  blackjackCheck()
}

function dealCard(){
  let newCard = playerHand.push(deck.splice(0,1)[0])
  if(playerHandValue() > 21){
    resultMessage.innerHTML=`player busts`
  }
  render(newCard)
}

function render(newCard){
  displayCards()
  displayHandValues()
}


function displayCards(){
  displayDealerHand.innerHTML = dealerHand
  displayDealerHand.style.color = 'red'
  displayPlayerHand.innerHTML = playerHand
}

function blackjackCheck(){
  // need to add purse & bet variables, and then adjust based on blackjack result
  if(playerHandValue() === 21 & dealerHandValue() === 21) {
    resultMessage.innerHTML = 'Dealer and player have Blackjack. Player pushes.'
  } else if (dealerHandValue() === 21) {
    resultMessage.innerHTML = 'Dealer has Blackjack. Player loses.'
  } else if (playerHandValue() === 21) {
    resultMessage.innerHTML = 'Player has Blackjack! Player wins!'
  } else {
    resultMessage.innerHTML = ''
  }
}

function displayHandValues(){
  displayDealerHandValue.innerHTML = `dealer shows: ${dealerHandValue()}`
  displayerPlayerHandValue.innerHTML = `player shows: ${playerHandValue()}`
}

function createDeck(){
  for (let i = 0 ; i < cards.length ; i++){
    for (let v = 0 ; v < suits.length ; v++){
     deck.push(cards[i] + suits[v])
    }
  }
  return deck
}

function shuffleDeck(){
  for (let i = 0 ; i < deck.length ; i++){
    let tempCard = deck[i]
    let randomIndex = Math.floor(Math.random() * 52)
    deck[i] = deck[randomIndex]
    deck[randomIndex] = tempCard
  }
}

function dealCards(){
  playerHand.push(deck.splice(0,1)[0])
  dealerHand.push(deck.splice(0,1)[0]) 
  playerHand.push(deck.splice(0,1)[0])
  dealerHand.push(deck.splice(0,1)[0]) 
}

function cardToPoints(card){
  if(card === 'A') {
    return 11 // 11 for simplicity. Later provide cases for A = 1 or 11
  } else if (card === 'T' ||
             card === 'J' ||
             card === 'Q' ||
             card === 'K' ){  
    return 10
  } else  {
    return parseInt(card)
  }
}

function playerHandValue() {
  let stringValues = playerHand.map(string => string.substring(0,1));
  let cardValues = stringValues.map(cardToPoints)
  let totalHandValue = cardValues.reduce((prev, point) => (prev + point), 0)
  return totalHandValue
}

function dealerHandValue() {
  let stringValues = dealerHand.map(string => string.substring(0,1));
  let cardValues = stringValues.map(cardToPoints)
  let totalHandValue = cardValues.reduce((prev, point) => (prev + point), 0)
  return totalHandValue
}