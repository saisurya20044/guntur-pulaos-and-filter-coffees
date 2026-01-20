const dragon = document.getElementById("dragon");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restart");

let score = 0;
let isGameOver = false;
const WIN_SCORE = 100;

/* Jump */
function jump() {
  if (isGameOver) return;
  if (!dragon.classList.contains("jump")) {
    dragon.classList.add("jump");
    setTimeout(() => {
      dragon.classList.remove("jump");
    }, 500);
  }
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") jump();
});
document.addEventListener("touchstart", jump);

/* Main Game Loop */
const gameInterval = setInterval(() => {
  if (isGameOver) return;

  score++;
  scoreText.innerText = "Score: " + score;

  // 🏆 WIN CONDITION
  if (score >= WIN_SCORE) {
    endGame("🎉 YOU WIN! Enjoy your biryani 😋");
    return;
  }

  // ❌ OUT CONDITION
  const dragonRect = dragon.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    obstacleRect.left < dragonRect.right - 5 &&
    obstacleRect.right > dragonRect.left + 5 &&
    obstacleRect.bottom > dragonRect.top + 20
  ) {
    endGame("❌ OUT! Try again 😢");
  }

}, 100);

/* End Game */
function endGame(message) {
  isGameOver = true;
  obstacle.style.animationPlayState = "paused";
  scoreText.innerText = message + " | Score: " + score;
  restartBtn.style.display = "inline-block";
}

/* Restart */
function restartGame() {
  location.reload();
}
