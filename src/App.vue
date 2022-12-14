<template>
<div id = "app">
  <h2 v-show="!gameOver" id="header">Player <span v-if="turn === player1" >1</span><span v-else>2</span></h2>
  <h2 v-show="gameOver">The winner is Player <span v-if="turn === player1">1</span><span v-else>2</span>!</h2>

  <div class="wrapper">
  <div class="board">
    <div
        v-for="(column, columnIndex) in board[0]"
        :key=" 'col-' + columnIndex"
        :style="{left: columnIndex * 50 + 'px'}"
        class="column"
        @click="takeTurn(columnIndex)"
    ></div>
    <div class="row" v-for="(row, rowIndex) in board" :key="rowIndex">
      <svg v-for="(column, columnIndex) in row"
      :key="columnIndex"
      width="50" height="50">
        <circle :id="'circle-' + rowIndex + '-' + columnIndex" :class="{empty: column === 0, red: column === 1, yellow: column === 2}" cx="25" cy="25" r="20"/>
      </svg>
    </div>
  </div>
  </div>
  <button type="button" v-show="gameOver" class="newGame" @click="resetBoard()">Reset board!</button>

</div>
</template>

<script>
function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms))
}

function highlightPieces(pieces){
  pieces.forEach(piece => {
    document.getElementById('circle-' + piece.row + '-' + piece.col).classlist.add('flash')
  });
}

import * as connect4 from '@/connect4.js'

export default {
  name: 'App',  
  data() {
    return {
      board: [],
      turn: 0,
      player1: 0,
      player2: 1,
      red: connect4.Red,
      yellow: connect4.Yellow,
      empty: connect4.Yellow,
      gameOver: false,

    };
  },
  methods: {
    resetBoard() {
      this.board = connect4.createBoard();
      this.gameOver = false
      this.turn = this.player1;
      console.log("new game button is clicked")
    },
    selectBestColumn() {
      let validColumns = connect4.getValidColumns(this.board);
      let highestScore = -1000
      let column = Math.floor(Math.random * validColumns.length)
      for (let i = 0; i < validColumns.length; i++) {
        let newColumn = validColumns[i]
        let row = connect4.getOpenRow(this.board, newColumn)
        let boardCopy = connect4.copyBoard(this.board)
        connect4.dropPiece(boardCopy, row.valueOf(), newColumn.valueOf(), this.yellow.valueOf())
        let newScore = connect4.boardScore(boardCopy)
        if (newScore > highestScore) {
          highestScore = newScore;
          column = newColumn;
        }
      }
      return column;
    },
    takeTurn(column) {
      if (!this.gameOver && connect4.isValidColumn(this.board, column) && this.turn == this.player1) {
        let row = connect4.getOpenRow(this.board, column)
        let color = this.turn === this.player1 ? this.red : this.yellow
        connect4.dropPiece(this.board, row.valueOf(), column.valueOf(), color.valueOf())
        if (connect4.isWinningMove(this.board, color)) {
          this.gameOver = true;
        } else {
          this.turn += 1
          this.turn = this.turn % 2
          sleep(1000).then(() => {
            this.AITurn()
          })
          
        }
      }
    },

    AITurn() {
      //let column = this.selectBestColumn()
      let result = connect4.minimax(this.board, 5, -Infinity, Infinity, true)
      let column = result.column;
      let row = connect4.getOpenRow(this.board, column)
      connect4.dropPiece(this.board, row, column, this.yellow) //AI will always be player 2 == yellow
      if (connect4.isWinningMove(this.board, this.yellow)) {
        this.gameOver = true
      } else {
        this.turn += 1
        this.turn = this.turn % 2
      }
    }
  },
  created() {
    this.board = connect4.createBoard()
  },
  updated(){
    if(this.gameOver){
      let color = this.turn === this.player1 ? this.red : this.yellow;
      let pieces = connect4.getWinningPieces(this.board, color)
      highlightPieces(pieces)
    }
  },
   components: {
  },

}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.dropPiece {
  background-color: white;
  color: black;
  border: 1px solid #555; /* Green */
  padding: 8px 10px;
}

.board {
padding-top: 30px;
}

.row{
  display: flex;
  background-color: #0f55ff;

}
.dropPiece:hover {background-color: lightgrey}

#header{
  padding-bottom: 15px;
}
.inputField{
  background-color: white;
  color: black;
  border: 1px solid #555;
  padding: 8px 10px;
}

.wrapper{
  display: flex;
  justify-content: center;
}

circle.empty {
  fill: white;

}
circle.red {
  fill: #d50000;
}

circle.yellow {
  fill: #dad400;
}

.column{
  position: absolute;
  top: 0;
  width: 50px;
  height: 100%;
  background-color: transparent;
  transition: background-color 0.1s ease-in-out;
}

.column:hover{
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.2);
}

.board{
  position: relative;
}

.newGame{
  border: 1px solid rgba(27, 31, 35, 0.15); margin-top: 20px;
  border-radius: 6px;
  padding: 6px 16px;
  color: #24292E;
  cursor: pointer;
  position: relative;
  vertical-align: middle;

}


.newGame:hover {
  background-color: #F3F4F6;
  text-decoration: none;
  transition-duration: 0.1s;
}

circle.red.flash{
  animation: puls-red 1.2s ease-in-out infinite 
}
circle.yellow.flash{
  animation: puls-yellow 1.2s ease-in-out infinite 
}

@keyframes pulse-red {
  0%{
    fill: #d50000;
  }
  50%{
    fill: #ff8f8f;
  }
  100%{
    fill: #d50000;
  }
}

@keyframes pulse-yellow {
  0%{
    fill: #dad400;
  }
  50%{
    fill: #fffdab;
  }
  100%{
    fill: #dad400;
  }

}
</style>
