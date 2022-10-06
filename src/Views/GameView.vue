<template>
  <v-container>
    <v-col cols="2">
    <div class="align-center">

    <v-footer>This game is made by {{names}}</v-footer>
    <GameBoard></GameBoard>

    </div>
    </v-col>
  </v-container>
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
</style>
