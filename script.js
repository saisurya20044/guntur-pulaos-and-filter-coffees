const redToken = document.getElementById("redToken");
const blueToken = document.getElementById("blueToken");
const diceUI = document.getElementById("dice");

/*
  OFFICIAL OUTER PATH (SIMPLIFIED)
  Each entry = exact % position on board image
  YOU CAN ADJUST VALUES if your image is different
*/
const PATH = [
  { top: 72, left: 12 },
  { top: 72, left: 18 },
  { top: 72, left: 24 },
  { top: 72, left: 30 },
  { top: 72, left: 36 },
  { top: 66, left: 36 },
  { top: 60, left: 36 },
  { top: 54, left: 36 },
  { top: 48, left: 36 },
  { top: 42, left: 36 },
  { top: 36, left: 36 },
  { top: 36, left: 30 },
  { top: 36, left: 24 },
  { top: 36, left: 18 },
  { top: 36, left: 12 }
];

let redPos = -1;
let bluePos = -1;
let turn = "red";

function rollDice() {
  const d = Math.floor(Math.random() * 6) + 1;
  diceUI.innerText = d;

  if (turn === "red") {
    moveToken("red", d);
    turn = "blue";
    setTimeout(() => {
      const bd = Math.floor(Math.random() * 6) + 1;
      diceUI.innerText = bd;
      moveToken("blue", bd);
      turn = "red";
    }, 800);
  }
}

function moveToken(color, dice) {
  let pos = color === "red" ? redPos : bluePos;

  if (pos === -1 && dice === 6) pos = 0;
  else if (pos >= 0) pos += dice;

  if (pos >= PATH.length) pos = PATH.length - 1;

  const coord = PATH[pos];
  const token = color === "red" ? redToken : blueToken;

  token.style.top = coord.top + "%";
  token.style.left = coord.left + "%";

  if (color === "red") redPos = pos;
  else bluePos = pos;
}
