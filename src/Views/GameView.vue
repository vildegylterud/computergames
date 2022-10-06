<template>
  <v-container>
    <v-col cols="6">
    <GameBoard></GameBoard>
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
