const dice = document.getElementById("dice");
const turnText = document.getElementById("turnText");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const coupon = document.getElementById("coupon");

/* SIMPLE COMMON PATH (24 steps) */
const path = [
  {x:20,y:20},{x:60,y:20},{x:100,y:20},{x:140,y:20},{x:180,y:20},{x:220,y:20},
  {x:220,y:60},{x:220,y:100},{x:220,y:140},{x:220,y:180},
  {x:180,y:180},{x:140,y:180},{x:100,y:180},{x:60,y:180},{x:20,y:180},
  {x:20,y:140},{x:20,y:100},{x:20,y:60},
  {x:60,y:60},{x:100,y:60},{x:140,y:60},{x:180,y:60},
  {x:180,y:100},{x:180,y:140}
];

let turn = "YOU";
let diceValue = 0;

/* TOKENS */
let you = [
  {pos:-1, el:y0},{pos:-1, el:y1},{pos:-1, el:y2},{pos:-1, el:y3}
];
let bot = [
  {pos:-1, el:b0},{pos:-1, el:b1},{pos:-1, el:b2},{pos:-1, el:b3}
];

placeHomes();

function rollDice(){
  if(turn !== "YOU") return;
  diceValue = Math.floor(Math.random()*6)+1;
  dice.innerText = diceValue;
  movePlayer(you, bot, "YOU");
}

function movePlayer(player, enemy, who){
  let token = player.find(t => t.pos >= 0) || player[0];

  if(token.pos === -1){
    if(diceValue === 6){
      token.pos = 0;
    } else {
      endTurn();
      return;
    }
  } else {
    token.pos += diceValue;
    if(token.pos >= path.length){
      win(who);
      return;
    }
  }

  // KILL LOGIC
  enemy.forEach(e=>{
    if(e.pos === token.pos){
      e.pos = -1;
    }
  });

  updateTokens();
  endTurn();
}

function endTurn(){
  turn = turn === "YOU" ? "BOT" : "YOU";
  turnText.innerText = turn + " TURN";

  if(turn === "BOT"){
    setTimeout(()=>{
      diceValue = Math.floor(Math.random()*6)+1;
      dice.innerText = diceValue;
      movePlayer(bot, you, "BOT");
    },1000);
  }
}

function updateTokens(){
  you.forEach((t,i)=>{
    if(t.pos >= 0){
      t.el.style.left = path[t.pos].x+"px";
      t.el.style.top  = path[t.pos].y+"px";
    } else {
      t.el.style.left = "10px";
      t.el.style.top  = (10+i*18)+"px";
    }
  });

  bot.forEach((t,i)=>{
    if(t.pos >= 0){
      t.el.style.left = path[t.pos].x+"px";
      t.el.style.top  = path[t.pos].y+"px";
    } else {
      t.el.style.left = "290px";
      t.el.style.top  = (10+i*18)+"px";
    }
  });
}

function placeHomes(){
  updateTokens();
}

function win(who){
  popup.style.display="flex";
  if(who==="YOU"){
    popupText.innerText="🎉 YOU WON!";
    coupon.innerText="Coupon: BIRYANI50";
  } else {
    popupText.innerText="BOT WON 😅";
    coupon.innerText="Try again!";
  }
}
