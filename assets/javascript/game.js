function resetGame() {
    resetUI();
    gameAnswer = chooseWord();
    gameShownAnswer = blanksFromAnswer(gameAnswer);
    hangmanState = 0;
    drawWord(gameShownAnswer);
}
$(document).ready(resetGame);

function win() {
    alert('You win!');
    resetGame();
}

function lose() {
    alert('Oh no, you lose!');
    resetGame();
}

function doKeypress() {
    var tempChar = $('#letter-input').val().toLowerCase();
    var tempString = "";
    $('#letter-input').val("");

    // Write here!
    tempString = guessLetter(tempChar, gameShownAnswer, gameAnswer);
    if (tempString != gameShownAnswer) {
        updateWord(tempString);
        gameShownAnswer = tempString;
        if (gameShownAnswer === gameAnswer) {
            win();
        }
    } else {
        wrongLetter(tempChar);
        drawSequence[hangmanState++]();
        if (hangmanState === drawSequence.length) {
            lose();
        }
    }
}
$('#letter-input').keyup(doKeypress);

var stands = ["Star Platinum", "Hermit Purple", "Silver Chariot", "Hierophant Green", "Magician's Red", "The Fool", "The World", "Justice", "Cream", "The Emperor", "Osiris", "Horus", 
"Geb", "Bastet", "Sethan", "Khnum", "Tohth", "Atum", "Tenore Sax", "Tower of Gray", "Dark Blue Moon", "Strength", "Ebony Devil", "Yellow Temperance", "Hanged Man", "Empress", 
"Wheel of Fortune", "Lovers", "The Sun", "Death Thirteen", "Judgment", "High Priestess", "Anubis"];

function chooseWord() {
    return stands[Math.floor(Math.random() * stands.length)];
}

function blanksFromAnswer(answerWord) {
    var result = "";
    for (i in answerWord) {
        result = "_" + result;
    }
    return result;
}

function alterAt(n, c, originalString) {
    return originalString.substr(0, n) + c + originalString.substr(n + 1, originalString.length);
}

function guessLetter(letter, shown, answer) {
    var checkIndex = 0;

    checkIndex = answer.indexOf(letter);
    while (checkIndex >= 0) {
        shown = alterAt(checkIndex, letter, shown);
        checkIndex = answer.indexOf(letter, checkIndex + 1);
    }
    return shown;
}