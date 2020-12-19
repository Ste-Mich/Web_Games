/********************************************************************************************
 *                                                                                          *
 *      project: Tic Tac Toe in web                                                         *
 *      author: Štěpán Michálek                                                             *
 *      purpose: make a working Tic Tac Toe using: html, css, bootstrap and js              *
 *                                                                                          *
 ********************************************************************************************/


//Initialize all the variables
var fieldOne = document.querySelector("#one");
var fieldTwo = document.querySelector("#two");
var fieldThree = document.querySelector("#three");
var fieldFour = document.querySelector("#four");
var fieldFive = document.querySelector("#five");
var fieldSix = document.querySelector("#six");
var fieldSeven = document.querySelector("#seven");
var fieldEight = document.querySelector("#eight");
var fieldNine = document.querySelector("#nine");

var progressBar = document.querySelector("#progressBar");
var restartButton = document.querySelector("#resbtn");

var scoreO = document.querySelector("#scoreO");
var scoreX = document.querySelector("#scoreX");

var scoreOCounter = 0;
var scoreXCounter = 0;

var player = "O";
var gamesPlayed = 0;


var numericToGamefield = {}
var gameField = [
    0,
    fieldOne,
    fieldTwo,
    fieldThree,
    fieldFour,
    fieldFive,
    fieldSix,
    fieldSeven,
    fieldEight,
    fieldNine,
]
for (let i = 1; i <=9; i++) {
    gameField[i].style.color = "#a6a6a6";
    
}


// function to check the gamestate
function gameState (gameField){
    // returns: 0 for in progress, 1 for a win, 2 for a tie
    var result = 0;

    if (gameField[1].textContent!=="1" && gameField[2].textContent!=="2" && gameField[3].textContent!=="3" && gameField[4].textContent!=="4" && gameField[5].textContent!=="5" && gameField[6].textContent!=="6" && gameField[7].textContent!=="7" && gameField[8].textContent!=="8" && gameField[9].textContent!=="9") {
        result = 2;
    }

    if (gameField[1].textContent === gameField[2].textContent && gameField[2].textContent === gameField[3].textContent) {
        result = 1;
    }else if (gameField[4].textContent === gameField[5].textContent && gameField[5].textContent === gameField[6].textContent) {
        result = 1;
    }else if (gameField[7].textContent === gameField[8].textContent && gameField[8].textContent === gameField[9].textContent) {
        result = 1;
    }else if (gameField[1].textContent === gameField[4].textContent && gameField[4].textContent === gameField[7].textContent) {
        result = 1;
    }else if (gameField[2].textContent === gameField[5].textContent && gameField[5].textContent === gameField[8].textContent) {
        result = 1;
    }else if (gameField[3].textContent === gameField[6].textContent && gameField[6].textContent === gameField[9].textContent) {
        result = 1;
    }else if (gameField[1].textContent === gameField[5].textContent && gameField[5].textContent === gameField[9].textContent) {
        result = 1;
    }else if (gameField[7].textContent === gameField[5].textContent && gameField[5].textContent === gameField[3].textContent) {
        result = 1;
    }

    return result
}

function restartGame(){
    for (let i = 1; i <= 9; i++){
        gameField[i].textContent = i; 
        gameField[i].style.color = "#a6a6a6";
    }
    player = "O";

    switch (gamesPlayed) {
        case 0:
            progressBar.textContent = "Current state: A new game has started.";
            break;
        case 1:
            progressBar.textContent = "Current state: Yet another game has started.";
            break;
        case 2:
            progressBar.textContent = "Current state: YET another game has started.";
            break;
        case 3:
            progressBar.textContent = "Current state: AND ANOTHER game has started.";
            break;
        case 4:
            progressBar.textContent = "Current state: AND ANOTHER one.";
            break;
        case 5:
            progressBar.textContent = "Current state: AND ANOTHER ONE!";
            break;
        case 6:
            progressBar.textContent = "Current state: AND ANOTHER ONE!!!";
            break;
        case 7:
            progressBar.textContent = "Current state: ANOTHER ONE !?!?!";
            break;
        case 8:
            progressBar.textContent = "Current state: Seriously, how many games do you wanna play?";
            break;
        case 9:
            progressBar.textContent = "Current state: Don't you have work to do?";
            break;
        case 10:
            progressBar.textContent = "Current state: Or do you wanna break my project?";
            break;
        case 11:
            progressBar.textContent = "Current state: You know it costs money to reset the game everytime...";
            break;
        case 12:
            progressBar.textContent = "Current state: And you might even destroy the button.";
            break;
        case 13:
            progressBar.textContent = "Current state: Think about it's poor life, what has he ever done to you?";
            break;
        case 14:
            progressBar.textContent = "Current state: You're a monster...";
            break;
        case 15:
            progressBar.textContent = "Current state: I have no reason to talk to you anymore >:(";
            break;
        default:
            progressBar.textContent = "Current state: Game "+gamesPlayed+" started";
            break;
    }
    gamesPlayed++;
}

restartButton.addEventListener("click",function(){
    restartGame();
})

function checkField(x){
    if (gameState(gameField) === 0) {
            
        if (gameField[x].textContent==="O"||gameField[x].textContent==="X"){
            alert("You cannot do that, please pick an empty field.");
        }else{
            gameField[x].textContent = player;
            gameField[x].style.color = "black";
            player = player === "O" ? "X" : "O"; 
        }

        if (gameState(gameField) === 2) {
            alert("It's a tie.");
            progressBar.textContent = "Current state: The game was a tie.";
        }
        if (gameState(gameField) === 1) {
            alert("Player "+(player === "O" ? "X" : "O")+" has won");
            scoreOCounter += 1*(player!=="O"); 
            scoreXCounter += 1*(player!=="X");
            scoreO.textContent = scoreOCounter;
            scoreX.textContent = scoreXCounter;
            progressBar.textContent = "Current state: Player "+(player === "O" ? "X" : "O")+" has won."; 
        }
        if (gameState(gameField) === 0) {
            progressBar.textContent = "Current state: Game in progress."
        }
    }else{
        alert("The game has ended, please use the restart button.");
    }
}

// for loop to initialize all the event listeners
for (let i = 1; i <= 9; i++) {
    gameField[i].addEventListener("click",function(){
        checkField(i);
    })
}

function numericInput(event){
    //console.log(event.charCode);
    if (event.charCode > 48 && event.charCode < 58) {
        i = event.charCode - 48;
        checkField(i);
    }
    if (event.charCode === 114) {
        restartGame();
    }
}