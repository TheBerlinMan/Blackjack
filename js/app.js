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


/*----------------------------- Event Listeners -----------------------------*/

dealBtn.addEventListener('click', playRound)

/*-------------------------------- Functions --------------------------------*/


function playRound(){
  playerHand = []
  dealerHand = []
  deck = []
  createDeck()
  shuffleDeck()
  dealPlayerHand()
  dealDealerHand()
  dealerHandValueDisplay.innerHTML = dealerHandValue()
  playerHandValueDisplay.innerHTML = playerHandValue()
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

function dealPlayerHand(){
  playerHand.push(deck[0],deck[2])
}

function dealDealerHand(){
  dealerHand.push(deck[1])
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