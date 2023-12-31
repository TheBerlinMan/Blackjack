/*-------------------------------- Constants --------------------------------*/
const cards = ['A' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9', 'T', 'J' , 'Q' , 'K']
const suits = ['h' , 'd' , 'c' , 's'] // Hearts, Diamonds, Clovers, Spades
/*---------------------------- Variables (state) ----------------------------*/
let deck = []
let playerHand = []
let dealerHand = []
// let purse = 500
// let bet
let playerWon = false
let dealerWon = false
let playerBusted = false
let dealerBusted = false
let score = 0
/*------------------------ Cached Element References ------------------------*/

let hitBtn = document.getElementById('hit-button')
let dealBtn = document.getElementById('deal-button')
let stayBtn = document.getElementById('stay-button')
// let sitDownBtn = document.getElementById('sit-down-button')
let displayDealerHandValue = document.getElementById('dealer-hand-value')
let displayerPlayerHandValue = document.getElementById('player-hand-value')
let displayPlayerHand = document.getElementById('player-cards')
let displayDealerHand = document.getElementById('dealer-cards')
let statusMessage = document.getElementById('game-status')
// let purseValue = document.getElementById('purse-value')
// let currentBet = document.getElementById('current-bet')
// let betInput = document.getElementById('bet-input')
// let betBtn = document.getElementById('bet-button')
// let secondPhaseEls = document.querySelectorAll('.second')
// let testMessage = document.getElementById('test-message')

/*----------------------------- Event Listeners -----------------------------*/

dealBtn.addEventListener('click', playRound)
hitBtn.addEventListener('click', hit)
stayBtn.addEventListener('click', dealerTurn)
// betBtn.addEventListener('click',updateBet)
// sitDownBtn.addEventListener('click', startGame)

/*-------------------------------- Functions --------------------------------*/

// function startGame(){
//   sitDownBtn.style.display = 'none'
//   for (let element of secondPhaseEls){
//     element.style.display = "block"
//   }
// }


// function updatePurse(){
//   purseValue.innerHTML = `Purse: $${purse}`
// }

// function updateBet(){
//   bet = betInput.value
//   currentBet.innerHTML = `Current bet: $${bet}`
// }

function playRound(){
  playerHand = []
  dealerHand = []
  deck = []
  dealerWon = false
  playerWon = false
  playerBusted = false
  dealerBusted = false
  createDeck()
  shuffleDeck()
  dealCards()
  blackjackCheck()
  render()
  // updatePurse()
}

function hit(){

  playerHand.push(deck.splice(0,1)[0])
  if (playerHandValue() >= 22) {
    playerBusted = true
    dealerTurn()
  } 

  render()
}

function dealerTurn(){
  if (playerHandValue() <= 21){
    while (dealerHandValue() < 17) {
        dealerHand.push(deck.splice(0,1)[0])
        render()
      } 
      if (dealerHandValue() > 21){
        dealerBusted = true
        playerWon = true
        endRound()
        console.log(`dealer busts`);
      }
  } else {
    dealerWon = true
    endRound()
    console.log(`no need to deal player busted.`);}
  if(!playerBusted && !dealerBusted){
    bothStay()
  }
  
  render()
}

function bothStay(){
  if (dealerHandValue() > playerHandValue()){
    dealerWon = true
    endRound()
  } else if (dealerHandValue() < playerHandValue()){
    playerWon = true
    endRound()
  } else if (dealerHandValue() = playerHandValue()){
    playerWon = true
    dealerWon = true
    endRound()
  }
}

function endRound() {
  if (dealerWon) {
    score --
  } else if (playerWon) {
    score ++
  } else if (playerWon && dealerWon){
    console.log(`player pushses`);;
  }
}

function render(){
  displayCards()
  displayHandValues()
  displayScore()
}

function blackjackCheck(){
  // need to add purse & bet variables, and then adjust based on blackjack result
  if(playerHandValue() === 21 & dealerHandValue() === 21) {
    // statusMessage.innerHTML = 'Dealer and player have Blackjack. Player pushes.'
    playerWon = true
    dealerWon = true
    console.log('player and dealer have blackjack');
    endRound()
  } else if (dealerHandValue() === 21) {
    // statusMessage.innerHTML = 'Dealer has Blackjack. Player loses.'
    dealerWon = true
    console.log('dealer has blackjack');
    // console.log(dealerWins);
    endRound()
  } else if (playerHandValue() === 21) {
    // statusMessage.innerHTML = 'Player has Blackjack! Player wins!'
    playerWon = true
    console.log('player has blackjack');
    // console.log(playerWins);
    endRound()
  } else {
    // statusMessage.innerHTML = ''
  }
  render()
}

function displayHandValues(){
  displayDealerHandValue.innerHTML = `${dealerHandValue()}`
  displayerPlayerHandValue.innerHTML = `${playerHandValue()}`
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

function displayScore(){
  statusMessage.innerHTML = `score: ${score}`
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

function playerHandValue() {
  let isoNum = playerHand.map(string => string.substring(1,2));
  let cardValues = isoNum.map(cardToPoints)
  let playerHandValue = cardValues.reduce((prev, point) => (prev + point), 0)
  return playerHandValue
}

function dealerHandValue() {
  let isoNum = dealerHand.map(string => string.substring(1,2));
  let cardValues = isoNum.map(cardToPoints)
  let dealerHandValue = cardValues.reduce((prev, point) => (prev + point), 0)
  return dealerHandValue
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


