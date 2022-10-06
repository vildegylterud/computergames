<template>
  <v-container>
    <v-footer>This game is made by {{names}}</v-footer>
  </v-container>
  <div class="game">
    <GameBoard></GameBoard>
  </div>
</template>

<script>
import GameBoard from "@/components/GameBoard";
export default {
  name: 'GameComponent',
  components: {GameBoard},
  props: {
    msg: String,
  },

  data() {
    return {
        names: "eksempelnavn",
    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
