/*-------------------------------- Constants --------------------------------*/
const cards = ['A' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9', 'T', 'J' , 'Q' , 'K']
const suits = ['h' , 'd' , 'c' , 's'] // Hearts, Diamonds, Clovers, Spades
/*---------------------------- Variables (state) ----------------------------*/
let deck = []
let playerHand = []
let dealerHand = []
let purse = 500
let bet = 0
let playerWon = false
let dealerWon = false
let playerBusted = false
let dealerBusted = false
let playerHasBJ = false
let dealerHasBJ = false
let dealersTurn = false
/*------------------------ Cached Element References ------------------------*/

let hitBtn = document.getElementById('hit-button')
let dealBtn = document.getElementById('deal-button')
let stayBtn = document.getElementById('stay-button')
let clearBetBtn = document.getElementById('clear-bet')
// let sitDownBtn = document.getElementById('sit-down-button')
let displayDealerHandValue = document.getElementById('dealer-hand-value')
let displayPlayerHandValue = document.getElementById('player-hand-value')
let displayPlayerHand = document.getElementById('player-cards')
let displayDealerHand = document.getElementById('dealer-cards')
let statusMessage = document.getElementById('game-status')
let purseValue = document.getElementById('purse-value')
let currentBet = document.getElementById('current-bet')
let betInput = document.getElementById('bet-input')
let betBtn = document.getElementById('bet-button')
let dealerCardSpace = document.getElementById('dealer-card-space')
let playerCardSpace = document.getElementById('player-card-space')
// let secondPhaseEls = document.querySelectorAll('.second')
// let testMessage = document.getElementById('test-message')

/*----------------------------- Event Listeners -----------------------------*/

dealBtn.addEventListener('click', playRound)
hitBtn.addEventListener('click', hit)
stayBtn.addEventListener('click', dealerTurn)
betBtn.addEventListener('click',updateBet)
clearBetBtn.addEventListener('click', clearBet)
// sitDownBtn.addEventListener('click', startGame)

/*-------------------------------- Functions --------------------------------*/

// keeping for future icebox
// function startGame(){
//   sitDownBtn.style.display = 'none'
//   for (let element of secondPhaseEls){
//     element.style.display = "inline-block"
//   }
// }


function render(){
  displayCards()
  displayHandValues()
  message()
}

function playRound(){
  // hitBtn.style.display = 'flex'
  // stayBtn.style.display = 'flex'
  // dealBtn.style.display = 'none'

  deck = []
  playerHand = []
  dealerHand = []
  dealerWon = false
  playerWon = false
  playerBusted = false
  dealerBusted = false
  playerHasBJ = false
  dealerHasBJ = false
  dealersTurn = false

  createDeck()
  shuffleDeck()
  dealCards()
  blackjackCheck()  
  render()
}

function hit(){
  playerHand.push(deck.splice(0,1)[0])
  if (handValue(playerHand) >= 22) {
    // hitBtn.style.display = 'none'
    // stayBtn.style.display = 'none'
    playerBusted = true
    dealerTurn()
  } 
  render()
}

function dealerTurn(){
  dealersTurn = true
  // hitBtn.style.display = 'none'
  // stayBtn.style.display = 'none'
  if (handValue(playerHand) <= 21){
    while (handValue(dealerHand) < 17) {
        dealerHand.push(deck.splice(0,1)[0])
        render()
      } 
      if (handValue(dealerHand) > 21){
        dealerBusted = true
        playerWon = true
        endRound()
      }
  } else {
    dealerWon = true
    endRound()
  }
  if(!playerBusted && !dealerBusted){
    bothStay()
  }
  render()
}

function bothStay(){
  if (handValue(dealerHand) > handValue(playerHand)){
    dealerWon = true
    endRound()
  } else if (handValue(dealerHand) < handValue(playerHand)){
    playerWon = true
    endRound()
  } else if (handValue(dealerHand) === handValue(playerHand)){
    playerWon = true
    dealerWon = true
    endRound()
  }
}

function blackjackCheck(){
  if(handValue(playerHand) === 21 & handValue(dealerHand) === 21) {
    statusMessage.innerHTML = 'Dealer and player have Blackjack. Player pushes.'
    playerWon = true
    dealerWon = true
    dealerHasBJ = true
    playerHasBJ = true
    // hitBtn.style.display = 'none'
    // stayBtn.style.display = 'none'
    endRound()
  } else if (handValue(dealerHand) === 21) {
    statusMessage.innerHTML = 'Dealer has Blackjack. Player loses.'
    dealerWon = true
    dealerHasBJ = true
    // hitBtn.style.display = 'none'
    // stayBtn.style.display = 'none'
    endRound()
  } else if (handValue(playerHand) === 21) {
    statusMessage.innerHTML = 'Player has Blackjack! Player wins!'
    playerWon = true
    playerHasBJ = true
    // hitBtn.style.display = 'none'
    // stayBtn.style.display = 'none'
    endRound()
  } else {
    statusMessage.innerHTML = ''
  }
  render()
}

function message(){
  if(dealerWon && playerWon){
    statusMessage.textContent = 'Player pushes.'
  }else if (dealerWon) {
    statusMessage.textContent = 'Bad luck, dealer wins.'
  } else if (playerWon) {
    statusMessage.textContent = 'Player wins! Congratulations!'
  } else {
    statusMessage.textContent = 'Game is live - betting is closed.'
  }
}


function endRound() {
  if(playerWon && dealerWon){
    purse
  } else if(dealerWon){
    bet = 0
    currentBet.innerHTML = `Current bet: </br>$${bet}`
  } else if(playerWon && playerHasBJ){
    purse = parseInt(purse) + (parseInt(bet))*1.5
  } else if(playerWon){
    purse = parseInt(purse) + parseInt(bet)

  }
  updatePurse()
  // dealBtn.style.display = 'flex'
}

function updatePurse(){
  purseValue.innerHTML = `Purse: </br>$${parseInt(purse)}`
}

function clearBet(){
  purse = parseInt(purse) + parseInt(bet)
  bet = 0
  currentBet.innerHTML = `Current bet: </br>$${bet}`
  updatePurse()
}

function updateBet(){
  // need to proof this so that strings cannot be entered
  // and also to not allow to bet more than purse value
  bet = betInput.value
  currentBet.innerHTML = `Current bet: </br>$${bet}`
  purse = parseInt(purse) - parseInt(bet)
  betInput.value = ''
  updatePurse()
}

function displayCards(){
  
  if (dealersTurn || dealerHasBJ === true){
    dealerCardSpace.innerHTML = ''
    dealerHand.forEach(card => {
    let cardEl = document.createElement('div')
    cardEl.classList.add('card', 'large', `${card}`)
    dealerCardSpace.appendChild(cardEl)
    })
  } else {
    for (let i = 0 ; i < dealerHand.length ; i++){
      let cardEl = document.createElement('div')
      if(i === 0){
        dealerCardSpace.innerHTML = ''
        cardEl.classList.add('card', 'large', 'back-blue')
        dealerCardSpace.appendChild(cardEl)
      } else {
        cardEl.classList.add('card', 'large', `${dealerHand[i]}`)
        dealerCardSpace.appendChild(cardEl)
      }
    }  
  }

  playerCardSpace.innerHTML = ''
  playerHand.forEach(card => {
    let cardEl = document.createElement('div')
    cardEl.classList.add('card', 'large', `${card}`)
    playerCardSpace.appendChild(cardEl)
  })

}

function displayHandValues(){
  if (dealersTurn || dealerHasBJ === true){
    displayDealerHandValue.innerHTML = `${handValue(dealerHand)} `
  }else {  
    let firstCard = dealerHand[0]
    let firstCardNumber = firstCard.split('')
    let cardValue = cardToPoints(firstCardNumber[1])
    displayDealerHandValue.innerHTML = `${handValue(dealerHand) - cardValue}`
  }
  displayPlayerHandValue.innerHTML = `${handValue(playerHand)}`
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


function handValue(hand){
  let isoNum = hand.map(string => string.substring(1,2));
  let aceCheck = isoNum.some(ace => ace === 'A')
  let cardValues = isoNum.map(cardToPoints)
  let handValue = cardValues.reduce((prev, point) => (prev + point), 0)
  if(aceCheck && handValue > 21){
    return handValue - 10
  }else{
    return handValue
  }
}

function cardToPoints(card){
  if(card === 'A') {
    return 11
  } else if (card === 'T' ||
             card === 'J' ||
             card === 'Q' ||
             card === 'K' ){  
    return 10
  } else  {
    return parseInt(card)
  }
}


