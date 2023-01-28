<template>
  <v-card class="mt-4 elevation-0" style="border-radius: 16px;">
    <v-card-title class="d-flex pa-0 px-4 mb-2">
      <v-subheader class="pa-0 font-ST3-semi-bold">{{ value.name }}</v-subheader>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-container cols="6" class="pt-0 pb-2 d-flex justify-space-between align-center">
<!--          <div class="w-3rem"></div>-->
          <v-subheader class="font-ST3-semi-bold mx-0 px-0 justify-center">{{ value.price }} &#8381;</v-subheader>

          <v-btn color="primary" v-if="value.qnt === 0" @click="onIncBtn" class="btn px-0"><p class="ma-0 px-7 font-ST2-semi-bold">Выбрать</p></v-btn>

          <v-col v-if="value.qnt !== 0" class="pa-0 d-flex justify-end align-center">
              <v-btn class="btn btn-square" @click="onDecBtn" :disabled="disableDecBtn"><v-icon small>mdi-minus</v-icon></v-btn>
              <v-subheader class="font-ST3-semi-bold mx-0 px-0 justify-center subheader w-3rem">{{ value.qnt }}</v-subheader>
              <v-btn class="btn btn-square" @click="onIncBtn" :disabled="disableIncBtn"><v-icon small>mdi-plus</v-icon></v-btn>
          </v-col>

        </v-container>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'catalog-item',

  props: {
    value: { type: Object, default: () => ({ id: null, name: null, price: 0, qnt: 0 }) }
  },
  computed: {
    disableDecBtn () {
      return this.saleInfoQnt <= 1;
    },

    disableIncBtn () {
      return this.saleInfoQnt >= 9;
    }
  },
  methods: {
    onDecBtn () {
      if (this.value.qnt > 0) {
        const newValue = { ...this.value };
        newValue.qnt -= 1;
        this.$emit('input', newValue);
      }
    },
    onIncBtn () {
      if (this.value.qnt < 10) {
        const newValue = { ...this.value };
        newValue.qnt += 1;
        this.$emit('input', newValue);
      }
    }
  }
};
</script>

<style scoped>
.btn-square {
  width: 32px !important;
  min-width: 32px !important;
  height: 32px !important;
  min-height: 32px !important;
}
.w-3rem {
  width: 2rem !important;
  min-width: 2rem !important;
}
</style>
