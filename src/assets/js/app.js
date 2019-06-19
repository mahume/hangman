let wins = 0;
let gamePlay = false;
let guessesStart;
let guessesLeft;
let gamePlayEasy;
let keyLetter;
let keyCode;
let randomWordFromArray = [];
let blankWordArray = [];
let wrongLettersArray = [];
let wordSplitToArray = [];
const easyWords = [
  'border',
  'cookies',
  'plates',
  'monkey',
  'relationship',
  'university',
  'rabbit',
  'hamburger',
];
const hardWords = [
  'crypt',
  'fjord',
  'haiku',
  'jinx',
  'klutz',
  'phlegm',
  'sphinx',
  'yacht',
];

reset();

// Buttons
document.querySelector('#easyMode').addEventListener('click', easyMode);
document.querySelector('#hardMode').addEventListener('click', hardMode);
document.querySelector('#reset').addEventListener('click', reset);

// Functions
function easyMode() {
  gamePlayEasy = true;
  guessesStart = 7;

  modeInit();
  init();
  selectNewWord();
  createBlankWord();
}
function hardMode() {
  gamePlayEasy = false;
  guessesStart = 4;

  modeInit();
  init();
  selectNewWord();
  createBlankWord();
}
function modeInit() {
  gamePlay = true;
  wins = 0;
  guessesLeft = guessesStart;
  blankWordArray = [];
  wordSplitToArray = [];
  wrongLettersArray = [];
  document.querySelector('#guessedLetters').textContent = wrongLettersArray;
}
function init() {
  document.querySelector('#numberOfWins').textContent = wins;
  document.querySelector('#guessesLeft').textContent = guessesStart;
  document.querySelector('#wordToGuessHeading').textContent = '';
  document.querySelector('#alreadyGuessedHeading').textContent =
    'Letters Guessed';
}
function reset() {
  wins = '-';
  guessesStart = '-';
  guessesLeft = '-';
  gamePlay = false;

  init();

  document.querySelector('#wordToGuessHeading').textContent = '';
  document.querySelector('#wordToGuess').textContent =
    'Choose a difficulty level';
  document.querySelector('#alreadyGuessedHeading').textContent =
    'Then start guessing!';
  document.querySelector('#guessedLetters').textContent = '';
}
function createBlankWord() {
  for (let i = 0; i < wordSplitToArray.length; i++) {
    blankWordArray.push('_');
  }
  document.querySelector('#wordToGuess').textContent = blankWordArray.join(' ');
}
function selectNewWord() {
  if (gamePlayEasy) {
    randomWordFromArray =
      easyWords[Math.floor(Math.random() * easyWords.length)];
    wordSplitToArray = randomWordFromArray.split('');
  } else {
    randomWordFromArray =
      hardWords[Math.floor(Math.random() * hardWords.length)];
    wordSplitToArray = randomWordFromArray.split('');
  }
}
function loser() {
  if (guessesLeft < 0) {
    reset();
    blankWordArray = [];
    wrongLettersArray = [];
    alert('Game over!');
    // clear arrays
  }
}
function winner(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  wins++;
  // alert('You rock!');
  init();
  blankWordArray = [];
  wrongLettersArray = [];
  guessesLeft = guessesStart;
  document.querySelector('#guessedLetters').textContent = wrongLettersArray;
  selectNewWord();
  createBlankWord();
}
function letterGuessedLogic() {
  if (wordSplitToArray.includes(keyLetter)) {
    for (let i = 0; i < blankWordArray.length; i++) {
      if (keyLetter === wordSplitToArray[i]) {
        blankWordArray.splice([i], 1, keyLetter);
      }
    }
    document.querySelector('#wordToGuess').textContent = blankWordArray.join(
      ' '
    );
  } else if (!wrongLettersArray.includes(keyLetter)) {
    wrongLettersArray.push(keyLetter);
    document.querySelector('#guessedLetters').textContent = wrongLettersArray;
    guessesLeft--;
    document.querySelector('#guessesLeft').textContent = guessesLeft;
  }
  winner(blankWordArray, wordSplitToArray);
  loser();
}

// GAME PLAY
document.addEventListener('keypress', event => {
  keyLetter = event.key;
  keyCode = event.keyCode;
  if (gamePlay) {
    if (keyCode >= 97 && keyCode <= 122) {
      letterGuessedLogic();
    } else {
      alert('Select a letter');
    }
  } else {
    alert('Select a difficulty');
  }
});
