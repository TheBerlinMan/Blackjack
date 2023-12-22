
const cards = ['A' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9', '10', 'J' , 'Q' , 'K']
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

