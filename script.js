const dragon = document.getElementById("dragon");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restart");
const couponMsg = document.getElementById("couponMsg");
const bg = document.getElementById("bg");
const ground = document.getElementById("ground");
const game = document.getElementById("game");

let score, speed, obstacleX, bgX, groundX, isGameOver;
const COUPON_SCORE = 50;

/* RESET GAME */
function resetGame() {
  score = 0;
  speed = 4.5;
  obstacleX = game.offsetWidth + 60;
  bgX = 0;
  groundX = 0;
  isGameOver = false;

  scoreText.innerText = "Score: 0";
  couponMsg.style.display = "none";
  restartBtn.style.display = "none";

  gameLoop();
}

/* JUMP */
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

/* GAME LOOP */
function gameLoop() {
  if (isGameOver) return;

  bgX -= 0.25;
  if (bgX <= -50) bgX = 0;
  bg.style.transform = `translateX(${bgX}%)`;

  groundX -= 1.4;
  if (groundX <= -50) groundX = 0;
  ground.style.transform = `translateX(${groundX}%)`;

  obstacleX -= speed;
  obstacle.style.left = obstacleX + "px";

  if (obstacleX < -50) {
    obstacleX = game.offsetWidth + 60;
    score++;
    scoreText.innerText = "Score: " + score;

    if (score === COUPON_SCORE) {
      couponMsg.style.display = "block";
    }

    if (score % 10 === 0 && speed < 10) {
      speed += 0.3;
    }
  }

  const d = dragon.getBoundingClientRect();
  const o = obstacle.getBoundingClientRect();

  if (
    o.left < d.right - 12 &&
    o.right > d.left + 12 &&
    d.bottom > o.top + 10
  ) {
    isGameOver = true;
    scoreText.innerText = `❌ OUT! Try again 😢 | Score: ${score}`;
    restartBtn.style.display = "inline-block";
    return;
  }

  requestAnimationFrame(gameLoop);
}

restartBtn.addEventListener("click", resetGame);

/* START */
resetGame();
