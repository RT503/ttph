<template>
  <v-container class="elevation-10 px-md-15 px-sm-10" style="height: 100%;">
    <v-row>
      <v-col class="d-flex justify-center">
        <h1>При оплате на странице банка возникла ошибка</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-btn @click="$router.push('/')">в начало</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'home-title'
};
</script>
