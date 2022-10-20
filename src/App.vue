<template>
<div id = "app">
  <h2 id="header">Player <span v-if="turn === player1">1</span><span v-else>2</span></h2>
  <input class="inputField" type="text" name="column" v-model="column">
  <button class="dropPiece" @click=takeTurn()>Drop Piece</button>

  <div class="wrapper">
  <div class="board">
    <div class="row" v-for="(row, rowIndex) in board" :key="rowIndex">
      <svg v-for="(column, columnIndex) in row"
      :key="columnIndex"
      width="50" height="50">
        <circle :class="{empty: column == 0, red: column == 1, yellow: column == 2}" cx="25" cy="25" r="20"/>
      </svg>
    </div>
    </div>
  </div>
</div>
</template>

<script>
import * as connect4 from '@/connect4.js'

export default {
  name: 'App',
  data() {
    return {
      board: [],
      turn: 0,
      column: 0,
      player1: 0,
      player2: 1,
      red: 1,
      yellow: 2,
      empty: 0,

    };
  },
  methods: {
    takeTurn() {
      if (connect4.isValidColumn(this.board, this.column)){
        let row = connect4.getOpenRow(this.board, this.column)
        //color red will be defined as 1 and yellow 2
        let color = this.turn === this.player1 ? this.red : this.yellow
        connect4.dropPiece(this.board, row.valueOf(), this.column.valueOf(), color.valueOf())

        console.log(this.board)

        this.turn += 1
        this.turn = this.turn % 2
      }
    }
  },
  created() {
    this.board = connect4.createBoard()
    console.log(this.board)
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
</style>
