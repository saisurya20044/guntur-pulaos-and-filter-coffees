const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let highScore = localStorage.getItem("biryaniHigh") || 0;
let gameOver = false;
let frame = 0;

document.getElementById("high").innerText = "High: " + highScore;

/* SOUNDS (optional) */
const sCatch = new Audio("catch.mp3");
const sBomb = new Audio("bomb.mp3");
const sOver = new Audio("gameover.mp3");

/* PLATE */
const plate = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 45,
    w: 80,
    h: 14
};

/* ITEMS */
let items = [];
let particles = [];
let lastCatch = 0;

/* CONTROLS */
function movePlate(x) {
    const r = canvas.getBoundingClientRect();
    plate.x = x - r.left - plate.w / 2;
}

canvas.addEventListener("mousemove", e => movePlate(e.clientX));
canvas.addEventListener("touchmove", e => movePlate(e.touches[0].clientX));

/* SPAWN */
function spawnItem() {
    items.push({
        x: Math.random() * (canvas.width - 30),
        y: -30,
        speed: 2 + Math.random() * 2,
        type: Math.random() < 0.15 ? "bomb" : "biryani"
    });
}

/* PARTICLES */
function explode(x, y, color) {
    for (let i = 0; i < 10; i++) {
        particles.push({
            x, y,
            dx: (Math.random() - 0.5) * 4,
            dy: (Math.random() - 0.5) * 4,
            life: 20,
            color
        });
    }
}

/* LOOP */
function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* PLATE */
    ctx.fillStyle = "#636e72";
    ctx.fillRect(plate.x, plate.y, plate.w, plate.h);

    /* ITEMS */
    items.forEach((it, i) => {
        it.y += it.speed;
        ctx.font = "28px Arial";
        ctx.fillText(it.type === "biryani" ? "🍲" : "💣", it.x, it.y);

        if (
            it.y > plate.y &&
            it.x > plate.x &&
            it.x < plate.x + plate.w
        ) {
            items.splice(i, 1);

            if (it.type === "bomb") {
                sBomb.play();
                explode(it.x, it.y, "red");
                endGame();
            } else {
                sCatch.play();
                explode(it.x, it.y, "orange");
                const now = Date.now();
                score += (now - lastCatch < 700) ? 2 : 1;
                lastCatch = now;
                document.getElementById("score").innerText = "Score: " + score;
            }
        }

        if (it.y > canvas.height) items.splice(i, 1);
    });

    /* PARTICLES */
    particles.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 4, 4);
        if (p.life <= 0) particles.splice(i, 1);
    });

    if (frame % 50 === 0) spawnItem();
    frame++;
    requestAnimationFrame(update);
}

function endGame() {
    gameOver = true;
    sOver.play();

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("biryaniHigh", highScore);
        document.getElementById("high").innerText = "High: " + highScore;
    }

    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText("Game Over 😢", 120, 210);
}

function restartGame() {
    score = 0;
    items = [];
    particles = [];
    frame = 0;
    gameOver = false;
    document.getElementById("score").innerText = "Score: 0";
    update();
}

function toggleNight() {
    document.body.classList.toggle("night");
}

/* START */
update();
