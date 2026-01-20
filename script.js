const dragon = document.getElementById("dragon");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restart");

let score = 0;
let speed = 1800;
let gameOver = false;

/* Jump */
function jump() {
  if (dragon.classList.contains("jump") || gameOver) return;

  dragon.classList.add("jump");
  setTimeout(() => {
    dragon.classList.remove("jump");
  }, 600);
}

/* Controls */
document.addEventListener("keydown", e => {
  if (e.code === "Space") jump();
});
document.addEventListener("touchstart", jump);

/* Collision + Score */
let gameLoop = setInterval(() => {
  const dragonBottom = parseInt(
    window.getComputedStyle(dragon).getPropertyValue("bottom")
  );
  const obstacleLeft = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("right")
  );

  if (obstacleLeft > 430 && obstacleLeft < 470 && dragonBottom < 40) {
    endGame();
  }

  if (!gameOver) {
    score++;
    scoreText.innerText = "Score: " + score;

    /* Increase speed gradually */
    if (score % 200 === 0 && speed > 800) {
      speed -= 150;
      obstacle.style.animationDuration = speed / 1000 + "s";
    }
  }
}, 50);

/* End Game */
function endGame() {
  gameOver = true;
  obstacle.style.animationPlayState = "paused";
  scoreText.innerText = "Game Over 😢  Score: " + score;
  restartBtn.style.display = "inline-block";
}

/* Restart */
function restartGame() {
  score = 0;
  speed = 1800;
  gameOver = false;
  obstacle.style.animation = "none";
  obstacle.offsetHeight; // reflow
  obstacle.style.animation = `move ${speed / 1000}s linear infinite`;
  obstacle.style.animationPlayState = "running";
  scoreText.innerText = "Score: 0";
  restartBtn.style.display = "none";
}
