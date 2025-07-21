let letters = "abcdefghijklmnopqrstuvwxyz+#";
let lettersContiner = document.querySelector(".letters");

let lettersArray = Array.from(letters);

lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  span.appendChild(document.createTextNode(letter));
  span.className = "letter-box";
  lettersContiner.appendChild(span);
});

// craet boject with random

const words = {
  People: [
    "Fatema",
    "Mariam",
    "Abdallah",
    "Ebrahim",
    "Mohamed",
    "Sanaa",
    "Huda",
    "Mahmoud",
    "Malak",
    "Farah",
    "mai",
    "Menna",
    "Asmaa",
    "Ahmed",
  ],
  Foods: [
    "Burger",
    "Shawerma",
    "Meat",
    "Checken",
    "Kofta",
    "Kabab",
    "Rize",
    "Sambosa",
    "Fish",
  ],
  Countries: ["Syria", "Palestine", "Egypt", "Qatar", "Kuwait", "Saudi"],
  Programming: [
    "PHP",
    "C#",
    "Python",
    "Java",
    "Go",
    "Scala",
    "SQL",
    "Ruby",
    "Dart",
    "Flutter",
    "C++",
  ],
  Animals: [
    "Cow",
    "Lion",
    "Tiger",
    "Elephant",
    "Giraffe",
    "Cat",
    "Monkey",
    "Goat",
    "Horse",
  ],
};
let keys = Object.keys(words);

let randomKeys = keys[Math.floor(Math.random() * keys.length)];
document.querySelector(".category span").innerHTML = randomKeys;

let RandomArray = words[randomKeys];
let randomValue = RandomArray[Math.floor(Math.random() * RandomArray.length)];
console.log(randomValue);

// Create a span filed of the letters space

let letterSpace = document.querySelector(".letters-guess");
let arrayValue = Array.from(randomValue);
arrayValue.forEach((letter) => {
  let span = document.createElement("span");
  letterSpace.appendChild(span);
});

// compare between the clicked litter and litter of the chosen word
let wrongTries = 0;
let lettersArea = document.querySelector(".letters");
lettersArea.addEventListener("click", (e) => {
  let theStatus = false; // by defualt
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    let clickedLetter = e.target.innerHTML;
    let letterOfWord = Array.from(randomValue.toLowerCase());

    letterOfWord.forEach((letter, wordIndex) => {
      if (clickedLetter === letter) {
        theStatus = true;
        let guessLetter = document.querySelectorAll(".letters-guess span");
        guessLetter.forEach((span, guessIndex) => {
          if (guessIndex === wordIndex) {
            span.innerHTML = clickedLetter;
          }
        });
      }
    });
  }
  if (theStatus !== true) {
    // generate the wrong tries and draw the hangman
    wrongTries++;
    document
      .querySelector(".hangman-draw")
      .classList.add(`wrong-${wrongTries}`);

    // play sound fail
    document.querySelector(".fail").play();
    // finish  the game
    if (wrongTries === 9) {
      endGame();
      document.querySelector(".letters").classList.add("finished");
    }
  } else {
    document.querySelector(".success").play();
    // check if all letters are guessed
    let allSpans = document.querySelectorAll(".letters-guess span");
    let isFinished = true;
    allSpans.forEach((span) => {
      if (span.innerHTML === "") {
        isFinished = false;
      }
    });
    if (isFinished) {
      winGame();
      document.querySelector(".letters").classList.add("finished");
    }
  }
});

function endGame() {
  let popFail = document.createElement("div");
  let text = document.createTextNode(
    `Game Over! You Killed The Man, The Word Is "${randomValue}"`
  );
  popFail.appendChild(text);
  popFail.className = "pop-fail";
  document.body.appendChild(popFail);
  document.querySelector(".fail-all").play();
}

function winGame() {
  let popSucc = document.createElement("div");
  let text = document.createTextNode(
    `Congratulation! You Saved The Man After ${wrongTries} Wrongs`
  );
  popSucc.appendChild(text);
  popSucc.className = "pop-succ";
  document.body.appendChild(popSucc);
  document.querySelector(".success-all").play();
}

// reload butom
let rel = document.querySelector(".reload");

rel.addEventListener("click", () => {
  location.reload();
});
