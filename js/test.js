let hand = ['hA', 'd2']

let handDiv = document.getElementById('hand')

hand.forEach(card =>{

  let cardEl = document.createElement('div')
  cardEl.classList.add('card')
  handDiv.appendChild(card)
  


  // console.log(newDiv.childNodes);

})

// let newDiv = document.createElement('div')
  // let para = document.createElement('p')
  // newDiv.append(para)
  // console.log(newDiv.childNodes);
