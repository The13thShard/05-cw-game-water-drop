// Variables to control game state
let gameRunning = false; // Keeps track of whether game is active or not
let dropMaker; // Will store our timer that creates drops regularly
let gameTimer;
let timeRemaining = 30;

// Wait for button click to start the game
document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("reset-btn").addEventListener("click", resetGame);

function startGame() {
  // Prevent multiple games from running at once
  if (gameRunning) return;

  gameRunning = true;
  timeRemaining = 30;
  document.getElementById("time").textContent = timeRemaining;

  // Create new drops every second (1000 milliseconds)
  dropMaker = setInterval(createDrop, 1000);
  gameTimer = setInterval(() => {
    timeRemaining -= 1;
    document.getElementById("time").textContent = timeRemaining;

    if (timeRemaining === 0) {
      gameRunning = false;
      clearInterval(gameTimer);
      clearInterval(dropMaker);
      document.getElementById("game-container").replaceChildren();
    }
  }, 1000);
}

function resetGame() {
  clearInterval(gameTimer);
  clearInterval(dropMaker);
  gameRunning = false;
  timeRemaining = 30;
  document.getElementById("time").textContent = timeRemaining;
  document.getElementById("score").textContent = "0";
  document.getElementById("game-container").replaceChildren();
}

function createDrop() {
  if (!gameRunning) return;

  // Create a new div element that will be our water drop
  const drop = document.createElement("div");
  drop.className = "water-drop";

  // Make drops different sizes for visual variety
  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  drop.style.width = drop.style.height = `${size}px`;

  // Position the drop randomly while keeping it inside the game container
  const gameWidth = document.getElementById("game-container").clientWidth;
  const xPosition = Math.random() * Math.max(0, gameWidth - size);
  drop.style.left = xPosition + "px";

  // Make drops fall for 4 seconds
  drop.style.animationDuration = "4s";

  // Add the new drop to the game screen
  const gameContainer = document.getElementById("game-container");
  gameContainer.appendChild(drop);

  drop.addEventListener("click", () => {
    if (!gameRunning) return;

    const scoreElement = document.getElementById("score");
    scoreElement.textContent = Number(scoreElement.textContent) + 1;
    drop.remove();

    gameContainer.classList.remove("grid-flash");
    void gameContainer.offsetWidth;
    gameContainer.classList.add("grid-flash");
  });

  // Remove drops that reach the bottom (weren't clicked)
  drop.addEventListener("animationend", () => {
    drop.remove(); // Clean up drops that weren't caught
  });
}
