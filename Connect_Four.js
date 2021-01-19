/********************************************************************************************
 *                                                                                          *
 *      project: Connect Four in js                                                         *
 *      author: Štěpán Michálek                                                             *
 *      purpose: make a working Connect Four with Js                                        *
 *                                                                                          *
 * Features:                                                                                *
 * - A Connect Four game made for 2 players.                                                *
 * - You can win by getting four in a row, collumn or a diagonal.                           *
 * - If all fields are filled, It's a tie.                                                  *
 * - The state of the game is displayed in the text at the top.                             *
 * - The input is handled with event listeners in the table and the text at the top.        *
 *                                                                                          *
 ********************************************************************************************/

// *
// * VARIABLES:
// *
var gameTable = document.getElementById("gameField");
var gameTitle = document.getElementById("Title")

var gameField = [];
var currentPlayer = "red"
var gameState = -1 //   -1 = in progress;   0 = tie;   1 = ended game;   

var redFieldHTML = '<img src="Img/red.png">'
var blueFieldHTML = '<img src="Img/blue.png">'
var emptyFieldHTML = '<img src="Img/none.png">'


// *
// * INITIALIZATION:
// *
var count = 1;
for (let i = 0; i < 7; i++) {
    let sloupec = document.createElement("tr");
    for (let j = 0; j < 6; j++) {
        let radek = document.createElement("td");
        let text = document.createTextNode(count);
        radek.id = String(count)
        radek.appendChild(text);
        sloupec.appendChild(radek);
        count++;
    }
    gameTable.appendChild(sloupec);
}

count = 1
for (let i = 0; i < 7; i++) {
    let sloupec = []
    for (let j = 0; j < 6; j++) {
        sloupec[j] = (document.getElementById(count))
        count++;
    }
    gameField[i] = sloupec;
}

for (let i = 0; i < 42; i++) {
    gameField[i] = document.getElementById(i+1);
    gameField[i].color = "none"
    gameField[i].innerHTML = '<img src="Img/none.png">'
}


// *
// * FUNCTIONS:
// *
function dropChecker(line) {
    if (gameState === -1) {
        if (findEmptyField(gameField,line) !== "NOFIELD"){
            setField(findEmptyField(gameField,line),currentPlayer);
            currentPlayer = switchPlayer(currentPlayer);
            gameTitle.textContent = "gamestate is " + checkGameState(gameField)
            gameState = checkGameState(gameField)
            if (gameState === -1) {
                gameTitle.textContent = "Game in progress"
            } else if (gameState === 0) {
                gameTitle.textContent = "It's a tie. Click me to restart"
            } else{
                currentPlayer = switchPlayer(currentPlayer)
                gameTitle.textContent = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + " has won! Click me to restart"
            }
        }
        else{
            alert("Please select an empty line!")
        }
    } else {
        alert("The game has ended, Please restart the game")
    }
}

function switchPlayer(currentPlayer) {
    if (currentPlayer === "red") {
        return "blue";
    }else if (currentPlayer === "blue") {
        return "red";
    }else{
        console.log("error, the currentPlayer was neither 'red' nor 'blue'")
    }
}

function restartGame(){
    resetGameField(gameField);
    currentPlayer = "red";
    gameState = -1;
    gameTitle.textContent = "Welcome to the game. Click below to play.";
}

function resetGameField(gameField){
    for (let i = 0; i < 42; i++) {
        setField(gameField[i],"none");
    }
}

function checkGameState(gameField){
    // return:   -1 = in progress;   0 = tie;   1 = ended game;
    if (lineBust(gameField)===true || collumBust(gameField)===true || diagonalBust(gameField)===true) {
        return 1
    }
    for (let i = 0; i < 42; i++) {
        if (gameField[i].color === "none") {
            return -1
        }
    }
    return 0
}

function findEmptyField(gameField,line) {
    switch (line) {
        case 1:
            for (let i = 5; 0 <= i; i--) {
                if (gameField[i].color === "none") {
                    return gameField[i]
                }   
            }
            break;
        case 2:
            for (let i = 11; 5 < i; i--) {
                if (gameField[i].color === "none") {
                    return gameField[i]
                }
            }
            break;
        case 3:
            for (let i = 17; 11 < i; i--) {
                if (gameField[i].color === "none") {
                    return gameField[i]
                }
            }
            break;
        case 4:
            for (let i = 23; 17 < i; i--) {
                if (gameField[i].color === "none") {
                    return gameField[i]
                }
            }
            break;
        case 5:
            for (let i = 29; 23 < i; i--) {
                if (gameField[i].color === "none") {
                    return gameField[i]
                }
            }
            break;
        case 6:
            for (let i = 35; 29 < i; i--) {
                if (gameField[i].color === "none") {
                    return gameField[i]
                }
            }
            break;
        case 7:
            for (let i = 41; 35 < i; i--) {
                if (gameField[i].color === "none") {
                    return gameField[i]
                }
            }
        }
    return "NOFIELD"
}

function setField(field,color){
    if (color === "red"){
        field.innerHTML = redFieldHTML
        field.color = "red"
        return
    }
    if (color === "blue") {
        field.innerHTML = blueFieldHTML
        field.color = "blue"
        return
    }
    if (color === "none") {
        field.innerHTML = emptyFieldHTML
        field.color = "none"
        return
    }
    console.log("error, input a correct color")
}

function lineBust(gameField) {
    for (let i = 0; i < 24; i++) {
        if (gameField[i].color === gameField[i+6].color && gameField[i+6].color === gameField[i+12].color && gameField[i+12].color === gameField[i+18].color && gameField[i].color !== "none") {
            return true
        }
    }
    return false
}

function collumBust(gameField) {
    let list = [0,1,2,6,7,8,12,13,14,18,19,20,24,25,26,30,31,32,36,37,38]
    for (let num in list) {
        i = list[num]
        if (gameField[i].color === gameField[i+1].color && gameField[i+1].color === gameField[i+2].color && gameField[i+2].color === gameField[i+3].color && gameField[i].color !== "none") {
            return true
        }
    }
    return false
}

function diagonalBust(gameField) {
    let list = [3,4,5,9,10,11,15,16,17,21,22,23]
    for (num in list) {
        i = list[num];
        if(gameField[i].color === gameField[i+5].color && gameField[i+5].color === gameField[i+10].color && gameField[i+10].color === gameField[i+15].color && gameField[i].color !== "none"){
            return true
        }
    }
    list = [21,22,23,27,28,29,33,34,35,39,40,41]
    for (num in list) {
        i = list[num];
        if(gameField[i].color === gameField[i-7].color && gameField[i-7].color === gameField[i-14].color && gameField[i-14].color === gameField[i-21].color && gameField[i].color !== "none"){
            return true
        }
    }
    return false
}


// *
// * EVENT LISTENERS:
// *
for (let i = 5; 0 <= i; i--) {
    gameField[i].addEventListener("click",function() {
        dropChecker(1)
    })
}

for (let i = 11; 5 < i; i--) {
    gameField[i].addEventListener("click",function() {
        dropChecker(2)
    })
}

for (let i = 17; 11 < i; i--) {
    gameField[i].addEventListener("click",function() {
        dropChecker(3)
    })
}

for (let i = 23; 17 < i; i--) {
    gameField[i].addEventListener("click",function() {
        dropChecker(4)
    })
}

for (let i = 29; 23 < i; i--) {
    gameField[i].addEventListener("click",function() {
        dropChecker(5)
    })
}

for (let i = 35; 29 < i; i--) {
    gameField[i].addEventListener("click",function() {
        dropChecker(6)
    })
}

for (let i = 41; 35 < i; i--) {
    gameField[i].addEventListener("click",function() {
        dropChecker(7)
    })
}

gameTitle.addEventListener("click",function() {
    if (gameState === 0 || gameState === 1) {
        restartGame()
    }
})
