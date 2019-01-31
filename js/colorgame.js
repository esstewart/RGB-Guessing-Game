
let boardColors = [];
let squares, correctColor;
let msg = document.querySelector("#message");
let board = document.querySelector("#gameboard");
let txtCorrectColor = document.getElementById("correctcolor");
let btnGameControl = document.getElementById("gamecontrol");
let btnEasyMode = document.getElementById("easymode");
let btnMediumMode = document.getElementById("mediummode");
let btnHardMode = document.getElementById('hardmode');
let titlebar = document.getElementById('titlebar');

// default difficulty mode is medium
btnMediumMode.classList.add('selected');
let difficulty = 6;

setGameControls();
startGame(difficulty);

function setGameControls () {
    btnGameControl.addEventListener("click", function() {
        startGame(difficulty);
    });
    btnEasyMode.addEventListener("click", function() {
        btnEasyMode.classList.add('selected');
        btnMediumMode.classList.remove('selected');
        btnHardMode.classList.remove('selected');
        difficulty = 3;
        startGame(difficulty);
    });
    btnMediumMode.addEventListener("click", function() {
        btnEasyMode.classList.remove('selected');
        btnMediumMode.classList.add('selected');
        btnHardMode.classList.remove('selected');
        difficulty = 6;
        startGame(difficulty);
    });
    btnHardMode.addEventListener("click", function() {
        btnEasyMode.classList.remove('selected');
        btnMediumMode.classList.remove('selected');
        btnHardMode.classList.add('selected');
        difficulty = 9;
        startGame(difficulty);
    })
};

function startGame(num) {
    console.log("Starting new game...");
    console.log(`Difficulty of ${num}`);
    btnGameControl.textContent = "NEW COLORS";
    message.textContent = "Good luck!";
    board.innerHTML = "";   // remove all squares from the board
    boardColors.length = 0; // set board colors to 0
    titlebar.style.backgroundColor = "steelblue";
    generateBoard(num);
}

function winGame() {
    titlebar.style.backgroundColor = correctColor;
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = correctColor;
    }
    btnGameControl.textContent = "PLAY AGAIN?";
}

function generateBoard(num) {
    console.log("Generating new board...");
    console.log(`Generating ${num} squares...`);
    // set game board size based on difficulty
    if (num < 4) {
        board.style.maxWidth = "1200px";
    } else if (num < 7) {
        board.style.maxWidth = "800px";
    } else {
        board.style.maxWidth = "500px";
    }
    
    // generate new squares and randomize a color for each square
    for (let i = 0; i < num; i++) {
        board.innerHTML = `${board.innerHTML}
        <div class="square"></div>`;
        boardColors.push(getRandomColor());
        console.log(`Adding square ${i}...`);
    }
    
    // pick from the available colors the color we are trying to guess
    randSquare = Math.floor(Math.random() * num);
    correctColor = boardColors[randSquare];
    txtCorrectColor.textContent = correctColor;
    console.log(`The correct color is ${correctColor} which is on square ${randSquare + 1}`);
    
    // assign the random colors to the board squares
    squares = document.querySelectorAll(".square");
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.background = boardColors[i];
        console.log(`Square ${i} has color ${boardColors[i]}...`);
        // add event handler to this square
        squares[i].addEventListener("click", function() {
            if (this.style.backgroundColor === correctColor) {
                msg.textContent = "Correct!";
                winGame();
            } else {
                this.style.backgroundColor = "#232323";
                msg.textContent = "Try again!";
            }
        });
    }
}

function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}