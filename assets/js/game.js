// Main container and variables (ES5 JS Hint change)
var gridContainer = document.querySelector(".grid-container");
var cards = [];
var firstCard = null;
var secondCard = null;
var lockBoard = false;
var score = 0;

// Card data
var cardData = [
  { name: "beetle", image: "assets/images/beetle.png" },
  { name: "chipmunk", image: "assets/images/chipmunk.png" },
  { name: "hedgehog", image: "assets/images/hedgehog.png" },
  { name: "ladybug", image: "assets/images/ladybug.png" },
  { name: "octopus", image: "assets/images/octopus.png" },
  { name: "parrot", image: "assets/images/parrot.png" },
  { name: "pigeon", image: "assets/images/pigeon.png" },
  { name: "seal", image: "assets/images/seal.png" },
  { name: "skunk", image: "assets/images/skunk.png" },
  { name: "snake", image: "assets/images/snake.png" },
  { name: "lizard", image: "assets/images/lizard.png" },
  { name: "whale", image: "assets/images/whale.png" },
];

// Score count
document.querySelector(".score").textContent = score;

// Action button (JS Hint adaption)
var actionButton = document.querySelector(".actions");
if (actionButton) {
  actionButton.addEventListener("click", function () {
    restart();
  });
}

// Start the game
initializeGame();

function initializeGame() {
  // Duplicate array with .concat() instead of spread JS Hint
  cards = cardData.concat(cardData);
  shuffleCards();
  generateCards();
}

//Cards DoM

function generateCards() {
  gridContainer.innerHTML = "";
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    var innerHTML =
      '<div class="front">' +
      '  <img class="front-image" src="' +
      card.image +
      '" />' +
      "</div>" +
      '<div class="back"></div>';
    cardElement.innerHTML = innerHTML;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

//Shuffle cards (Fisher-Yates in ES5)
function shuffleCards() {
  var currentIndex = cards.length;
  while (currentIndex !== 0) {
    var randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    var temp = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temp;
  }
}

//Flip cards
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flipped");
  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;
  checkForMatch();
}

// Check match
function checkForMatch() {
  var isMatch =
    firstCard.getAttribute("data-name") ===
    secondCard.getAttribute("data-name");
  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

// Freeze match
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

//Unflip non matched
function unflipCards() {
  setTimeout(function () {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

// Reset & restart
function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  score = 0;
  document.querySelector(".score").textContent = score;
  initializeGame();
}
