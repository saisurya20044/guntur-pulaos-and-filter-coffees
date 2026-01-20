const rollBtn = document.getElementById("rollBtn");
const dice = document.getElementById("dice");
const youToken = document.getElementById("youToken");
const botToken = document.getElementById("botToken");
const youUI = document.getElementById("you");
const botUI = document.getElementById("bot");

let turn = "you";
let youPos = -1;
let botPos = -1;

const path = [
  {x:10,y:160},{x:40,y:160},{x:70,y:160},{x:100,y:160},{x:130,y:160},
  {x:160,y:160},{x:160,y:130},{x:160,y:100},{x:160,y:70},{x:160,y:40},
  {x:130,y:40},{x:100,y:40},{x:70,y:40},{x:40,y:40},{x:10,y:40}
];

rollBtn.onclick = () => {
  if (turn !== "you") return;

  const d = rollDice();
  moveYou(d);
};

function rollDice() {
  const d = Math.floor(Math.random() * 6) + 1;
  dice.textContent = d;
  return d;
}

function moveYou(d) {
  if (youPos === -1 && d === 6) youPos = 0;
  else if (youPos >= 0) youPos += d;

  if (youPos >= path.length) {
    winGame();
    return;
  }

  updateTokens();
  switchTurn();
  setTimeout(botMove, 800);
}

function botMove() {
  const d = rollDice();

  if (botPos === -1 && d === 6) botPos = 0;
  else if (botPos >= 0) botPos += d;

  if (botPos >= path.length) {
    alert("BOT WINS 🤖");
    resetGame();
    return;
  }

  updateTokens();
  switchTurn();
}

function updateTokens() {
  if (youPos >= 0) {
    youToken.style.left = path[youPos].x + "px";
    youToken.style.top = path[youPos].y + "px";
  }
  if (botPos >= 0) {
    botToken.style.left = path[botPos].x + "px";
    botToken.style.top = path[botPos].y + "px";
  }
}

function switchTurn() {
  turn = turn === "you" ? "bot" : "you";
  youUI.classList.toggle("active", turn === "you");
  botUI.classList.toggle("active", turn === "bot");
}

function winGame() {
  alert("🎉 YOU WIN!");
  const code = "BIRYANI" + Math.floor(1000 + Math.random() * 9000);

  document.getElementById("couponCode").textContent = code;
  document.getElementById("coupon").classList.remove("hidden");
  document.getElementById("whatsapp").href =
    "https://wa.me/91XXXXXXXXXX?text=I%20won%20coupon%20" + code;

  resetGame();
}

function resetGame() {
  youPos = -1;
  botPos = -1;
  turn = "you";
  dice.textContent = "🎲";
  updateTokens();
  switchTurn();
}
