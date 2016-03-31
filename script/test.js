"use strict"

    var card = new Card();
    card.setCardWeight(8);
    card.setSuit(2);

    describe ("CARD", function() {
        it("Получение веса карты", function() {
            assert.equal(card.getCardWeight(), 8);
        });
        
        it("Получение масти карты", function() {
            assert.equal(card.getSuit(), 2);
        });
        
        it("Создать ID карты", function() {
            assert.equal(card.getIdCard(), "8♥");
        });
        
        it("Создать красный цвет карты", function() {
            assert.equal(card.getColor(), "red");
        });
        
        it("Создать чёрный цвет карты", function() {
            card.setSuit(1);
            assert.equal(card.getColor(), "black");
        });
        
        it("Сменить ID карты с 8♥ на 8♠", function() {
            assert.equal(card.getIdCard(), "8♠");
        });
    });
    
    describe ("GAME", function() {
        it("Создать число", function() {
            assert.equal(initialFieldModule.randomInteger(1), 0);
        });
        
        it("Создать карту", function() {
            assert.equal(initialFieldModule.generateCard(8, 2).getIdCard(), "8♥");
        });
        
        it("Проверить сортировку", function() {
            assert.equal(gameModule.compareNumeric(4, 7), 1);
        });
        
        it("Запомнить перетаскиваемую карту", function() {
            assert.equal(gameModule.rememberCard(card), card);
        });
        
        it("Проверить правила игры", function() {
            assert.equal(gameModule.receivingField(card, div1), undefined);
        });

    });