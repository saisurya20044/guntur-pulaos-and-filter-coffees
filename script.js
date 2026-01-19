let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "🍗";
let gameActive = true;

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

function play(element, index) {
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    element.innerText = currentPlayer;

    if (checkWinner()) {
        document.getElementById("status").innerText =
            currentPlayer + " Wins! 🎉 Enjoy your Biryani!";
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        document.getElementById("status").innerText =
            "It's a Draw 😄 Biryani is almost ready!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "🍗" ? "🥗" : "🍗";
    document.getElementById("status").innerText =
        currentPlayer + " Turn";
}

function checkWinner() {
    return winPatterns.some(pattern =>
        pattern.every(i => board[i] === currentPlayer)
    );
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll(".box").forEach(box => box.innerText = "");
    currentPlayer = "🍗";
    gameActive = true;
    document.getElementById("status").innerText =
        "🍗 Chicken Biryani Turn";
}
