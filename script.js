document.addEventListener("DOMContentLoaded", function () {

  const symbols = ["🍎","🍌","🍇","🍉","🍓","🍒","🥝","🍍"];
  let cards = [...symbols, ...symbols];
  let flippedCards = [];
  let moves = 0;
  let matched = 0;
  let timer = 0;
  let interval;

  const gameBoard = document.getElementById("gameBoard");
  const movesDisplay = document.getElementById("moves");
  const timerDisplay = document.getElementById("timer");

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function startTimer() {
    interval = setInterval(() => {
      timer++;
      timerDisplay.textContent = timer;
    }, 1000);
  }

  function createBoard() {
    shuffle(cards);
    gameBoard.innerHTML = "";

    cards.forEach(symbol => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.symbol = symbol;
      card.addEventListener("click", flipCard);
      gameBoard.appendChild(card);
    });
  }

  function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains("matched")) return;

    this.classList.add("flipped");
    this.textContent = this.dataset.symbol;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      moves++;
      movesDisplay.textContent = moves;
      checkMatch();
    }

    if (moves === 1) startTimer();
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matched += 2;

      if (matched === cards.length) {
        clearInterval(interval);
        setTimeout(() => {
          alert("🎉 You Won in " + moves + " moves!");
        }, 300);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.textContent = "";
        card2.textContent = "";
      }, 800);
    }

    flippedCards = [];
  }

  window.restartGame = function () {
    moves = 0;
    matched = 0;
    timer = 0;
    movesDisplay.textContent = 0;
    timerDisplay.textContent = 0;
    clearInterval(interval);
    flippedCards = [];
    createBoard();
  };

  createBoard();

});