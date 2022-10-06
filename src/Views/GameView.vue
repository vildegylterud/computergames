<template>
  <v-container>
  <v-col cols="12">
  <div class="align-center text-center justify-center w-100 d-flex">
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
