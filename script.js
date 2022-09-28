import Deck from "./deck.js"

const CARD_VALUE_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}

const computerCardSlot = document.querySelector(".computer-card-slot")
const secondComputerCardSlot = document.querySelector(".computer-card-slot2")

const playerCardSlot = document.querySelector(".player-card-slot")
const secondPlayerCardSlot = document.querySelector(".player-card-slot2")

const computerDeckElement = document.querySelector(".computer-deck")

const text = document.querySelector(".text")

let inRound, stop;
let deckOfCards = new Deck(); 

document.addEventListener("click", () => {
  if (stop) {
    startGame()
    return
  }

  if (inRound) {
    cleanBeforeRound()
  } else {
    flipCards()
  }
})

startGame()
function startGame() {
    
  deckOfCards.shuffle()
  inRound = false
  stop = false

  cleanBeforeRound()
}

function cleanBeforeRound() {
  inRound = false
  computerCardSlot.innerHTML = ""
  secondComputerCardSlot.innerHTML = ""

  playerCardSlot.innerHTML = ""
  secondPlayerCardSlot.innerHTML = ""

  text.innerText = ""

  updateDeckCount()
}

function flipCards() {
  inRound = true

  const playerCard = deckOfCards.pop()
  const playerSecondCard = deckOfCards.pop()

  const computerCard = deckOfCards.pop()
  const computerSecondCard = deckOfCards.pop()

  playerCardSlot.appendChild(playerCard.getHTML())
  secondPlayerCardSlot.appendChild(playerSecondCard.getHTML())

  computerCardSlot.appendChild(computerCard.getHTML())
  secondComputerCardSlot.appendChild(computerSecondCard.getHTML())

  updateDeckCount()

  if (isRoundWinner(playerCard, playerSecondCard, computerCard, computerSecondCard)) {
    text.innerText = "Player won."
    deckOfCards.push(playerCard)
    deckOfCards.push(playerSecondCard)
    
    deckOfCards.push(computerCard)
    deckOfCards.push(computerSecondCard)

  } else if (!isRoundWinner(playerCard, playerSecondCard, computerCard, computerSecondCard)) {
    text.innerText = "Computer won."
    deckOfCards.push(playerCard)
    deckOfCards.push(playerSecondCard)

    deckOfCards.push(computerCard)
    deckOfCards.push(computerSecondCard)

  } else {
    text.innerText = "Draw"
    deckOfCards.push(playerCard)
    deckOfCards.push(playerSecondCard)

    deckOfCards.push(computerCard)
    deckOfCards.push(computerSecondCard)
  }
}

function updateDeckCount() {
  computerDeckElement.innerText = deckOfCards.numberOfCards
}

function isRoundWinner(playerCard, playerSecondCard, computerCard, computerSecondCard) {
  let playerSum = CARD_VALUE_MAP[playerCard.value] + CARD_VALUE_MAP[playerSecondCard.value];
  let computerSum = CARD_VALUE_MAP[computerCard.value] + CARD_VALUE_MAP[computerSecondCard.value];
  console.log(`playerSum = ${playerSum}`)
  console.log(`computerSum = ${computerSum}`)
  return playerSum > computerSum
}
