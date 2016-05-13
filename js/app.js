console.log('hello');

//declare early variables, playerHand/dealerHand which take array of suits and numbers!
var playerHand = new Array();
var dealerHand = new Array();
var playerScore;
var dealerScore;

var player = { //thanks greg
    name: 'player',
    bank: 200,
    currentBet: 0,
    lose: loseMoney = function(lose){
        var bankroll = parseInt(player.bank);
        player.bank = bankroll - lose;
        return player.bank;
        },
    gain: gainMoney = function(gain){
        var bankroll = parseInt(player.bank);
        player.bank = bankroll + gain;
        return player.bank;
        },
    }

function takeBet(){
    var x = prompt('How much are you wagering? You have: $'+player.bank,'0');
    var bet = parseInt(x);
    player.currentBet = bet;
}

function boardSet(){
    var dealerText = document.getElementById('dealerText');
    var playerText = document.getElementById('playerText');
    var blackJackText = document.getElementById('header');
    var bankerText = document.getElementById('banker');

    dealerText.innerHTML = 'Dealer Area';
    playerText.innerHTML = 'Player Area'
    blackJackText.innerHTML = '';
    bankerText.innerHTML = 'Current Bankroll is:' + '<br />' + '$' + player.bank;
}

// 2d array - suits/#s
var deck = new Array();
// array of suits
var suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
//object inside array for cards
var cards = [
  { name: 'ace', value: 11 },
  { name: '2', value: 2 },
  { name: '3', value: 3 },
  { name: '4', value: 4 },
  { name: '5', value: 5 },
  { name: '6', value: 6 },
  { name: '7', value: 7 },
  { name: '8', value: 8 },
  { name: '9', value: 9 },
  { name: '10', value: 10 },
  { name: 'jack', value: 10 },
  { name: 'queen', value: 10 },
  { name: 'king', value: 10 }
];

for (var i=0; i<suits.length; i++) {
    var suit = suits[i]; // grab suit from suit array
    deck[i] = new Array(); // 13 cards per suit
    for (var x=0; x<13; x++){ // Sorts the 13 cards of the suit into an array
        var cardName = cards[x].name; //assign name
        deck[i][x] = {
        // set URL of img + assign dealt = false because card has not been dealt yet
            url: 'images/'+suit+'/'+cardName+'_of_'+suit+'.png', 
            dealt: false,
            suit: suit,
            name: cards[x].name,
            value: cards[x].value
        };
    }
}

//deal cards and append them onto html divs
var deal = function(){
    boardSet();

    document.getElementById('hit').disabled = false;
    var playerArea = document.getElementById('playerArea');
    var dealerArea = document.getElementById('dealerArea');

    //dealer hidden card
    dealerArea.innerHTML += "<img src='images/cardbg.png' height='200' width='130' id='hidden'>";
    //dealer
    card = getCard();
    dealerHand.push(card);
    dealerArea.innerHTML += "<img src='" + card.url + "'height='200' width='130'>";

    //player
    card = getCard();
    playerHand.push(card);
    playerArea.innerHTML += "<img src='" + card.url + "'height='200' width='130'>";
    //player
    card = getCard();
    playerHand.push(card);
    playerArea.innerHTML += "<img src='" + card.url + "'height='200' width='130'>";
}

//deal rando cardz
var getCard = function(){
    var rSuit = Math.floor(Math.random()*4); //random 0-3 in array for suit
    var rNum = Math.floor(Math.random()*13); //random 0-12 in array for card value

    while(deck[rSuit][rNum].dealt){
        rSuit = Math.floor((Math.random()*4)); //if card above was dealt, get a new one card
        rNum = Math.floor((Math.random()*13));
        }

    deck[rSuit][rNum].dealt = true; //change dealt value to true
    return(deck[rSuit][rNum]); 
}

//+1 card into hand
function hitMe(){
    var playerArea = document.getElementById('playerArea');
    var card = getCard();
    playerHand.push(card);
    playerArea.innerHTML += "<img src='"+card.url+"'height='200' width='130'>";

    if(playerScore >= 21){
        document.getElementById('hit').disabled = true;
    }
}
//+1 card into dealer hand while condition is not met (house rules)
function dealerHit(){
    document.getElementById('hit').disabled = false;
    document.getElementById('deal').disabled = false; //re-enable play button after round
   
    var hiddenCard = getCard(); //reveal hidden card
    document.getElementById('hidden').src = hiddenCard.url;
    dealerHand.push(hiddenCard);

    dealerScore = 0;
    var aces = 0;

    for(var i=0; i<dealerHand.length; i++){
        dealerScore = dealerScore + dealerHand[i].value;
        if(dealerHand[i].name==='ace'){
            aces++; //add one to ace counter
        }
    }

    while(dealerScore < 17){  //draw until score > 17
        var dealerArea = document.getElementById('dealerArea');
        var card = getCard();
        dealerHand.push(card);
        dealerArea.innerHTML += "<img src='" + card.url + "'height='200' width='130'>";
        dealerScore = dealerScore + card.value;

        if(card.name === 'ace'){ //ace conditions
            aces = aces + 1;
        }
        if (dealerScore > 21 && aces > 0){
            dealerScore = dealerScore - 10; //score - 10 if ace>0, score > 21
            aces = aces - 1;
        }
    } 
}

function playScore(){
    playerScore = 0;
    for(var i=0; i<playerHand.length; i++){ //adding up the score
        playerScore = playerScore + playerHand[i].value;
    }

    for(var i=0; i<playerHand.length; i++){
        if(playerHand[i].name == 'ace' && playerScore > 21){ //adjusting for aces
            playerScore -= 10;
        }
    }
}

//win conditions 
function winner(){
    var dealerText = document.getElementById('banker');
    var resultText = document.getElementById('resultText');
    if(dealerScore>21 && playerScore>21){
        resultText.innerHTML = 'You both bust!  Dealer: '+dealerScore+ ' || Player: '+playerScore;
        var lose = parseInt(player.currentBet);
        loseMoney(lose);
        alert('You have lost: $'+lose);
    }
    else if(dealerScore === playerScore){
        resultText.innerHTML = "It's a draw!" + '<br />' + 'Dealer: ' + dealerScore + ' || Player: ' + playerScore;
        alert('Draw!')
    }
    else if(playerScore>21 && dealerScore<= 21){
        resultText.innerHTML = 'You busted' + '<br />' + ' The Dealer Wins. Dealer: ' + dealerScore + ' || Player: '+ playerScore;
        var lose = parseInt(player.currentBet);
        loseMoney(lose);
        alert('You have lost: $'+lose);
    }
    else if(dealerScore>21 && playerScore<=21){
        resultText.innerHTML = 'Dealer busted' + '<br />' + ' You Win! Dealer: ' + dealerScore + ' || Player: '+ playerScore;
        var gain = parseInt(player.currentBet);
            gainMoney(gain);
            alert('You have won: $'+gain);
    }
    else if(dealerScore>playerScore && dealerScore<= 21){
        resultText.innerHTML = 'Dealer Wins' + '<br />' + ' Dealer: ' + dealerScore + ' || Player: ' + playerScore;
        var lose = parseInt(player.currentBet);
            loseMoney(lose);
            alert('You have lost: $'+lose);
    }
    else if(playerScore>dealerScore && playerScore<= 21){
        resultText.innerHTML = 'You Win' + '<br />' + ' Dealer: ' + dealerScore + ' || Player: ' + playerScore;
        var gain = parseInt(player.currentBet);
            gainMoney(gain);
            alert('You have won: $'+gain);
    } 
    else if (playerScore === 21 && dealerScore<21){
        resultText.innerHTML = 'You Win!' + '<br />' + 'Dealer: ' + dealerScore + ' || Player: ' + playerScore;
        var gain = parseInt(player.currentBet);
            gainMoney(gain);
            alert('You have won: $'+gain);
    }
    else if (playerScore < 21 && dealerScore === 21){
        resultText.innerHTML = 'You lose!' + '<br />' + 'Dealer: ' + dealerScore + ' || Player: ' + playerScore;
        var lose = parseInt(player.currentBet);
            loseMoney(lose);
            alert('You have lost: $'+lose);
    }
    else {
        alert('give ano!');
    }
    return player.bank;
}

function disablePlayButton(){
    document.getElementById('deal').disabled = true;
}

function reset(){ 
    document.getElementById('playerArea').innerHTML=''; //clear playerArea
    document.getElementById('dealerArea').innerHTML=''; //clear dealerArea
    document.getElementById('resultText').innerHTML=''; //clear resultText

    playerHand = new Array(); //clear out each hand
    dealerHand = new Array();

    playerScore = 0; //reset the score counter
    dealerScore = 0;
    for (var i=0; i<4; i++){  //shuffle the deck
        for (var j=0; j<13; j++)  
        {
            deck[i][j].dealt = false;
        }
    }
}