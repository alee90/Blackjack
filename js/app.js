console.log('hello');

//declare early variables, playerHand/dealerHand which take array of suits and numbers!
var playerHand = new Array();
var dealerHand = new Array();
var playerScore;
var dealerScore;
var win = 0;
var loss = 0;
var draw = 0;
// 2d array - suits/#s
var deck = new Array();
// array of suits
var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
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

for (var i=0; i<suits.length; i++) 
{
  var suit = suits[i]; // grab suit from suit array
  deck[i] = new Array(); // 13 cards per suit
  for (var x=0; x<13; x++){ // Sorts the 13 cards of the suit into an array
    var cardName = cards[x].name;
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
    var playerArea = document.getElementById('playerArea');
    var dealerArea = document.getElementById('dealerArea');

    //dealer
    var card = getCard();
    console.log(card);
    dealerHand.push(card);
    dealerArea.innerHTML += "<img src='" + card.url + "'height='200' width='130'>";
    //dealer
    card = getCard();
    console.log(card);
    dealerHand.push(card);
    dealerArea.innerHTML += "<img src='" + card.url + "'height='200' width='130'>";

    //player
    card = getCard();
    console.log(card);
    playerHand.push(card);
    playerArea.innerHTML += "<img src='" + card.url + "'height='200' width='130'>";
    //player
    card = getCard();
    console.log(card);
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
    console.log(card);
    playerArea.innerHTML += "<img src='"+card.url+"'height='200' width='130'>";
}
//+1 card into dealer hand while condition is not met (house rules)
function dealerHit(){
    dealerScore = 0;
    var aces = 0;

    for(var i=0; i<dealerHand.length; i++){
        dealerScore = dealerScore + dealerHand[i].value;
        if(dealerHand[i]=='ace'){
            aces = aces + 1; //add one to ace counter
        }
    }

    while(dealerScore <= 17){  //draw until score > 17
        var dealerArea = document.getElementById('dealerArea');
        var card = getCard();
        dealerHand.push(card);
        console.log(card);
        dealerArea.innerHTML += "<img src='" + card.url + "'height='200' width='130'>";
        dealerScore = dealerScore + card.value;

        if(card.name == 'ace'){
            aces = aces + 1;
        }
        if (dealerScore > 21 && aces > 0){
            dealerScore = dealerScore - 10;
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
            playerScore = playerScore - 10;
        }
    }
}

//win conditions 
function winner(){
    var resultText = document.getElementById('resultText');
    if(dealerScore>21 && playerScore>21){
        loss++;
        resultText.innerHTML = 'You both bust!  Dealer: '+dealerScore+ ' || Player: '+playerScore;
        alert('You both bust!  Dealer: '+dealerScore+ ' || Player: '+playerScore);
    }
    else if(dealerScore === playerScore){
        draw++;
        alert("It's a draw! Dealer: " + dealerScore + ' || Player: ' + playerScore);
        resultText.innerHTML = "It's a draw! Dealer: " + dealerScore + ' || Player: ' + playerScore;
    }
    else if(playerScore>21 && dealerScore<= 21){
        loss++;
        resultText.innerHTML = 'You busted, The Dealer Wins. Dealer: ' + dealerScore + ' || Player: '+ playerScore;
        alert('You busted, The Dealer Wins. Dealer: ' + dealerScore + ' || Player: '+ playerScore);
    }
    else if(dealerScore>21 && playerScore<=21){
        win++;
        alert('Dealer busted. You Win! Dealer: ' + dealerScore + ' || Player: '+ playerScore);
        resultText.innerHTML = 'Dealer busted. You Win! Dealer: ' + dealerScore + ' || Player: '+ playerScore;
    }
    else if(dealerScore>playerScore && dealerScore<= 21){
        loss++;
        alert('Dealer Wins. Dealer: ' + dealerScore + ' || Player: ' + playerScore);
        resultText.innerHTML = 'Dealer Wins. Dealer: ' + dealerScore + ' || Player: ' + playerScore;
    }
    else if(playerScore>dealerScore && playerScore<= 21){
        win++;
        alert('You Win! Dealer: ' + dealerScore + ' || Player: ' + playerScore);
        resultText.innerHTML = 'You Win! Dealer: ' + dealerScore + ' || Player: ' + playerScore;
    } 
    else if (playerScore === 21 && dealerScore<21){
        alert('You won!');
        resultText.innerHTML = 'You Win! Dealer: ' + dealerScore + ' || Player: ' + playerScore;
    }
    else if (playerScore < 21 && dealerScore === 21){
        alert('You lose!')
        resultText.innerHTML = 'You lose! Dealer: ' + dealerScore + ' || Player: ' + playerScore
    }
    else {
        alert("no!");
    }

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

// console.log(win);
// console.log(loss);
// console.log(draw);