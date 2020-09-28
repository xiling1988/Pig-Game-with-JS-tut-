/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var activePlayer, scores, roundScore, gamePlaying, oneSix;
gamePlaying = true;

init();

dice = Math.floor(Math.random() * 6) + 1;

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gamePlaying) {
        // 1. get random number:
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display number:
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";
        // 3. add rolled number to score unless it's 1?
        if (dice === 6 && oneSix === 6) {
            scores[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = "0";
            nextPlayer();
        } else if (dice !== 1) {
            // Add Score
            roundScore += dice;
            document.querySelector(
                "#current-" + activePlayer
            ).textContent = roundScore;
        } else {
            // Next Player - change Panel
            nextPlayer();
        }
        oneSix = dice;
    }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gamePlaying) {
        // Add  current to global score
        scores[activePlayer] += roundScore;
        document.querySelector("#score-" + activePlayer).textContent =
            scores[activePlayer];

        // check if won
        var scorelimit = document.querySelector(".limits").value;
        if (scores[activePlayer] >= scorelimit) {
            // display Winner in Player Name
            document.getElementById("name-" + activePlayer).textContent = "WINNER!";
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.add("winner");
            // change active to inactive UI
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.toggle("active");
            // delete dice display from UI
            document.querySelector(".dice").style.display = "none";
            gamePlaying = false;
        } else {
            // Change Player
            nextPlayer();
        }
    }
});

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector(".dice").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    gamePlaying = true;
}

function nextPlayer() {
    // set current to 0
    roundScore = 0;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;

    // change active to inactive UI
    document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.toggle("active");

    // change active player
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

    // change inactive to active player UI
    document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.toggle("active");

    // delete dice display from UI
    // document.querySelector(".dice").style.display = "none";
}