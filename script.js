const board = document.getElementById("board");
const rollBtn = document.getElementById("rollBtn");
const dice = document.getElementById("dice");
const youUI = document.getElementById("you");
const botUI = document.getElementById("bot");

let turn = "you";
let youPos = -1;
let botPos = -1;

/* SIMPLE REAL LUDO PATH (VISIBLE LOOP) */
const path = [
  7,8,9,10,11,
  26,41,56,71,86,
  101,102,103,104,105,
  90,75,60,45,30,
  15,14,13,12,11
];

/* CREATE BOARD */
for (let i = 0; i < 225; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.dataset.i = i;

  if (path.includes(i)) cell.classList.add("path");
  if (i < 30 && i % 15 < 5) cell.classList.add("red-home");
  if (i > 194 && i % 15 > 9) cell.classList.add("blue-home");
  if (i === 112) cell.classList.add("center");

  board.appendChild(cell);
}

/* ROLL */
rollBtn.onclick = () => {
  if (turn !== "you") return;

  const d = Math.floor(Math.random() * 6) + 1;
  dice.textContent = d;
  moveYou(d);
};

function moveYou(d) {
  if (youPos === -1 && d === 6) youPos = 0;
  else if (youPos >= 0) youPos += d;

  if (youPos >= path.length) {
    alert("YOU WIN 🎉");
    reset();
    return;
  }

  render();
  turn = "bot";
  switchUI();
  setTimeout(botMove, 800);
}

function botMove() {
  const d = Math.floor(Math.random() * 6) + 1;
  dice.textContent = d;

  if (botPos === -1 && d === 6) botPos = 0;
  else if (botPos >= 0) botPos += d;

  if (botPos >= path.length) {
    alert("BOT WINS 🤖");
    reset();
    return;
  }

  render();
  turn = "you";
  switchUI();
}

/* RENDER TOKENS */
function render() {
  document.querySelectorAll(".token").forEach(t => t.remove());

  place(youPos, "red");
  place(botPos, "blue");
}

function place(pos, color) {
  if (pos < 0) return;
  const cell = document.querySelector(`.cell[data-i="${path[pos]}"]`);
  if (!cell) return;

  const t = document.createElement("div");
  t.className = `token ${color}-token`;
  cell.appendChild(t);
}

/* TURN UI */
function switchUI() {
  youUI.classList.toggle("active", turn === "you");
  botUI.classList.toggle("active", turn === "bot");
}

/* RESET */
function reset() {
  youPos = -1;
  botPos = -1;
  turn = "you";
  dice.textContent = "🎲";
  render();
  switchUI();
}
