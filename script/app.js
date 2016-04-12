"use strict";

(function() {
    button.addEventListener("click", newGame);
    div1.addEventListener("click", additionalСards);
    
    function newGame() {
        initialFieldModule.restartGame();
    }
    
    function additionalСards() {
        gameModule.makeCounter();
        gameModule.pressureAdditionalCards();
    }
})();

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("cardTransfer", ev.target.id);
    gameModule.rememberCard(ev.target);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("cardTransfer");
    var allowTransfer = gameModule.receivingField(ev.target, ev.currentTarget);
    if (allowTransfer) {
        ev.target.appendChild(document.getElementById(data));
        gameModule.openDownCard();
    }
}