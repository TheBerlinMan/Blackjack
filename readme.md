

main loop : 

<!-- - sit down (first scene)
- accept bet , deal cards or walk away
- hit or stay
- if player busts, dealer wins
- if players stays, dealers turn
- if player busted, don't draw cards
- if player hasn't busted, draw cards until 17
- if dealer busts, player wins
- if dealer doesn't bust and stays below 21, compare dealer to player card values
- accept bet, deal cards or walk away -->


- deal
- check for blackjack
-- if blackjack = true => endgame
-- if blackjack = false => playerTurn
- playerTurn (hit or stay)
-- if hit && handvalue > 21 => endgame
-- if stay => dealerturn
- dealerTurn (draw until 17)
-- if dealer handvalue > 21 => endgame
-- if dealer stays below 21 => endgame
- endgame

