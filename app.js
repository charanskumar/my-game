const possibleWords = ["Walter-White", "Gus-Fring", "Heisenberg", "Salamanca", "Skyler-White", "Los-Pollos", "Albuquerque", "Jesse-Pinkman", "Tuco-Salamanca", "Steve-Gomez", "Hank-Schrader", "Saul-Goodman", "Huell", "Madrigal", "Don-Eladio", "Juan-Bolsa", "mule", "dead-drop", "lawyer", "agent", "New-Mexico", "Gilligan", "cancer", "Mike-Ehrmantraut", "desert", "Holly", "Flynn", "Junior", "Marie-Schrader", "Todd", "Uncle-Jack", "methylamine", "Gale-Boetticher", "chemistry", "Gray-Matter", "illegal", "prison", "Jane-Margolis", "precursor", "rolling-lab", "Hector", "Lydia", "Badger", "Bogdan", "car-wash", "laundromat", "superlab", "Andrea", "Skinny-Pete", "Krazy-Eight", "Tyrus", "Kuby", "twins", "Ted-Beneke", "Gretchen", "Elliot", "Declan", "Wendy", "Victor", "Combo", "ricin", "empire", "cartel"];
let prevLetterGuesses = [];
let guessesRem = 10;
let answer = "";
let blanksShown = [];
let blanks = document.getElementById('blanks');
const showRemGuesses = document.getElementById('guessesLeft');

const resetGameBtn = document.getElementById('resetGameBtn');
resetGameBtn.addEventListener('click', initialize);

const alphabetBtns = document.querySelectorAll("#letter");
alphabetBtns.forEach(btn => btn.addEventListener('click', checkGuess));

function initialize (){
    setSecretWord();
    showRemGuesses.innerHTML = '10 guesses remaining!';
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