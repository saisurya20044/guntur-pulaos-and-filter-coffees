const dragon = document.getElementById("dragon");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restart");

let score = 0;
let isGameOver = false;
const WIN_SCORE = 100;

let obstacleX = 500;
let speed = 4.5;

/* Jump */
function jump() {
  if (isGameOver) return;
  if (!dragon.classList.contains("jump")) {
    dragon.classList.add("jump");
    setTimeout(() => dragon.classList.remove("jump"), 500);
  }
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") jump();
});
document.addEventListener("touchstart", jump);

/* Game loop */
function gameLoop() {
  if (isGameOver) return;

  // Move obstacle
  obstacleX -= speed;
  obstacle.style.left = obstacleX + "px";

  // Reset obstacle & score
  if (obstacleX < -30) {
    obstacleX = 500;
    score++;
    scoreText.innerText = "Score: " + score;

    if (score % 10 === 0 && speed < 10) {
      speed += 0.3;
    }
  }

  // 🏆 WIN
  if (score >= WIN_SCORE) {
    endGame("🎉 YOU WIN! Enjoy your biryani 😋");
    return;
  }

  // ❌ OUT (collision)
  const d = dragon.getBoundingClientRect();
  const o = obstacle.getBoundingClientRect();

  if (
    o.left < d.right - 15 &&
    o.right > d.left + 15 &&
    d.bottom > o.top + 15
  ) {
    endGame("❌ OUT! Try again 😢");
    return;
  }

  requestAnimationFrame(gameLoop);
}

/* End game */
function endGame(message) {
  isGameOver = true;
  scoreText.innerText = message + " | Score: " + score;
  restartBtn.style.display = "inline-block";
}

/* Restart */
function restartGame() {
  location.reload();
}

/* Start */
gameLoop();
