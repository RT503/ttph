<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { ACTION_GET_CONFIGURATION } from './store/const-actions';

export default {
  name: 'app',

  data: () => ({
  }),

  async created () {
    await this.$store.dispatch(ACTION_GET_CONFIGURATION);
  }
};
</script>

<style lang="scss">
  @import url("../src/assets/scss/main.scss");
  @import url("../src/assets/scss/style.scss");
</style>
