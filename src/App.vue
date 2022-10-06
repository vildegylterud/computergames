<template>
  <v-app>
    <v-main>
      <GameView/>
    </v-main>
  </v-app>
</template>

<script>
import GameView from './Views/GameView.vue'

export default {
  name: 'App',

  components: {
    GameView,
  },

  data: () => ({
    //
  }),
}
</script>
