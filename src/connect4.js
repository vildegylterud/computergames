//creates the board as an array
//uses the function in App.vue

const RowCount = 6;
const ColumnCount = 7;

export function createBoard() {
    let board = []
    for(let row = 0; row < 6; row++ ) {
        board.push([])
    }
    board.forEach(row => {
        for(let column = 0; column < 7; column++) {
            row.push(0)
        }
    })
    return board
}

//checks if the column is valid
export function isValidColumn(board, column) {
    return board[0][column] === 0
}

export function getOpenRow(board, column){
    for(let row = RowCount - 1; row >= 0; row--){
        if(board[row][column] === 0){
            return row
        }
    }
}

export function dropPiece(board, row, column, color) {
    board[row][column] = color
}

export function isWinningMove(board, color){
    //Check all the rows
    for(let c = 0; c < ColumnCount - 3; c++ ) {
        for(let r = 0; r < RowCount; r++) {
            if(
                board[r][c] === color &&
                board[r][c+1] === color &&
                board[r][c + 2] === color &&
                board[r][c + 3] === color

            ) {
                return true
            }
        }
    }
    //Check all columns
    for(let c = 0; c < ColumnCount; c++ ) {
        for(let r = RowCount - 1; r >= RowCount - 3; r--) {
            if(
                board[r][c] === color &&
                board[r - 1][c] === color &&
                board[r - 2][c] === color &&
                board[r - 3][c] === color

            ) {
                return true
            }
        }
    }
    //Check all upward diagonals
    for(let c = 0; c < ColumnCount - 3; c++ ) {
        for(let r = RowCount - 1; r >= RowCount - 3; r--) {
            if(
                board[r][c] === color &&
                board[r - 1][c + 1] === color &&
                board[r - 2][c + 2] === color &&
                board[r - 3][c + 3] === color

            ) {
                return true
            }
        }
    }
    //Check all downward diagonals
    for(let c = 0; c < ColumnCount - 3; c++ ) {
        for(let r = 0; r < RowCount - 3; r++) {
            if(
                board[r][c] === color &&
                board[r + 1][c + 1] === color &&
                board[r + 2][c + 2] === color &&
                board[r + 3][c + 3] === color

            ) {
                return true
            }
        }
    }
}


