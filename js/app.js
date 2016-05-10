var Card = function(suit, number){
    // this.getSuit = function(){
    //     return suit;
    // }

    this.getNumber = function(){
        return number;
    }
    // return specific value for face cards/aces
    this.getValue = function(){ 
        var numVal = number;
        if (number === 1){
            numVal = 11 
        } else if (number >= 10){
            numVal = 10
        } else {
            return numVal;
        }
    }
    // return specific name for face cards/aces
    this.getName = function(){
        var cardName = '';
        switch(number){
            case 1:
                cardName = 'A';
                break;
            case 11:
                cardName = 'J';
                break;
            case 12: 
                cardName = 'Q';
                break;
            case 13:
                cardName = 'K';
                break;
            default:
                cardName = number;
                break;
        }
    }

}


var Deck = function (){
    var cards = [];
    var newCards = function (){
        var suit,
        var number;
        for (var i=0; i<52; i++){
            suit = Math.floor(Math.random()*4 + 1)
            number = Math.floor(Math.random()*13 + 1)
            cards.push(new Card(suit,number));
        }
    };
    newcards();

    this.getCards = function(){
        return cards;
    }