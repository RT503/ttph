<template>
  <v-dialog :value="showDialog" width="40rem">
    <v-card>
      <v-container>
          <v-row align-content="center" justify="center">
            <v-col class="text-h5 text-center">
              <p class="ma-0 mt-3">Подождите, идёт регистрация билетов</p>
            </v-col>
          </v-row>
          <v-row align-content="center" justify="center">
            <v-col>
              <v-progress-linear color="blue darken-2" indeterminate rounded height="20"></v-progress-linear>
            </v-col>
          </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'pay-progress',

  props: {
    showDialog: { type: Boolean, default: false }
  }

};
</script>
