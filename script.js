const youToken = document.getElementById("youToken");
const botToken = document.getElementById("botToken");
const dice = document.getElementById("dice");

/* SAFE PATH INSIDE BOARD */
const path = [
  {x:150,y:30},{x:190,y:30},{x:230,y:30},
  {x:230,y:70},{x:230,y:110},{x:230,y:150},
  {x:190,y:150},{x:150,y:150},{x:110,y:150},
  {x:110,y:110},{x:110,y:70},{x:110,y:30}
];

let youPos = 0;
let botPos = 0;
let turn = "YOU";

update();

function rollDice() {
  if (turn !== "YOU") return;

  let roll = Math.floor(Math.random() * 6) + 1;
  dice.innerText = roll;

  youPos = (youPos + roll) % path.length;
  update();

  turn = "BOT";
  setTimeout(botTurn, 800);
}

function botTurn() {
  let roll = Math.floor(Math.random() * 6) + 1;
  dice.innerText = roll;

  botPos = (botPos + roll) % path.length;
  update();

  turn = "YOU";
}

function update() {
  youToken.style.left = path[youPos].x + "px";
  youToken.style.top  = path[youPos].y + "px";

  botToken.style.left = path[botPos].x + "px";
  botToken.style.top  = path[botPos].y + "px";
}
