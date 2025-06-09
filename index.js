var gameStarted = false
var inputLocked = false
var buttonColors = ["red","blue","green", "yellow"]
var score = 0
var highScore = 0
var userSelectedPattern = []
var gamePattern = []

function nextSequence() {
    inputLocked = true
    var randomNumber = Math.floor(Math.random() * 4);
    var gameSelectedColor = buttonColors[randomNumber]
    gamePattern.push(gameSelectedColor)

    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(() => {
            flashColor(gamePattern[i]);
            }, i * 600);
        }

        setTimeout(() => {
            inputLocked = false

        }, gamePattern.length * 600);
}


function flashColor(color) {
    $("#" + color).fadeOut(100).fadeIn(100);
    playSound(color);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3")
    audio.play();
}

function updateScore() {
    playSound("score")
    score += 1
    $("p").first().text("SCORE: " + score)
}

function resetGame() {
    score = 0
    userSelectedPattern = []
    gamePattern = []
    gameStarted = false
}

    function checkAnswer(currentIndex) {
        if (gamePattern[currentIndex] === userSelectedPattern[currentIndex]) {
            if (gamePattern.length === userSelectedPattern.length) {
                updateScore();
                userSelectedPattern = [];
                setTimeout(nextSequence, 1250);
            }
        } else {
            if (score > highScore) {
                highScore = score
            }
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over")
            }, 100);
            playSound("wrong")
            $("h2").show();
            $("h2").text("You Lost! Try again?");
            $(".start-btn").show();
            $("p").eq(1).text("HIGHSCORE: " + highScore);
            $("p").first().text("SCORE: 0");
            resetGame();
        }
    }

$(".start-btn").on("click", function() {
    if (gameStarted === false) {
        $("h2").hide();
        $(".start-btn").hide();
        gameStarted = true
        nextSequence();
    }
});


$(".btn").on("click", function() {
    if (gameStarted === true && inputLocked === false) {
    var userChosenColor = this.id
    flashColor(userChosenColor);
    userSelectedPattern.push(userChosenColor);

    checkAnswer(userSelectedPattern.length - 1)
    }
})