// main container and variables 
var gridContainer=document.querySelector(".grid-container");
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
    { name: "whale", image: "assets/images/whale.png" }
  ];
  

//score count

// start game
initializeGame();

function initializeGame() {
  // Duplicate array with .concat() instead of spread JS Hint
  cards = cardData.concat(cardData);
  shuffleCards();
  generateCards();
}

//duplicate array

//shuffle

//generate dards

//flip cards

//check matching

//flip back if not match

//reset and restart
