var initialFieldModule = (function() {
    "use strict";
    
    var openedCardsArr = [];
    var additionalCardsArr = [];
    
    return {
        randomInteger: function(n) {
            var rand = Math.floor(Math.random() * n);
            
            return rand;
        },
        
        getOpenedCards: function() {
            
            return openedCardsArr;
        },
        
        generateCard: function(weightCard, suitN) {
            var newCard = new Card();
            newCard.setCardWeight(weightCard);
            newCard.setSuit(suitN);
            
            return newCard;
         },
         
        createCardsArr: function() {
            var NUMBER_OF_SUITS = 4;
            var NUMBER_OF_COST = 13;
            initialFieldModule.getOpenedCards().length = 0;
            for (var i = 1; i < NUMBER_OF_COST + 1; i ++) {
                for (var j = 1; j < NUMBER_OF_SUITS + 1; j++) {
                    openedCardsArr.push(initialFieldModule.generateCard(i, j));
                }
            }
        },
        
        createAdditionalCardsArr: function() {
            var NUMBER_ADDITIONAL_CARDS = 24;
            for (var i = 0; i < 24; i++) {
                additionalCardsArr[i] = initialFieldModule.chooseCard();
            }

            return additionalCardsArr;
        },
        
        getAdditionalCards: function() {
            
            return additionalCardsArr;
        },
        
        chooseCard: function() {
            var arr = initialFieldModule.getOpenedCards();
            var takeNumberCard = initialFieldModule.randomInteger(arr.length);
            var thisCard = arr[takeNumberCard];
            arr.splice(takeNumberCard, 1);

            return thisCard;
        },
            
        generateCloseCard: function(field) {
            var newCard = document.createElement("div");
            newCard.setAttribute("class", "close_image");
            var closeCard = document.createElement("span");
            closeCard.setAttribute("class", "close_span");
            newCard.appendChild(closeCard);
            field.appendChild(newCard);
            field = newCard;
            
            return field;
        },
        
        setColorText: function(color, text) {
             if (color === "red") {
                 text.setAttribute("class", "red_card");
             } else {
                 text.setAttribute("class", "black_card");
             }
        },
        
        generateIdOpenCard: function(field) {
            var card = initialFieldModule.chooseCard();
            initialFieldModule.generateOpenCard(field, card);
            
            return card;
        },
        
        generateOpenCard: function(field, thisCard) {
            var newCard = document.createElement("div");
            var newText = document.createElement("span");
            newCard.id = thisCard.getIdCard();
            newCard.setAttribute("class", "image");
            field.appendChild(newCard);
            newCard.setAttribute("draggable", "true");
            newCard.setAttribute("ondragstart", "drag(event)");
            newCard.setAttribute("data-n", thisCard.getCardWeight());
            newCard.setAttribute("data-s", thisCard.getSuit());
            newText.innerHTML = thisCard.getIdCard();
            initialFieldModule.setColorText(thisCard.getColor(), newText);
            newCard.appendChild(newText);
        },
        
        removeChildren: function(node) {
            var children = node.childNodes;
            while(children.length) {
                node.removeChild(children[0]);
            }
        },
        
        initiateBotField: function() {
            var NUMBER_BOT_DIV = 7;
            var NUMBER_CLOSE_DIV = 6;
            for (var j = NUMBER_BOT_DIV; j > 0; j--) {
                var currentField = document.getElementById("div" + (NUMBER_CLOSE_DIV + j));
                initialFieldModule.removeChildren(currentField);
                currentField.setAttribute("ondrop", "drop(event)");
                currentField.setAttribute("ondragover", "allowDrop(event)");
                for(var i = 0; i < j - 1; i++) {
                    currentField = initialFieldModule.generateCloseCard(currentField);
                }
                initialFieldModule.generateIdOpenCard(currentField);
            }
        },
        
        initiateTopField: function() {
            var NUMBER_TOP_DIV = 4;
            var ID_FIRST_DIV = 3;
            for (var j = 0; j < NUMBER_TOP_DIV; j++) {
                var currentField = document.getElementById("div" + (ID_FIRST_DIV + j));
                initialFieldModule.removeChildren(currentField);
                currentField.setAttribute("ondrop", "drop(event)");
                currentField.setAttribute("ondragover", "allowDrop(event)");
            }
        },
        
        restartGame: function() {
            initialFieldModule.createCardsArr();
            initialFieldModule.initiateBotField();
            initialFieldModule.initiateTopField();
            initialFieldModule.removeChildren(div1);
            initialFieldModule.removeChildren(div2);
            initialFieldModule.generateCloseCard(div1);
            gameModule.resetAdditionalCards();
            initialFieldModule.createAdditionalCardsArr();
            gameModule.resetCounter();
        }
    };
}());