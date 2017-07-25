$(document).ready(function () {
    prepareGame();
    playGame();
})

var playerO = new Player("o", "John Travolta");
var playerX = new Player("x", "Johny Bravo");
var currentPlayer = undefined;

$('.game-box').on("click", function () {
    if (currentPlayer) {
        console.log("You clicked box: " + $(this).prop('id'));
        var fieldArr = getFieldFromData($(this));
        currentPlayer.addField(fieldArr);
    }
})

function Player (type,name) {
    this.type = type;
    this.name = name;
    this.currentFields = [];
    this.addField = function (fieldArr) {
        this.currentFields.push(fieldArr);
        this.showCurrentFields();
    }
    this.checkIfWins = function () {
        return this.name ? true : false;

    }
    this.showCurrentFields = function () {
        console.log(this.name +" fields: " + this.currentFields.join(", "));
    }
}

function getFieldFromData (fieldObj) {
    let rowNo = fieldObj.data('row');
    let colNo = fieldObj.data('col');
    return [rowNo, colNo];
}

function prepareGame() {
    currentPlayer = playerX;
}

function playGame () {

}