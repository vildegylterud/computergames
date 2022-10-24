
//creates the board as an array
//uses the function in App.vue

//import {ro} from "vuetify/lib/locale";

export const RowCount = 6
export const ColumnCount = 7
export const Yellow = 2
export const Red = 1
export const Empty = 0


function count(inputArray, item) {
    const map = inputArray.reduce((acc, key) =>
        acc.set(key, (acc.get(key) || 0) +1), new Map())
    return map.get(item) || 0

}

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


export function copyBoard(board) {
    let boardCopy = [...board]
    board.forEach((row, rowIndex) => {
        boardCopy[rowIndex] = [...row]
    })
    return boardCopy;
}

function getScore(section) {
    let score = 0
    if(count(section, Yellow) == 4) {
        score += 100
    }
    if(count(section, Yellow) == 3 && count(section, Empty) == 1) {
        score += 10
    }
    if(count(section, Yellow) == 2 && count(section, Empty) == 2) {
        score += 5
    }
    if(count(section, Red) == 3 && count(section, Empty) == 1) {
        score -= 80
    }
    return score
}

export function boardScore(board){
    let score = 0
    //score center column
    let centerColumnArray = []
    let centerColumn = Math.floor(ColumnCount / 2)
    for(let row = 0; row < RowCount; row++) {
        centerColumnArray.push(board[row][centerColumn])
    }
    let centerPieces = count(centerColumnArray, Yellow)
    score += centerPieces * 6
    //Score rows
    board.forEach(row => {
        for(let column; column < ColumnCount - 3; column++ ) {
            let section = row.slice(column, column + 4)
            score += getScore(section)
        }
    })
    //Score columns
    for(let column = 0; column < ColumnCount; column++) {
        let columnArray = []
        for(let row = RowCount - 1; row >= 0; row--) {
            columnArray.push(board[row][column])
        }
        for(let row = 0; row < RowCount - 3; row++) {
            let section = columnArray.slice(row, row + 4)
            score += getScore(section)
        }
    }
    //score upward diagonals
    for(let row = RowCount - 1; row >= RowCount - 3; row--) {
        for(let column = 0; column < ColumnCount - 3; column++) {
            let section = []
            for(let i = 0; i < 4; i++) {
                section.push(board[row - i][column + i])
            }
            score += getScore(section)
        }
    }
    //Score downward diagonals
    for(let row = 0; row < RowCount - 3; row++) {
        for(let column = 0; column < ColumnCount - 3; column++) {
            let section = []
            for(let i = 0; i < 4; i++) {
                section.push(board[row + i][column + i])
            }
            score += getScore(section)
        }
    }
    return score
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

export function getValidColumns(board) {
    let validColumns = []
    for(let column = 0; column < ColumnCount; column++ ) {
        if(isValidColumn(board, column)) {
            validColumns.push(column);
        }
    }
    return validColumns
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


