const you = document.getElementById("you");
const bot = document.getElementById("bot");
const diceEl = document.getElementById("dice");
const status = document.getElementById("status");

/* MANUALLY MAPPED WHITE PATH (fits your image) */
const path = [
  {x:150,y:20}, {x:150,y:50}, {x:150,y:80}, {x:150,y:110},
  {x:150,y:140}, {x:150,y:170}, {x:150,y:200},
  {x:180,y:200}, {x:210,y:200}, {x:240,y:200},
  {x:240,y:170}, {x:240,y:140}, {x:240,y:110},
  {x:240,y:80},  {x:240,y:50},  {x:240,y:20},
  {x:210,y:20},  {x:180,y:20},
  {x:180,y:80},  {x:180,y:110}, {x:180,y:140}
];

let youPos = 0;
let botPos = 0;
let turn = "YOU";

updateTokens();

function rollDice() {
  if (turn !== "YOU") return;

  const roll = Math.floor(Math.random() * 6) + 1;
  diceEl.innerText = roll;
  moveToken("YOU", roll);
}

function moveToken(player, steps) {
  if (player === "YOU") {
    youPos += steps;
    if (youPos >= path.length - 1) {
      win("YOU");
      return;
    }
    updateTokens();
    turn = "BOT";
    status.innerText = "Bot is playing...";
    setTimeout(botTurn, 800);
  }
}

function botTurn() {
  const roll = Math.floor(Math.random() * 6) + 1;
  diceEl.innerText = roll;
  botPos += roll;

  if (botPos >= path.length - 1) {
    win("BOT");
    return;
  }

  updateTokens();
  turn = "YOU";
  status.innerText = "Your turn";
}

function updateTokens() {
  you.style.left = path[youPos].x + "px";
  you.style.top  = path[youPos].y + "px";

  bot.style.left = (path[botPos].x + 12) + "px";
  bot.style.top  = path[botPos].y + "px";
}

function win(who) {
  status.innerText =
    who === "YOU"
      ? "🎉 You reached the center! You win!"
      : "🤖 Bot reached the center!";
}
