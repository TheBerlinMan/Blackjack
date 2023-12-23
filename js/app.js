
const cards = ['A' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9', 'T', 'J' , 'Q' , 'K']
const suits = ['H' , 'D' , 'C' , 'S'] // Hearts, Diamonds, Clovers, Spades
const deck = []

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

// create shuffled deck

createDeck()
shuffleDeck()
console.log(deck)

// distribute cards from deck to player/dealer hands

let playerHand = []

playerHand.push(deck[0],deck[2])
console.log(playerHand)

let dealerHand = []

dealerHand.push(deck[1])
console.log(dealerHand)

// determine player/dealer hand values 

let stringValues = playerHand.map(string => string.substring(0,1));
console.log(stringValues);



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

let handValue = stringValues.map(cardToPoints)
console.log(handValue)

