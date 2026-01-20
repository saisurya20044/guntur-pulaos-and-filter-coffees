const dragon = document.getElementById("dragon");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restart");

let score = 0;
let isGameOver = false;
const WIN_SCORE = 100;

/* Initial obstacle position */
let obstacleX = 500;
let speed = 6;

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

/* MAIN GAME LOOP */
function gameLoop() {
  if (isGameOver) return;

  // Move obstacle
  obstacleX -= speed;
  obstacle.style.left = obstacleX + "px";

  if (obstacleX < -40) {
    obstacleX = 500;
    score++;
    scoreText.innerText = "Score: " + score;
  }

  // Increase difficulty
  if (score % 10 === 0 && speed < 15) {
    speed += 0.2;
  }

  // 🏆 WIN
  if (score >= WIN_SCORE) {
    endGame("🎉 YOU WIN! Enjoy your biryani 😋");
    return;
  }

  // ❌ OUT (collision)
  const dragonRect = dragon.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    obstacleRect.left < dragonRect.right &&
    obstacleRect.right > dragonRect.left &&
    obstacleRect.bottom > dragonRect.top + 20
  ) {
    endGame("❌ OUT! Try again 😢");
    return;
  }

  requestAnimationFrame(gameLoop);
}

/* END GAME */
function endGame(message) {
  isGameOver = true;
  scoreText.innerText = message + " | Score: " + score;
  restartBtn.style.display = "inline-block";
}

/* RESTART */
function restartGame() {
  location.reload();
}

/* START GAME */
gameLoop();
