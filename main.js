$(document).ready(function () {
    playGame();
    prepareGame();


})

var playerO = new Player("o", "John Travolta");
var playerX = new Player("x", "Johny Bravo");
var currentPlayer = undefined;
var inGame = false;
var winningBoxes = [[0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6]];



function Player (type,name) {
    this.queryString = undefined;
    this.type = type;
    this.name = name;
    this.currentFields = [];
    this.applyRandomBackground = function () {
        let num = Math.ceil((Math.random() * 1000) % 27);
        console.log("The random number is: " + num);
        this.queryString = 'url(img/' + num + '.png)';
    }

    this.addField = function (fieldArr) {
        this.currentFields.push(fieldArr);
        this.currentFields.sort(function(a, b){return a-b});
        this.showCurrentFields();
    }
    this.showCurrentFields = function () {
        console.log(this.name +" fields: " + this.currentFields.join(", "));
    }
}



function checkIfWon (player) {
    if (player.currentFields.length < 3) {
        return false;
    }
    for(let i = 0; i < winningBoxes.length; i++) {
        if((player.currentFields.indexOf(winningBoxes[i][0]) > -1 &&
            player.currentFields.indexOf(winningBoxes[i][1]) > -1) &&
            player.currentFields.indexOf(winningBoxes[i][2]) > -1) {
            return true;
        }
    }
}

function checkIfDraw () {
    return $('.game-box').not('.taken').length === 0;
}

function updateStatus () {
    currentPlayer = (currentPlayer === playerX) ? playerO : playerX;

    if(inGame) {
        let cursorString = currentPlayer.queryString + ", auto";
        $('#current-player').css({
            'background': currentPlayer.queryString,
            'background-repeat': "no-repeat",
            'background-size': "40px 40px",
            'background-position': "center"});

        $('.game-box').css("cursor", cursorString);
    }
    //css background here

}

function updateClass (fieldObj, cssString) {
    fieldObj.toggleClass('taken').css({
        'background': cssString,
        'background-repeat': "no-repeat",
        'background-size': "40px 40px",
        'background-position': "center"});


}

function getFieldFromData (fieldObj) {
    return fieldObj.data('id');
}

function prepareGame() {
    inGame = true;
    clearGrid();
    playerO = new Player("o", "John Travolta");
    playerX = new Player("x", "Johny Bravo");
    playerX.applyRandomBackground();
    playerO.applyRandomBackground();
    while(playerO.queryString === playerX.queryString) {
        playerX.applyRandomBackground();
    }
    updateStatus();
}

function clearGrid() {
    $('.game-box').css({
        'background': ''
    }).removeClass('taken');
    $('#current-player-text').text("Current player: ");
}

function playGame () {
    $('#new-game').on("click", function () {
        if(inGame) {
            $(this).text("In Game");
        }
        else {
            prepareGame();
        }
    })
    $('.game-box').on("click", function () {
        if (currentPlayer && !$(this).hasClass("taken") && inGame) {
            let fieldNo = getFieldFromData($(this));
            currentPlayer.addField(fieldNo);
            updateClass($(this),currentPlayer.queryString);
            if (checkIfWon(currentPlayer)) {
                $('#current-player-text').text("You have won! ");
                endGame(currentPlayer);
                updateStatus();
            }
            else if (checkIfDraw()) {
                $('.game-box').css("cursor", 'default');
                $('#current-player-text').text("Draw! ");
                endGame();
                updateStatus();
            }
            else {
                updateStatus();
            }
        }
    })

}

function endGame (winner) {
    if (winner) {
        console.log("Player " + winner.name + " wins the game!");
    }
    else {
        console.log("Game ended with draw");
    }
    inGame = false;
    $('#new-game').text("New Game");
    playGame();
}