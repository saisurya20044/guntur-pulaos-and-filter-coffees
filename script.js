const dragon = document.getElementById("dragon");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restart");
const couponMsg = document.getElementById("couponMsg");
const bg = document.getElementById("bg");
const ground = document.getElementById("ground");

let score = 0;
let isGameOver = false;
const COUPON_SCORE = 50;

let obstacleX = 500;
let speed = 4.5;

/* background movement */
let bgX = 0;
let groundX = 0;

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

  /* 🌄 move background */
  bgX -= 0.3;
  if (bgX <= -50) bgX = 0;
  bg.style.transform = `translateX(${bgX}%)`;

  /* 🟫 move ground */
  groundX -= 1.5;
  if (groundX <= -50) groundX = 0;
  ground.style.transform = `translateX(${groundX}%)`;

  /* 🌶️ move obstacle */
  obstacleX -= speed;
  obstacle.style.left = obstacleX + "px";

  /* reset obstacle & score */
  if (obstacleX < -40) {
    obstacleX = 500;
    score++;
    scoreText.innerText = "Score: " + score;

    /* 🎁 coupon at 50 */
    if (score === COUPON_SCORE) {
      couponMsg.style.display = "block";
      couponMsg.innerText =
        "🎉 You won a 10% DISCOUNT! Show this screen at the counter 😊";
    }

    /* increase difficulty */
    if (score % 10 === 0 && speed < 10) {
      speed += 0.3;
    }
  }

  /* ❌ collision */
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

/* Start game */
gameLoop();
