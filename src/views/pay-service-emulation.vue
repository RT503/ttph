<template>
  <v-container class="px-md-15 px-sm-10" style="height: 100%">
    <v-row class="my-15">
      <v-col class="d-flex flex-row justify-center">
        <p class="text-h5 text--primary" align="center">Демонстрация оплаты</p>
      </v-col>
    </v-row>

    <v-row class="mb-15">
      <v-col class="d-flex flex-row justify-center">
        <v-btn color="success" @click="onSuccessBtn" large>Оплата прошла успешно</v-btn>
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col class="d-flex flex-row justify-center px-0">77
        <v-btn color="error" @click="onErrorBtn" large>Эмулировать ошибку оплаты</v-btn>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
import { ACTION_EMULATE_PAYMENT } from '@/store/const-actions';
export default {

  name: 'pay-service-emulation',

  methods: {
    onSuccessBtn () {
      this.$router.push('/payment-finish?result=success');
      this.$store.dispatch(ACTION_EMULATE_PAYMENT);
    },

    onErrorBtn () {
      this.$router.push('/payment-finish?result=error');
    }
  }

};
</script>
