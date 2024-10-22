const minRandom = 1
const maxRandom = 100
const defaultAttempts = 4

let guessButton = document.querySelector("#guessButton")
let inputBox = document.querySelector("#guess")
let descriptionParagraph = document.querySelector("#descriptionText")

// Internals
let randomValue = getRandomInt(minRandom, maxRandom)
let invalidValueInput = false
let attempts = defaultAttempts

/**
 *
 * @param {*} min min random
 * @param {*} max max random
 * @returns random int value between the given interval
 */
function getRandomInt(min = 1, max = 10) {
    let myNum = Math.floor(Math.random() * (max - min)) + min;
    console.log(myNum)
    return myNum 
}

function processHints(goal, selectedVal) {
    return selectedVal < goal ? "Troppo piccolo!" : "Troppo Grande!"
}

/**
 * Handles the main button click event
 * @param {*} event click event 
 * @returns 
 */
function handleClick(event) {
    
    let inputVal = inputBox.value

    if (attempts > 0) {
        
        if (validate(inputVal)) {

            let numVal = parseInt(inputVal)

            if (numVal === randomValue) {
                showPlayAgain()
                guessButton.value = "Hai vinto!"
                return
            }

            guessButton.value = processHints(randomValue, numVal)
            attempts--
            updateAttempts()
        }

    } else {
        showPlayAgain()
    }
}

/**
 * Validates the input value after having sanitized it
 * @param {*} inputVal The value of the input textbox
 * @returns true if the input is valid
 */
function validate(inputVal) {
    
    inputVal = sanitize(inputVal)

    if (inputVal === "") {
        invertButtonColors(false)
        invalidValueInput = true
        guessButton.value = "Input non valido"
        return false
    }

    if (invalidValueInput === true) {
        invertButtonColors(true)
        invalidValueInput = false
    }

    return true
}

/**
 * Changes the main button colors based on the given boolean value
 * @param {*} success green button 
 */
function invertButtonColors(success) {

    guessButton.classList.remove(success ? "btn-danger" : "btn-success")
    guessButton.classList.add(success ? "btn-success" : "btn-danger")

}

/**
 * Sanitizes the given string
 * @param {*} inputVal target value
 * @returns sanitized string
 */
function sanitize(inputVal) {
    return inputVal.trim().toLowerCase()
}

/**
 * Shows the play again button
 */
function showPlayAgain() {

    guessButton.setAttribute("disabled", true)
    let playAgainButton = document.querySelector("#playAgainButton")

    playAgainButton.classList.remove("d-none")

}

/**
 * Handles the click event for the play again button
 * Restarts the game.
 */
function playAgain(event) {

    let playAgainButton = document.querySelector("#playAgainButton")

    guessButton.value = "Indovina il numero"

    attempts = defaultAttempts
    randomValue = getRandomInt(minRandom, maxRandom)

    updateAttempts()

    guessButton.removeAttribute("disabled")
    playAgainButton.classList.add("d-none") // Hides the button

}

/**
 * Updates the attempts notice
 */
function updateAttempts() {
    descriptionParagraph.innerText = "Tentativi rimasti: " + (attempts + 1)
}


// Registering listeners
document
    .getElementById("guessButton")
    .addEventListener("click", handleClick)

document
    .getElementById("playAgainButton")
    .addEventListener("click", playAgain)