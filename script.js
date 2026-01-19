const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let highScore = localStorage.getItem("biryaniHigh") || 0;
document.getElementById("highScore").innerText = "High: " + highScore;

let gameSpeed = 3;
let gravity = 0.6;
let gameOver = false;

/* PLAYER */
const player = {
    x: 40,
    y: 300,
    width: 40,
    height: 40,
    dy: 0,
    jumpForce: 12,
    grounded: true
};

/* OBSTACLES */
let obstacles = [];

function spawnObstacle() {
    const height = 30 + Math.random() * 20;
    obstacles.push({
        x: canvas.width,
        y: canvas.height - height - 20,
        width: 30,
        height: height
    });
}

/* CONTROLS */
function jump() {
    if (player.grounded && !gameOver) {
        player.dy = -player.jumpForce;
        player.grounded = false;
    }
}

document.addEventListener("keydown", e => {
    if (e.code === "Space") jump();
});
canvas.addEventListener("touchstart", jump);

/* GAME LOOP */
let frame = 0;
function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* GROUND */
    ctx.fillStyle = "#636e72";
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);

    /* PLAYER */
    player.dy += gravity;
    player.y += player.dy;

    if (player.y + player.height >= canvas.height - 20) {
        player.y = canvas.height - player.height - 20;
        player.dy = 0;
        player.grounded = true;
    }

    ctx.fillStyle = "#e17055";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillText("🍗", player.x + 5, player.y + 30);

    /* OBSTACLES */
    obstacles.forEach((obs, index) => {
        obs.x -= gameSpeed;
        ctx.fillStyle = "#d63031";
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        /* COLLISION */
        if (
            player.x < obs.x + obs.width &&
            player.x + player.width > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.height > obs.y
        ) {
            endGame();
        }

        if (obs.x + obs.width < 0) {
            obstacles.splice(index, 1);
            score++;
            document.getElementById("score").innerText = "Score: " + score;
        }
    });

    if (frame % 120 === 0) spawnObstacle();

    gameSpeed += 0.0005;
    frame++;
    requestAnimationFrame(update);
}

function endGame() {
    gameOver = true;
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText("Game Over 😢", 120, 180);
    ctx.fillText("Biryani Missed!", 110, 210);

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("biryaniHigh", highScore);
        document.getElementById("highScore").innerText = "High: " + highScore;
    }
}

function restartGame() {
    score = 0;
    obstacles = [];
    gameSpeed = 3;
    frame = 0;
    gameOver = false;
    document.getElementById("score").innerText = "Score: 0";
    update();
}

/* START */
update();
