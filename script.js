const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let gameOver = false;

/* PLATE */
const plate = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 50,
    width: 80,
    height: 15
};

/* BIRYANI */
let biryanis = [];
let frame = 0;

/* CONTROLS (TOUCH + MOUSE) */
canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    plate.x = e.clientX - rect.left - plate.width / 2;
});

canvas.addEventListener("touchmove", e => {
    const rect = canvas.getBoundingClientRect();
    plate.x = e.touches[0].clientX - rect.left - plate.width / 2;
});

/* SPAWN BIRYANI */
function spawnBiryani() {
    biryanis.push({
        x: Math.random() * (canvas.width - 30),
        y: -30,
        size: 30,
        speed: 2 + Math.random() * 2
    });
}

/* GAME LOOP */
function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* DRAW PLATE */
    ctx.fillStyle = "#636e72";
    ctx.fillRect(plate.x, plate.y, plate.width, plate.height);

    /* DRAW BIRYANIS */
    biryanis.forEach((b, index) => {
        b.y += b.speed;

        ctx.font = "28px Arial";
        ctx.fillText("🍲", b.x, b.y);

        /* CATCH */
        if (
            b.y + b.size > plate.y &&
            b.x > plate.x &&
            b.x < plate.x + plate.width
        ) {
            biryanis.splice(index, 1);
            score++;
            document.getElementById("score").innerText = "Score: " + score;
        }

        /* MISS */
        if (b.y > canvas.height) {
            endGame();
        }
    });

    if (frame % 60 === 0) spawnBiryani();

    frame++;
    requestAnimationFrame(update);
}

function endGame() {
    gameOver = true;
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Game Over 😢", 120, 200);
    ctx.fillText("Biryani Spilled!", 105, 230);
}

function restartGame() {
    score = 0;
    biryanis = [];
    frame = 0;
    gameOver = false;
    document.getElementById("score").innerText = "Score: 0";
    update();
}

/* START GAME */
update();
