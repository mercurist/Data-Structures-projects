var arr = [[], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}

function initializeTemp(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            temp[i][j] = false;

        }
    }
}


function setTemp(board, temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                temp[i][j] = true;
            }

        }
    }
}


function setColor(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = "#DC3545";
            }

        }
    }
}

function resetColor() {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {

            arr[i][j].style.color = "green";


        }
    }
}

var board = [[], [], [], [], [], [], [], [], []]


let button = document.getElementById('generate-sudoku')
let solve = document.getElementById('solve')

console.log(arr)
function changeBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {

                arr[i][j].innerText = board[i][j];
            }

            else
                arr[i][j].innerText = '';
        }
    }
}


button.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}

// you can make a call to changeboard(board) function to update the state on the screen
function solveSudokuHelper(board, r, c) {

    //base case 
    // when you have solved all the rows from 0 to 8, the sudoku has been solved!
    if (r == 9) {
        changeBoard(board);
        return true;
    }
    //other cases - write your code here
    if (c == 9)
        return solveSudokuHelper(board, r + 1, 0);

    // if the block has already been assigned some value, don't tinker with that value
    if (board[r][c] != 0)
        return solveSudokuHelper(board, r, c + 1);

    for (var i = 1; i <= 9; i++) {

        if (isConfigurationSafe(board, r, c, i)) {
            board[r][c] = i;
            var result = solveSudokuHelper(board, r, c + 1);
            if (result) {
                return true;
            }
            // backtracking step
            board[r][c] = 0;
        }

    }
    return false;
    //finish your code here

}

function isConfigurationSafe(board, r, c, no) {
    for (let i = 0; i < 9; i++) {
        if (board[i][c] == no || board[r][i] == no) {
            return false;
        }
    }

    // check in the blocks
    // var r_block = r / 3;
    // var c_block = c / 3;
    // for (var i = 3 * r_block; i <= 3 * r_block + 2; i++) {
    //     for (var j = 3 * c_block; j <= 3 * c_block + 2; j++) {
    //         if (board[i][j] == no) {
    //             return false;
    //         }
    //     }
    // }

    var sx = r - r % 3;
    var sy = c - c % 3;

    for (var x = sx; x < sx + 3; x++) {
        for (var y = sy; y < sy + 3; y++) {
            if (board[x][y] == no) {
                return false;
            }
        }
    }


    return true;
}

function solveSudoku(board) {
    solveSudokuHelper(board, 0, 0);
}


solve.onclick = function () {
    solveSudoku(board)
}