//creates the board as an array
//uses the function in App.vue

const RowCount = 6;

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