request(1, 100, 5)

function request(min = 1, max = 100, attempts = 5) {

    let randomVal = getRandomInt(1, 100)

    console.log(randomVal)

    let selectedVal = null
    let inputVal = null
    let won = false

    for (i = 0; i < attempts; i++) {

        alert("Preparati, tentativo n*" + (i + 1))
        
        do {

            inputVal = prompt("Inserisci il valore compreso tra " + min + " e " + max + ":")
            selectedVal = isNaN(inputVal) ? null : parseInt(inputVal)

        } while (selectedVal === null)
        
        if (selectedVal === randomVal) {
            alert("Bravo, hai vinto!")
            won = true
            break;
        }

        alert(processHints(randomVal, selectedVal))

    }

    if (!won) {
        alert("Limite tentativi raggiunto, hai perso!")
    }
}



function getRandomInt(min = 1, max = 10) {

    let r = Math.random();

    return Math.floor(Math.random() * max) + min; 
}


function processHints(goal, selectedVal) {
    return selectedVal < goal ? "Troppo piccolo" : "Troppo Grande"
}