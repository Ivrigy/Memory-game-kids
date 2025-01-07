// main container and variables
var gridContainer = document.querySelector(".grid-container");
var cards = [];
var firstCard = null;
var secondCard = null;
var lockBoard = false;
var score = 0;

//cards data
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

//score count
document.querySelector(".score").textContent = score;

// action
var actionButton = document.querySelector(".actions");
if (actionButton) {
  actionButton.addEventListener("click", function () {
    restart();
  });
}

// start game
initializeGame();

function initializeGame() {
  // Duplicate array with .concat() instead of spread JS Hint
  cards = cardData.concat(cardData);
  shuffleCards();
  generateCards();
}

//cards dom

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

//duplicate array

//shuffle Fisher-Yates as seen in many different sources
function shuffleCards() {
  var currentIndex = cards.length;
  while (currentIndex !== 0) {
    var randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    //swap
    var temp = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temp;
  }
}

//flip cards
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

//check matching
function checkForMatch() {
  var isMatch = firstCard.getAttribute("data-name") === secondCard.getAttribute("data-name");
  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}
//freeze matched
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

//flip back if not match
function unflipCards() {
  setTimeout(function() {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

//reset and restart
