/*-------------------------------- Constants --------------------------------*/
const cards = ['A' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9', 'T', 'J' , 'Q' , 'K']
const suits = ['h' , 'd' , 'c' , 's'] // Hearts, Diamonds, Clovers, Spades
/*---------------------------- Variables (state) ----------------------------*/
let deck = []
let playerHand = []
let dealerHand = []
let purse = 500
let bet
// let dealerBusted = false
// let playerBusted = false
// let playerPushes = false
/*------------------------ Cached Element References ------------------------*/

// let hitBtn = document.getElementById('hit-button')
// let dealBtn = document.getElementById('deal-button')
// let stayBtn = document.getElementById('stay-button')
// // let sitDownBtn = document.getElementById('sit-down-button')
// let displayDealerHandValue = document.getElementById('dealer-hand-value')
// let displayerPlayerHandValue = document.getElementById('player-hand-value')
// let displayPlayerHand = document.getElementById('player-cards')
// let displayDealerHand = document.getElementById('dealer-cards')
// let statusMessage = document.getElementById('game-status')
// let purseValue = document.getElementById('purse-value')
// let currentBet = document.getElementById('current-bet')
// let betInput = document.getElementById('bet-input')
// let betBtn = document.getElementById('bet-button')
// // let secondPhaseEls = document.querySelectorAll('.second')
// let testMessage = document.getElementById('test-message')

/*----------------------------- Event Listeners -----------------------------*/

// dealBtn.addEventListener('click', playRound)
// hitBtn.addEventListener('click', dealCard)
// stayBtn.addEventListener('click', dealerTurn)
// betBtn.addEventListener('click',updateBet)
// sitDownBtn.addEventListener('click', startGame)

/*-------------------------------- Functions --------------------------------*/

// function startGame(){
//   sitDownBtn.style.display = 'none'
//   for (let element of secondPhaseEls){
//     element.style.display = "block"
//   }
// }

// function render(){
//   displayCards()
//   displayHandValues()
//   displayButtons()
// }

// function playRound(){
//   playerHand = []
//   dealerHand = []
//   deck = []
//   createDeck()
//   shuffleDeck()
//   dealCards()
//   displayCards()
//   displayHandValues()
//   //blackjackCheck()
//   // determineWinner()
//   // updatePurse()
//   // endRound()
//   // console.log(playerHandValue());

// }


//determine winner

// function determineWinner(){
//   if (playerWins = true) {
//     // purse += bet
//     testMessage.innerHTML = 'player wins'
//   } else if (dealerWins = true) {
//     testMessage.innerHTML = 'player loses'
//     // purse -= bet
//     // bet = 0
//   } else if (playerPushes = true){
//     testMessage.innerHTML = 'player pushes'
//   }else {
//     testMessage.innerHTML = ''
//   }
// }


// function updatePurse(){
//   purseValue.innerHTML = `Purse: $${purse}`
// }

// function updateBet(){
//   bet = betInput.value
//   currentBet.innerHTML = `Current bet: $${bet}`
// }

// function dealerTurn(){
//   while (dealerHandValue() < 17) {
//       dealerHand.push(deck.splice(0,1)[0])
//   } 
//   render()
// }


// function endRound() {
//   if (playerBusted) {
//     hitBtn.style.display = 'none'
//     stayBtn.style.display = 'none'
//     betBtn.style.display = 'none'
//     betInput.style.display = 'none'
//   }
//   render()
// }

// function displayButtons(){
//   dealBtn.style.display
//   hitBtn.style.display
//   betBtn.style.display
//   stayBtn.style.display
//   betInput.style.display
// }


// function dealCard(){
//   // add functionality to stop allowing hit after 21 and switch turn to dealer
//   playerHand.push(deck.splice(0,1)[0])
//   // playerBusted = true
//   if(playerHandValue() > 21){
//     playerBusted = true
//     statusMessage.innerHTML=`player busts`
//   }

//   render()
// }

// function displayCards(){
//   displayDealerHand.innerHTML = dealerHand
//   // displayDealerHand.style.color = 'red'
//   displayPlayerHand.innerHTML = playerHand
// }

// function valueToCard(){
//   let newDiv = document.createElement('div')
//   for (let i = 0 ; i < dealerHand.length ; i++){
//     displayDealerHand.appendChild(newDiv)
//     newDiv.className = `card ${dealerHand[i]}`
//   }
// }

// function blackjackCheck(){
//   // need to add purse & bet variables, and then adjust based on blackjack result
//   if(playerHandValue() === 21 & dealerHandValue() === 21) {
//     statusMessage.innerHTML = 'Dealer and player have Blackjack. Player pushes.'
//   } else if (dealerHandValue() === 21) {
//     statusMessage.innerHTML = 'Dealer has Blackjack. Player loses.'
//   } else if (playerHandValue() === 21) {
//     statusMessage.innerHTML = 'Player has Blackjack! Player wins!'
//   } else {
//     statusMessage.innerHTML = ''
//   }
// }

// function displayHandValues(){
//   displayDealerHandValue.innerHTML = `${dealerHandValue()}`
//   displayerPlayerHandValue.innerHTML = `${playerHandValue()}`
// }

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

// function dealCards(){
//   playerHand.push(deck.splice(0,1)[0])
//   dealerHand.push(deck.splice(0,1)[0]) 
//   playerHand.push(deck.splice(0,1)[0])
//   dealerHand.push(deck.splice(0,1)[0]) 
// }

// function playerHandValue() {
//   let isoNum = playerHand.map(string => string.substring(1,2));
//   let cardValues = isoNum.map(cardToPoints)
//   let playerHandValue = cardValues.reduce((prev, point) => (prev + point), 0)
//   return playerHandValue
// }

// function dealerHandValue() {
//   let isoNum = dealerHand.map(string => string.substring(1,2));
//   let cardValues = isoNum.map(cardToPoints)
//   let dealerHandValue = cardValues.reduce((prev, point) => (prev + point), 0)
//   return dealerHandValue
// }

// function cardToPoints(card){
//   if(card === 'A') {
//     return 11 // 11 for simplicity. Later provide cases for A = 1 or 11
//   } else if (card === 'T' ||
//              card === 'J' ||
//              card === 'Q' ||
//              card === 'K' ){  
//     return 10
//   } else  {
//     return parseInt(card)
//   }
// }


