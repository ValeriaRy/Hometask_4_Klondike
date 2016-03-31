function Card() {
    "use strict";
    
    var SPADES = 1;
    var HEARTS = 2;
    var DIAMONDS = 3;
    var CLUBS = 4;
    var cardWeight, suit;
    
    this.setCardWeight = function(n) {
        cardWeight = n;
    };
    
    this.setSuit = function(s) {
        suit = s;
    };
    
    this.getCardWeight = function() {
        
        return cardWeight;
    };
    
    this.getSuit = function() {
        
        return suit;
    };
    
    this.getIdCard = function() {
        
        return replaseNumber(cardWeight) + replaseSuit(suit);
    };
    
    function replaseNumber(n) {
        if (n === 1) {
            
            return "A";
        }
        
        if (n === 11) {
            
            return "J";
        }
        
        if (n === 12) {
            
            return "Q";
        }
        
        if (n === 13) {
            
            return "K";
        } 
        
        return n;
    }
    
    function replaseSuit(s) {
        if (s === SPADES) {
            
            return "♠";
        }
        
        if (s === HEARTS) {
            
            return "♥";
        }
        
        if (s === DIAMONDS) {
            
            return "♦";
        }
        
        if (s === CLUBS) {
            
            return "♣";
        }
        
        return s;
    }
    
    function setColor() {
        if ((suit === HEARTS) || (suit === DIAMONDS)) {
            
            return "red";
        } else {
            
            return "black";
        }
    }
    
    this.getColor = function() {
        
        return setColor();
    };
}