const dice = document.getElementById("dice");
const rollBtn = document.getElementById("rollBtn");
const youUI = document.getElementById("you");
const botUI = document.getElementById("bot");
const playerToken = document.getElementById("playerToken");
const botToken = document.getElementById("botToken");

/* COUPON */
const COUPON_KEY = "ultimateLudoCoupon";

/* GAME STATE */
let turn = "player";
let diceValue = 0;

/* PATH */
const path = [
    {x:20,y:230},{x:60,y:230},{x:100,y:230},{x:140,y:230},{x:180,y:230},
    {x:220,y:230},{x:260,y:230},{x:260,y:190},{x:260,y:150},{x:260,y:110},
    {x:260,y:70},{x:220,y:70},{x:180,y:70},{x:140,y:70},{x:100,y:70},
    {x:60,y:70},{x:20,y:70},{x:20,y:110},{x:20,y:150},{x:20,y:190}
];

const SAFE_CELLS = [0,4,8,12,16];

let playerPos = -1;
let botPos = -1;

/* ROLL */
rollBtn.onclick = () => {
    if (turn !== "player") return;
    rollDice();
    move("player");
};

function rollDice() {
    diceValue = Math.floor(Math.random() * 6) + 1;
    dice.innerText = diceValue;
}

/* MOVE */
function move(who) {
    let pos = who === "player" ? playerPos : botPos;

    if (pos === -1 && diceValue === 6) pos = 0;
    else if (pos >= 0) pos += diceValue;

    if (pos >= path.length) {
        if (who === "player") {
            alert("🎉 YOU WIN! Coupon unlocked!");
            unlockCoupon();
        } else {
            alert("🤖 BOT WINS!");
        }
        resetGame();
        return;
    }

    animateMove(who, pos);
}

/* ANIMATION */
function animateMove(who, target) {
    let current = who === "player" ? playerPos : botPos;
    let token = who === "player" ? playerToken : botToken;

    function step() {
        current++;
        token.style.left = path[current].x + "px";
        token.style.top = path[current].y + "px";

        if (current < target) {
            setTimeout(step, 200);
        } else {
            if (who === "player") playerPos = current;
            else botPos = current;

            checkKill();
            switchTurn();
        }
    }
    step();
}

/* BOT */
function botPlay() {
    rollDice();
    move("bot");
}

/* KILL */
function checkKill() {
    if (
        playerPos === botPos &&
        playerPos !== -1 &&
        !SAFE_CELLS.includes(playerPos)
    ) {
        if (turn === "player") botPos = -1;
        else playerPos = -1;
    }
}

/* TURN */
function switchTurn() {
    if (turn === "player") {
        turn = "bot";
        youUI.classList.remove("active");
        botUI.classList.add("active");
        setTimeout(botPlay, 1000);
    } else {
        turn = "player";
        botUI.classList.remove("active");
        youUI.classList.add("active");
    }
}

/* COUPON */
function generateCoupon() {
    return "BIRYANI" + Math.floor(1000 + Math.random() * 9000);
}

function unlockCoupon() {
    if (localStorage.getItem(COUPON_KEY)) return;

    const code = generateCoupon();
    localStorage.setItem(COUPON_KEY, code);

    document.getElementById("couponCode").innerText = code;
    document.getElementById("couponBox").classList.remove("hidden");
    document.getElementById("orderBtn").href =
        "https://wa.me/91XXXXXXXXXX?text=I%20won%20coupon%20" + code;
}

/* RESET */
function resetGame() {
    playerPos = -1;
    botPos = -1;
    turn = "player";
    dice.innerText = "🎲";
    youUI.classList.add("active");
    botUI.classList.remove("active");
}
