const cards = document.querySelectorAll(".image-card");
const scoreText = document.querySelector(".score");
const FlipsLeftText = document.querySelector(".FlipsLeft");
// const welcomeSound = ;
var flipped = false;
var firstCard, secondCard;
var statue = false;
var score = 0;
var flipsLeft = 8;

function flipCard() {
  
  if (statue) return; // if game statued, no flipping allowed
  if (this === firstCard) return; // handle double click on same card

  this.classList.add("flip");
  if (!flipped) {
    //not flipped
    flipped = true;
    firstCard = this;
    return;
  }
  //flipped
  flipped = false;
  secondCard = this;
  matchCard();
  
}

function matchCard() {
  //disbale cards
  if (firstCard.dataset["game"] === secondCard.dataset["game"]) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    score += 1;
    scoreText.innerHTML = `SCORE: ${score}/4`;
  } //unflip cards
  else {
    statue = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      statue = false;
      resetFirstCard();
    }, 460);
  }
  flipsLeft -= 1;
  FlipsLeftText.innerHTML = `FLIPS LEFT: ${flipsLeft}`;
  if (flipsLeft === 0 || score === 4) {
    setTimeout(() => {
      alert("Game Over. Press 'Enter' or click 'OK' to play again.");
      window.location.reload();
    }, 500);
    
  }
}

function resetFirstCard() {
  [firstCard] = [null];
}

// setInterval(null, 1000); 1
// setInterval(null, 1000); 2
// setInterval(null, 1000); 3

let intervalId = setInterval(function () {
  //intervalID = 4
  document
    .querySelector("#audio")
    .play()
    .then(() => {
      //promise fulfilled
      clearInterval(intervalId); //remove the interval
    })
    .catch(() => {}); //promise rejected. If removed, then an error will be displayed in the console.
}, 100);

// console.log(intervalId);

window.onload = () => {
  shuffle();
  scoreText.innerHTML = `SCORE: ${score}`;
  FlipsLeftText.innerHTML = `FLIPS LEFT: ${flipsLeft}`;
};

function shuffle() {
  cards.forEach((card) => {
    let randomID = Math.floor(Math.random() * 9); // because we have 8 cards so we need a random no. in the range [0,9)
    card.style.order = randomID;
  });
}
cards.forEach((card) => card.addEventListener("click", flipCard));

//Number of chances to flip
//Score
//Play again
