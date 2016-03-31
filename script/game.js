var gameModule = (function() {
    "use strict";
    
    var additionalCards = initialFieldModule.getAdditionalCards();
    var SUPPORTING_CARD = 24;
    var transferCard = 0;
    var cardCounter = 0;
    var clickAdditionalCards = 0;
    var removedCardArr = [];
    var positionArr = [];
    var newOpenCard, removeCard, lowerCard, flagQueue;

    function setNewOpenCard(card) {
        newOpenCard = card;
    }
    
    function setTransferCard() {
        transferCard = transferCard + removedCardArr.length;
        positionArr.length = 0;
        removedCardArr.length = 0;
    }
    
    function removeTransferCard() {
        positionArr.sort(gameModule.compareNumeric);
        for (var i = 0; i < positionArr.length; i++) {
            additionalCards.splice(positionArr[i], 1);
        }
    }
    
    function restartFields(field1, field2) {
        initialFieldModule.removeChildren(field1);
        initialFieldModule.generateCloseCard(field2);
    }
    
    function resetTopField(){
        initialFieldModule.removeChildren(div1);
        restartFields(div2, div1);
        gameModule.resetCounter();
        removeTransferCard();
        setTransferCard();
    }
    
    function rulesOnBot(takingField) {
        var KING = "13";
        var permissionToMove;
        var weightUpperCard = removeCard.dataset.n;
        var weightLowerCard = takingField.dataset.n;
        if (((weightUpperCard === KING) && (takingField.className === "bordersBot"))
        || (((removeCard.firstChild.className !== takingField.firstChild.className)
        && ((weightLowerCard - weightUpperCard) === 1)))){
            permissionToMove = true;
        } else {
            permissionToMove = false;
        }

        return permissionToMove;
    }
    
    function rulesOnTop(takingField) {
        var ACE = "1";
        var permissionToMove;
        var weightUpperCard = removeCard.dataset.n;
        var weightLowerCard = takingField.dataset.n;
        if (((weightUpperCard === ACE) && (takingField.className === "bordersFinalPack"))
            || (((weightUpperCard - weightLowerCard) === 1)
            && (removeCard.dataset.s === takingField.dataset.s))) {
            replacementCard(takingField);
            permissionToMove = true;
        } else {
            permissionToMove = false;
        }

        return permissionToMove;
    }
    
    function replacementCard(takingField) {
        var CARDS = 54;
        var ACE = "1";
        var nodeParent = takingField.parentNode;
        gameModule.setCardsCounter();
        if (cardCounter === CARDS) {
            win.innerHTML = "YOU WIN";
        }
        
        if (removeCard.dataset.n === ACE) {
            takingField.appendChild(removeCard);
        } else {
            var n = +takingField.dataset.n + 1;
            var s = +takingField.dataset.s;
            var card = initialFieldModule.generateCard(n, s);
            nodeParent.removeChild(takingField);
            initialFieldModule.generateOpenCard(nodeParent, card);
            nodeParent.appendChild(removeCard);
        }
        
    }
    
    function checkTransferCard(step){
        if (step !== 0) {
            for (var i = 0; i < removedCardArr.length; i++) {
                if (removedCardArr[i] === additionalCards[step - 1]) {
                    checkTransferCard(step - 1);
                    break;
                } else if (lowerCard !== additionalCards[step - 1]) {
                    lowerCard = additionalCards[step - 1];
                    flagQueue = step - 1;
                } 
            }
            initialFieldModule.removeChildren(div2);
            initialFieldModule.generateOpenCard(div2, lowerCard);
        } else if (div2.firstChild === null) {
            div2.removeChild(div2.firstChild);
        }
    }
    
    return {
        compareNumeric: function (a, b) {
            if (a < b) {
                
                return 1;
            }
            
            if (a > b) {
                
                return -1;
            }
        },
        
        rememberCard: function(card) {
            gameModule.rememberParent(card);
            removeCard = card;
            
            return card;
        },
        
        resetAdditionalCards: function() {
            additionalCards.length = 0;
            transferCard = 0;
        },
        
        rememberParent: function(card)
        {
            if (card.parentNode !== undefined) {
                newOpenCard = card.parentNode;
            }
        }, 
        
        getAdditionalCards: function() {
            
            return additionalCards;
        },
        
        rememberTransferCard: function(card, position) {
            removedCardArr.push(card);
            positionArr.push(position);
        },
        
        openDownCard: function() {
            if (newOpenCard.className === "close_image") {
                var nodeParent = newOpenCard.parentNode;
                initialFieldModule.generateIdOpenCard(nodeParent);
                nodeParent.removeChild(newOpenCard);
            }
             
            if (newOpenCard.className === "borders") {
                additionalCards.forEach(function(item, i, additionalCards) {
                    if (removeCard.id === item.getIdCard()) {
                        var step = gameModule.getCounter() - 1;
                        if (flagQueue === step) {
                            gameModule.rememberTransferCard(item, step);
                        } else {
                            gameModule.rememberTransferCard(item, flagQueue);
                        }
                        checkTransferCard(step);
                    }
                });
            }
            
            if (newOpenCard.className === "bordersFinalPack") {
                var ACE = "1";
                gameModule.getCardsCounter();
                if (removeCard.dataset.n !== ACE) {
                    var n = +removeCard.dataset.n - 1;
                    var s = +removeCard.dataset.s;
                    var card = initialFieldModule.generateCard(n, s);
                    initialFieldModule.generateOpenCard(newOpenCard, card);
                }
            }
        },
        
        makeCounter: function() {
            clickAdditionalCards++;
        },
        
        getCounter: function() {
            
            return clickAdditionalCards;
        },
        
        resetCounter: function() {
            clickAdditionalCards = 0;
        },
        
        pressureAdditionalCards: function() {
            var leftAddCards = SUPPORTING_CARD - transferCard;
            var pressure = gameModule.getCounter();
            var currentAddCard;
            flagQueue = pressure - 1;
            if(leftAddCards === 0) {
                initialFieldModule.removeChildren(div1);
                
                return;
            }
            if (pressure === (leftAddCards + 1)) {
                resetTopField();
            } else if (pressure === leftAddCards) {
                initialFieldModule.removeChildren(div1);
                currentAddCard = additionalCards[pressure - 1];
                initialFieldModule.removeChildren(div2)
                initialFieldModule.generateOpenCard(div2, currentAddCard);
            } else {
                currentAddCard = additionalCards[pressure - 1];
                initialFieldModule.removeChildren(div2);
                initialFieldModule.generateOpenCard(div2, currentAddCard);
            }

            return currentAddCard;
        },
         
        receivingField: function(card, field) {
            var rules;
            if (field.className === "bordersBot") {
                rules = rulesOnBot(card);
            } else if (field.className === "bordersFinalPack") {
                rules = rulesOnTop(card);
            }

            return rules;
        },
        
        setCardsCounter: function() {
            cardCounter++;
        },
        
        getCardsCounter: function() {
            cardCounter--;
        }
    };

}());