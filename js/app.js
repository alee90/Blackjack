console.log('hello');

//declare early variables, playerHand/dealerHand which take array of suits and numbers!
var playerHand = new Array();
var dealerHand = new Array();
var playerScore;
var dealerScore;
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
  for (var j=0; j<13; j++){ // Sorts the 13 cards of the suit into an array
    var cardName = cards[j].name;
    deck[i][j] = {
    // set URL of img + assign dealt = false because card has not been dealt yet
      url: 'images/'+suit+'/'+cardName+'_of_'+suit+'.png', 
      dealt: false,
      suit: suit,
      name: cards[j].name,
      value: cards[j].value
    };
  }
}

var deal = function(){
    var playerArea = document.getElementById('playerArea');
    var dealerArea = document.getElementById('dealerArea');

    //dealer
    var card = getCard();
    console.log(card);
    dealerHand.push(card);
    dealerArea.innerHTML += "<img src='" + card.url + "'height='200' width='130'>";

    card = getCard();
    console.log(card);
    dealerHand.push(card);
    dealerArea.innerHTML += "<img src='" + card.url + "'height='200' width='130'>";

    //player
    card = getCard();
    console.log(card);
    playerHand.push(card);
    playerArea.innerHTML += "<img src='" + card.url + "'height='200' width='130'>";

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
    playerArea.innerHTML += "<img src='" + card.url + "'height='200' width='130'>";
}
//+1 card into dealer hand while condition is not met (house rules)
function dealerHit(){
    var card = getCard();
    dealerHand.push(card);
    dealerScore = 0;
    var aces = 0;

    for(var i=0; i<dealerHand.length; i++){
        dealerScore = dealerScore + dealerHand[i].value;
        if(dealerHand[i]=='ace'){
            aces = aces + 1; //add one to ace counter
        }
    }

    while(dealerScore < 17){

    }

}







