/*-------------------------------- Constants --------------------------------*/
const cards = ['A' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9', 'T', 'J' , 'Q' , 'K']
const suits = ['h' , 'd' , 'c' , 's'] // Hearts, Diamonds, Clovers, Spades
/*---------------------------- Variables (state) ----------------------------*/
let deck = []
let playerHand = []
let dealerHand = []
let purse = 500
let bet
/*------------------------ Cached Element References ------------------------*/

let hitBtn = document.getElementById('hit-button')
let dealBtn = document.getElementById('deal-button')
let stayBtn = document.getElementById('stay-button')
let displayDealerHandValue = document.getElementById('dealer-hand-value')
let displayerPlayerHandValue = document.getElementById('player-hand-value')
let displayPlayerHand = document.getElementById('player-cards')
let displayDealerHand = document.getElementById('dealer-cards')
let statusMessage = document.getElementById('game-status')
let purseValue = document.getElementById('purse-value')
let currentBet = document.getElementById('current-bet')
let betInput = document.getElementById('bet-input')
let betBtn = document.getElementById('bet-button')



/*----------------------------- Event Listeners -----------------------------*/

dealBtn.addEventListener('click', playRound)
hitBtn.addEventListener('click', dealCard)
stayBtn.addEventListener('click', dealerTurn)

/*-------------------------------- Functions --------------------------------*/

// to be done:
//// - add hit functionality
//// - add stay functionality (switch to dealer turn)
//// - dealers turn
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


function dealerTurn(){
  // this can be made into a loop... possible for ... while? need to investigate 
  // would also be nice to delay each draw somehow
  if(dealerHandValue() < 17){
    dealerHand.push(deck.splice(0,1)[0])
  }
  if(dealerHandValue() < 17){
    dealerHand.push(deck.splice(0,1)[0])
  }
  if(dealerHandValue() < 17){
    dealerHand.push(deck.splice(0,1)[0])
  }
  render()
}

function dealCard(){
  // add functionality to stop allowing hit after 21 and switch turn to dealer
  let newCard = playerHand.push(deck.splice(0,1)[0])
  if(playerHandValue() > 21){
    statusMessage.innerHTML=`player busts`
  }
  render(newCard)
}

function render(newCard){
  displayCards()
  displayHandValues()
}


function displayCards(){
  displayDealerHand.innerHTML = dealerHand
  // displayDealerHand.style.color = 'red'
  displayPlayerHand.innerHTML = playerHand
}


// function valueToCard(){
//   let newDiv = document.createElement('div')
//   for (let i = 0 ; i < dealerHand.length ; i++){
//     displayDealerHand.appendChild(newDiv)
//     newDiv.className = `card ${dealerHand[i]}`
//   }
// }

  


function blackjackCheck(){
  // need to add purse & bet variables, and then adjust based on blackjack result
  if(playerHandValue() === 21 & dealerHandValue() === 21) {
    statusMessage.innerHTML = 'Dealer and player have Blackjack. Player pushes.'
  } else if (dealerHandValue() === 21) {
    statusMessage.innerHTML = 'Dealer has Blackjack. Player loses.'
  } else if (playerHandValue() === 21) {
    statusMessage.innerHTML = 'Player has Blackjack! Player wins!'
  } else {
    statusMessage.innerHTML = ''
  }
}

function displayHandValues(){
  displayDealerHandValue.innerHTML = `${dealerHandValue()}`
  displayerPlayerHandValue.innerHTML = `${playerHandValue()}`
}

function createDeck(){
  for (let i = 0 ; i < cards.length ; i++){
    for (let v = 0 ; v < suits.length ; v++){
     deck.push(suits[v] + cards[i])
    }
  }
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
  let stringValues = playerHand.map(string => string.substring(1,2));
  let cardValues = stringValues.map(cardToPoints)
  let totalHandValue = cardValues.reduce((prev, point) => (prev + point), 0)
  return totalHandValue
}

function dealerHandValue() {
  let stringValues = dealerHand.map(string => string.substring(1,2));
  let cardValues = stringValues.map(cardToPoints)
  let totalHandValue = cardValues.reduce((prev, point) => (prev + point), 0)
  return totalHandValue
}