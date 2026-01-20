const dragon = document.getElementById("dragon");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restart");

let score = 0;
let gameOver = false;

/* Jump */
function jump() {
  if (dragon.classList.contains("jump") || gameOver) return;
  dragon.classList.add("jump");
  setTimeout(() => dragon.classList.remove("jump"), 500);
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") jump();
});
document.addEventListener("touchstart", jump);

/* Game loop */
setInterval(() => {
  if (gameOver) return;

  score++;
  scoreText.innerText = "Score: " + score;

  const dragonTop = dragon.getBoundingClientRect().top;
  const obstacleLeft = obstacle.getBoundingClientRect().left;

  if (obstacleLeft < 80 && obstacleLeft > 40 && dragonTop > 160) {
    gameOver = true;
    obstacle.style.animationPlayState = "paused";
    scoreText.innerText = "Game Over 😢  Score: " + score;
    restartBtn.style.display = "inline-block";
  }
}, 100);

/* Restart */
function restartGame() {
  location.reload();
}
