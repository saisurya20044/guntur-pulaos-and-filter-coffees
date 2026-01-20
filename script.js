const board = document.getElementById("board");
const rollBtn = document.getElementById("rollBtn");
const dice = document.getElementById("dice");
const youUI = document.getElementById("you");
const botUI = document.getElementById("bot");

let turn = "you";

/* 4 TOKENS EACH */
let youTokens = [-1, -1, -1, -1];
let botTokens = [-1, -1, -1, -1];

/* OFFICIAL OUTER PATH (52 simplified indexes) */
const path = [
  6,7,8,9,10,11,
  26,41,56,71,86,101,
  102,103,104,105,106,107,
  92,77,62,47,32,17,
  16,15,14,13,12,11,
  26,41,56,71,86,101,
  100,99,98,97,96,95,
  80,65,50,35,20,5
];

/* CREATE BOARD */
for (let i = 0; i < 225; i++) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.dataset.i = i;

  if (path.includes(i)) cell.classList.add("path");
  if (i < 30 && i % 15 < 5) cell.classList.add("red-home");
  if (i > 194 && i % 15 > 9) cell.classList.add("blue-home");

  board.appendChild(cell);
}

/* ROLL */
rollBtn.onclick = () => {
  const d = Math.floor(Math.random() * 6) + 1;
  dice.textContent = d;

  if (turn === "you") {
    moveToken(youTokens, d);
    turn = "bot";
    switchUI();
    setTimeout(() => {
      const bd = Math.floor(Math.random() * 6) + 1;
      dice.textContent = bd;
      moveToken(botTokens, bd);
      turn = "you";
      switchUI();
    }, 900);
  }
};

/* MOVE ONE TOKEN (SIMPLE AI: FIRST POSSIBLE) */
function moveToken(tokens, diceVal) {
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === -1 && diceVal === 6) {
      tokens[i] = 0;
      render();
      return;
    }
    if (tokens[i] >= 0) {
      tokens[i] += diceVal;
      if (tokens[i] >= path.length) tokens[i] = path.length - 1;
      render();
      return;
    }
  }
}

/* RENDER ALL TOKENS */
function render() {
  document.querySelectorAll(".token").forEach(t => t.remove());

  drawTokens(youTokens, "red");
  drawTokens(botTokens, "blue");
}

function drawTokens(tokens, color) {
  const positions = {};

  tokens.forEach(pos => {
    if (pos >= 0) {
      const cellIndex = path[pos];
      if (!positions[cellIndex]) positions[cellIndex] = [];
      positions[cellIndex].push(color);
    }
  });

  Object.keys(positions).forEach(cellIndex => {
    const cell = document.querySelector(`.cell[data-i="${cellIndex}"]`);
    positions[cellIndex].forEach((color, i) => {
      const t = document.createElement("div");
      t.className = `token ${color}-token t${i+1}`;
      cell.appendChild(t);
    });
  });
}

/* TURN UI */
function switchUI() {
  youUI.classList.toggle("active", turn === "you");
  botUI.classList.toggle("active", turn === "bot");
        }
