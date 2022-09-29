import Deck from "./deck.js"

var dealerSum = 0;
var playerSum = 0; 
var dealerAceCount = 0;
var playerAceCount = 0;
var canHit = true;
var canStay = true;   
var deck;  

startGame();

function startGame() {
 deck = new Deck();
 deck.shuffle();
 var cardImg = document.createElement("img");
 var dealerCard = deck.pop();
 cardImg.src = `./deckimg/${dealerCard.value}${dealerCard.suit}.png`
 document.getElementById("dealer-cards").append(cardImg); 
 dealerSum += getValue(dealerCard);
 
 
 for(let i = 0; i < 2; i++) {
  var playerCardImg = document.createElement("img");
  var playerCard = deck.pop();
  playerCardImg.src = `./deckimg/${playerCard.value}${playerCard.suit}.png`
  document.getElementById("player-cards").append(playerCardImg);
  playerSum += getValue(playerCard);
 }
 
 updateScore();
 if(playerSum >= 21) {
  stay();
  return; 
  } 

 document.getElementById("new").addEventListener("click", newGame);
 document.getElementById("hit").addEventListener("click", hit);
 document.getElementById("stay").addEventListener("click", stay);
 document.getElementById("double").addEventListener("click", double);

}

function newGame() {
  var dealerCards = document.getElementById("dealer-cards");
  dealerCards.innerText = "";
  var hiddenImg = document.createElement("img");
  hiddenImg.id = "hidden";
  hiddenImg.src = `./deckimg/backcard.png`;
  dealerCards.append(hiddenImg);
  
  dealerSum = 0;
  playerSum = 0;
  canHit = true;
  canStay = true;   
  
  document.getElementById("player-cards").innerText = "";
  document.getElementById("player-sum").innerText = ""; 
  document.getElementById("dealer-sum").innerText = ""; 
  
  updateScore(); 
  startGame();
}

function hit() { 
  if(!canHit) return;
  
  var cardImg = document.createElement("img");
  let playerCard = deck.pop();
  cardImg.src = `./deckimg/${playerCard.value}${playerCard.suit}.png`
  document.getElementById("player-cards").append(cardImg);
  playerSum += getValue(playerCard);
  updateScore(); 

  if(playerSum >= 21) {
    stay();
  } 
  
  
}

function stay() {
  canHit = false;
  if(canStay) {
    dealersTurn();
  }
  canStay = false;  
}

function double() {
  hit();
  stay();
}

function updateScore() {
  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("player-sum").innerText = playerSum;
}

function getValue(card) {
  var cardValue = parseInt(card.value);
  if(isNaN(cardValue)) {
    if(card.value == 'A') {
      return 11; 
    }
    return 10; 
  }
  return cardValue; 
}

function dealersTurn() {
  var hiddenCard = deck.pop();
  console.log("hidden card: " + hiddenCard.value + hiddenCard.suit);
  var setHidden = document.getElementById("hidden");
  setHidden.src = `./deckimg/${hiddenCard.value}${hiddenCard.suit}.png`;
  dealerSum += getValue(hiddenCard);
  updateScore();

  while(dealerSum < 17) {
    var cardImg = document.createElement("img");
    var dealerCard = deck.pop();
    cardImg.src = `./deckimg/${dealerCard.value}${dealerCard.suit}.png`
    document.getElementById("dealer-cards").append(cardImg); 
    dealerSum += getValue(dealerCard);
  }
  
  updateScore();

}