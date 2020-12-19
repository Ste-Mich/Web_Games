/********************************************************************************************
 *                                                                                          *
 *      project: Blackjack in js                                                            *
 *      author: Štěpán Michálek                                                             *
 *      purpose: make a working Blackjack using: html, css, bootstrap and js                *
 *                                                                                          *
 * Features:                                                                                *
 * - Game of Blackjack, dealer hits until reaching 17                                       *
 * - Card, Deck, Hand classes                                                               *
 * - A random deck shuffled, everytime                                                      *
 * - double down, split, switch hands, surrender, hit/stay                                  *
 *                                                                                          *
 ********************************************************************************************/

var nonbustP = document.querySelector("#nonbustP");

//
// Global variables:
//
var template = `
            <td>
                <img src="Backs\\blue_back.png">
            </td> `;

var template1 = `<td>
<img src="Cards\\`;
var template2 = `.png">
</td>`;

var allNames = ["Ace","2","3","4","5","6","7","8","9","10","Jack","Queen","King"];
var allSuits = ["Hearts","Spades","Clubs","Diamonds"];
var values = {"Ace":11,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"Jack":10,"Queen":10,"King":10};
gameOn = true;

//
// Classes:
//
class Card{
    constructor(name, suit){
        this.name = name;
        this.suit = suit;
        
        this.value = values[name];
        this.fullName = name + " of " + suit;
        this.initials = name[0]+suit[0];
    }
    
    print(){
        return this.fullName;
    }
}

class Deck{
    constructor() {
        this.deck = [];
        
        for (let i = 0; i < allSuits.length; i++)
        for (let j = 0; j < allNames.length; j++) {
            this.deck.push(new Card(allNames[j],allSuits[i]));
        }
    }
    
    print(){
        for (let i = 0; i < this.deck.length; i++)
        console.log(this.deck[i].print());
    }
    
    shuffle(){
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
    }

    draw(){
        return this.deck.pop();
    }
}

class Hand{
    constructor(rowID,isDealer) {
        this.row = document.querySelector(rowID);
        this.isDealer = isDealer;

        this.totalValue = 0;
        this.aces = 0;
        this.highestNonBustValue = 0;
        this.cards = [];
    }
    
    hit(card){
        this.cards.push(card);
        this.updateValues();
        this.updateDisplay();
    }
    
    isBust(){
        let result = false;
        if (this.highestNonBustValue>21)
            result = true;
        return result;
    }

    updateValues(){
        this.totalValue = 0;
        this.aces = 0;
        for (let i = 0; i < this.cards.length; i++) {
            this.totalValue += this.cards[i].value;
            if (this.cards[i].name === "Ace")
                this.aces += 1;
        }
        this.highestNonBustValue = this.totalValue;
        let aceCount = this.aces;
        while(this.highestNonBustValue>21){
            if (aceCount>0){
                this.highestNonBustValue -= 10;
                aceCount -= 1;
            }
            if (aceCount === 0) {
                break;
            }
        }
    }
    
    updateDisplay(){
        this.row.innerHTML = ``;
        let initials;
        for (let i=0;i<this.cards.length; i++){
            initials = this.cards[i].initials
            if (i === 1 && this.isDealer === true)
                initials = "blue_back";
            this.row.innerHTML += (template1 + initials + template2);
        }
    }
    
    /*updateDealerDisplay(){
        this.row.innerHTML = ``;
        let initials;
        for (let i=0;i<this.cards.length; i++){
            initials = this.cards[i].initials
            if (i===1)
                initials = "blue_back";
            this.row.innerHTML += (template1 + initials + template2);
        }
    }*/
}

//
// Functions:
//
function gameInitializeHands(gameDeck){
    dealerHand = new Hand("#dealerRow",true);
    dealerHand.hit(gameDeck.draw());
    dealerHand.hit(gameDeck.draw());
    while(dealerHand.highestNonBustValue<17){
        dealerHand.hit(gameDeck.draw());
    }
    dealerHand.updateDisplay();
    
    playerHand = new Hand("#playerRow",false);
    playerHand.hit(gameDeck.draw());
    playerHand.hit(gameDeck.draw());
    playerHand.updateDisplay();
}

function gameRestart(){
    gameOn = true;
    //alert("restart func")
    gameDeck = new Deck();
    gameDeck.shuffle();
    
    gameInitializeHands(gameDeck);
    
    nonbustP.textContent = playerHand.highestNonBustValue;
}

function gameHit(){
    if (gameOn === true) {
        if (playerHand.cards.length < 8) {
            playerHand.hit(gameDeck.draw());        
        }else{
            alert("Your hand is too weak to hold more cards! :(");
        }
        
        nonbustP.textContent = playerHand.highestNonBustValue;
    } else {
        alert("The game has ended. Press the restart button to start a new game.");
    }
}

function gameStay(){
    if (gameOn === true) {
        
        dealerHand.isDealer = false;
        dealerHand.updateDisplay();
        
        if (playerHand.highestNonBustValue > 21 && dealerHand.highestNonBustValue > 21) {
            alert("Both the dealer and player have busted. Its a tie!");
        }else{
            if (playerHand.highestNonBustValue > 21) {
                alert("Its a bust. You lost!");
            }
            else if (dealerHand.highestNonBustValue > 21) {
                alert("Dealer has busted. You won!");
            }else{
                if (playerHand.highestNonBustValue < dealerHand.highestNonBustValue) {
                    alert("You lost!");
                }
                if (playerHand.highestNonBustValue > dealerHand.highestNonBustValue) {
                    alert("You won!");
                }
            }
        }
        gameOn = false;
    }else{
        alert("The game has ended. Press the restart button to start a new game.");
    }
}
    
/*function gameDoubleDown(){
    alert("double down func");
}

function gameSplit(){
    alert("split func");
}

function gameSwitch(){
    alert("switch func");
}*/

function gameSurrender(){
    if (gameOn === true) {
        gameOn = false;

        dealerHand.isDealer = false;
        dealerHand.updateDisplay();

        alert("You have lost.");
    } else{
        alert("You cannot surrender. You have already lost.");
    }
}


//
// Event listeners:
//
document.querySelector("#resbtn").addEventListener("click",function(){
    gameRestart()
});
document.querySelector("#hitbtn").addEventListener("click",function(){
    gameHit();
});
document.querySelector("#staybtn").addEventListener("click",function(){
    gameStay();
});
/*document.querySelector("#ddbtn").addEventListener("click",function(){
    gameDoubleDown();
});
document.querySelector("#splitbtn").addEventListener("click",function(){
    gameSplit();
});
document.querySelector("#switchbtn").addEventListener("click",function(){
    gameSwitch();
});*/
document.querySelector("#surbtn").addEventListener("click",function(){
    gameSurrender();
});

function keyboardInput(event){
    //console.log(event.charCode);
    
    if (event.charCode === 82 || event.charCode === 114) {
        gameRestart();
    }
    if (event.charCode === 72 || event.charCode === 104) {
        gameHit();
    }
    if (event.charCode === 83 || event.charCode === 115) {
        gameStay();
    }
    /*if (event.charCode === 68 || event.charCode === 100) {
        gameDoubleDown();
    }
    if (event.charCode === 80 || event.charCode === 112) {
        gameSplit();
    }
    if (event.charCode === 87 || event.charCode === 119) {
        gameSwitch();
    }*/
    if (event.charCode === 85 || event.charCode === 117) {
        gameSurrender();
    }
};


//initialize the game at page startup
gameRestart();