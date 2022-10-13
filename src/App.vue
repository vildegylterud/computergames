<template>
<div id = "app">
  <h4>Player <span v-if="turn === player1">1</span><span v-else>2</span></h4>
  <input class="inputField" type="text" name="column" v-model="column">
  <button class="dropPiece" @click=takeTurn()>Drop Piece</button>

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

    };
  },
  methods: {
    takeTurn() {
      if (connect4.isValidColumn(this.board, this.column)){
        let row = connect4.getOpenRow(this.board, this.column)
        //color red will be defined as 1 and yellow 2
        let color = this.turn === this.player1 ? this.red : this.yellow
        connect4.dropPiece((this.board, row, this.column, color))
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
  border: 2px solid #4CAF50; /* Green */

}
.dropPiece:hover {background-color: #3e8e41}

.inputField{
  background-color: white;
  color: black;
  border: 2px solid #4CAF50; /* Green */
}
</style>
