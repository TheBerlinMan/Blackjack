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
let dealerHandValueDisplay = document.getElementById('dealer-hand-value')
let playerHandValueDisplay = document.getElementById('player-hand-value')
let resultMessage = document.getElementById('result-message')


/*----------------------------- Event Listeners -----------------------------*/

dealBtn.addEventListener('click', playRound)

/*-------------------------------- Functions --------------------------------*/


function playRound(){
  playerHand = []
  dealerHand = []
  deck = []
  createDeck()
  shuffleDeck()
  dealHands()
  displayHandValues()
  blackjackCheck()
}

function blackjackCheck(){
  if(playerHandValue() === 21 & dealerHandValue() === 21) {
    resultMessage.innerHTML = 'Dealer and player have Blackjack. Player pushes.'
  } 
  if (dealerHandValue() === 21) {
    resultMessage.innerHTML = 'Dealer has Blackjack. Player loses.'
  } 
  if (playerHandValue() === 21) {
    resultMessage.innerHTML = 'Player has Blackjack! Player wins!'
  }
}


function displayHandValues(){
  dealerHandValueDisplay.innerHTML = `dealer shows: ${dealerHandValue()}`
  playerHandValueDisplay.innerHTML = `player shows: ${playerHandValue()}`
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

function dealHands(){
  playerHand.push(deck[0],deck[2])
  dealerHand.push(deck[1],deck[3]) 
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