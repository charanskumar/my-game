const possibleWords = ["Walter-White", "Gus-Fring", "Heisenberg", "Salamanca", "Skyler-White", "Los-Pollos", "Albuquerque", "Jesse-Pinkman", "Tuco-Salamanca", "Steve-Gomez", "Hank-Schrader", "Saul-Goodman", "Huell", "Madrigal", "Don-Eladio", "Juan-Bolsa", "mule", "dead-drop", "lawyer", "agent", "New-Mexico", "Gilligan", "cancer", "Mike-Ehrmantraut", "desert", "Holly", "Flynn", "Junior", "Marie-Schrader", "Todd", "Uncle-Jack", "methylamine", "Gale-Boetticher", "chemistry", "Gray-Matter", "illegal", "prison", "Jane-Margolis", "precursor", "rolling-lab", "Hector", "Lydia", "Badger", "Bogdan", "car-wash", "laundromat", "superlab", "Andrea", "Skinny-Pete", "Krazy-Eight", "Tyrus", "Kuby", "twins", "Ted-Beneke", "Gretchen", "Elliot", "Declan", "Wendy", "Victor", "Combo", "ricin", "empire", "cartel"];
let wrongLetterGuesses = [];
let guessesRem = 10;
let answer = "";
let blanksShown = [];
let blanks = document.getElementById('blanks');
const showRemGuesses = document.getElementById('guessesLeft');
const guessList = document.getElementById('lettersGuessed');
let gameImg = document.createElement('img');

const resetGameBtn = document.getElementById('resetGameBtn');
resetGameBtn.addEventListener('click', initialize);

const alphabetBtns = document.querySelectorAll("#letter");
alphabetBtns.forEach(btn => btn.addEventListener('click', checkGuess));

function initialize (){
    blanksShown = [];
    wrongLetterGuesses = [];
    guessesRem = 10;
    gameImg.src = 'images/gamepic.jpeg';
    document.getElementById('gamePicture').appendChild(gameImg);
    guessList.innerHTML = `Wrong Letters: ${wrongLetterGuesses.join(" ")}`;
    setSecretWord();
    showRemGuesses.innerHTML = '10 guesses remaining!';
    showRemGuesses.classList.remove("lastGuess");
}

initialize();

function setSecretWord() {
    const secretWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    answer = secretWord;
    console.log(secretWord);
    blanks.innerHTML = showWordBlanks(secretWord);
}

function showWordBlanks(word) {
    let wordBlanks = word.split("");
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === "-") {
            blanksShown.push("-");
        }
        else {
            blanksShown.push("_");
        }
    }
    return blanksShown.join(" ");
}

function checkGuess(event) {
    let selectedLetter = event.target.value;
    for (let i = 0; i < answer.length; i++) {
        if (answer[i].toUpperCase() === selectedLetter) {
            blanksShown.splice(i, 1, selectedLetter);
            blanks.innerHTML = blanksShown.join(" ");
            showRemGuesses.innerHTML = `${guessesRem} guesses remaining!`;
        }
    }
    if (answer.toUpperCase().indexOf(selectedLetter) === -1) {
        guessesRem--;
        showRemGuesses.innerHTML = `${guessesRem} guesses remaining!`;
        wrongLetterGuesses.push(selectedLetter);
        guessList.innerHTML = `Wrong Letters: ${wrongLetterGuesses.join(" ")}`;
    }
    if (guessesRem === 0) {
        showRemGuesses.innerHTML = `Walt and Jesse were caught! :( The answer was "${answer}". Click "Reset Game" to play again!`;
    } else if ((guessesRem > 0) && (!blanksShown.includes('_'))) {
        showRemGuesses.innerHTML = "Congrats! Walt and Jesse were able to escape because you guessed the word!";
    }
    else if (guessesRem === 1) {
        showRemGuesses.innerHTML = `${guessesRem} guess remaining!`;
        showRemGuesses.classList.add("lastGuess");
    }
    showPicture();
}

function showPicture() {
    if ((guessesRem > 0) && (!blanksShown.includes('_'))) {
        gameImg.src = '/images/winpic.jpeg';
    }
    if (guessesRem === 0) {
        gameImg.src = '/images/lossgif.gif';
    }
}