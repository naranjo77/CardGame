import Deck from "./decK.js";
const CARD_VALUE_MAP ={
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "j": 11,
    "Q": 12,
    "K": 13,
    "A": 14,

}
const computerCardsSlot =document.querySelector(".computer-card-slot")
const playerCardsSlot = document.querySelector(".player-card-slot")
const computerDeckElement = document.querySelector('.computer-deck')
const playerDeckElement = document.querySelector('.player-deck')
const text = document.querySelector('.text')


let playerDeck, computerDeck , inRound, stop


document.addEventListener('click', () => {

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
function startGame(){
    const deck = new Deck()
    deck.shuffle()

    const deckMidpoint = Math.ceil(deck.numberOfCrads / 2)
    playerDeck = new Deck (deck.cards.slice(0, deckMidpoint))
    computerDeck = new Deck (deck.cards.slice(deckMidpoint, deck.numberOfCrads))
    inRound = false
    stop = false

    console.log(playerDeck)
    console.log(computerDeck)

    cleanBeforeRound()
}

function cleanBeforeRound() {
    inRound = false
    computerCardsSlot.innerHTML = ""
    playerCardsSlot.innerHTML = ""
    text.innerHTML = ""

    updateDeckCount()

}

function flipCards() {
    inRound = true

    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()

    playerCardsSlot.appendChild(playerCard.getHTML())
    computerCardsSlot.appendChild(computerCard.getHTML())

    updateDeckCount()

    if (isRoundWinner(playerCard, computerCard)) {
        text.innerText = "Win"
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
    } else if (isRoundWinner(computerCard, playerCard)) {
        text.innerText = "Lose"
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
    } else {
        text.innerText = "Draw"
        playerDeck.push(playerCard)
        computerDeck.push(computerCard)
    }


    if (isGameOver(playerDeck)) {
        text.innerText = "You Lose!"
        stop = true

    } else if (isGameOver(computerDeck)) {
        text.innerText = "You Win!"
        stop = true
    }



}

    


function updateDeckCount() {
    computerDeckElement.innerText = computerDeck.numberOfCrads
    playerDeckElement.innerText = playerDeck.numberOfCrads
}

function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]

}


function isGameOver(deck) {
    return deck.numberOfCrads === 0
}