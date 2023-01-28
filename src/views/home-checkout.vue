<template>
  <v-container class="pa-0 d-flex flex-column align-center justify-center" style="max-width: 312px">
    <v-container class="pa-0 mt-4 d-flex justify-space-between align-center">
      <v-btn class="pa-0" :ripple="false"
             @click="onGoBack"
             color="textSecondary" text>
        <v-icon class="pr-1">$iconArrowLeft</v-icon>
        <!--          <v-icon class="pr-1">$iconArrowLeft</v-icon>-->
        Билеты
      </v-btn>
      <v-card-text>Оформление</v-card-text>
      <v-btn :ripple="false"
             color="error" text>
        <!--          <v-icon class="pr-1">$iconArrowLeft</v-icon>-->
        Удалить всё
      </v-btn>
    </v-container>
    <p class="ma-0 align-self-end">1/2</p>
    <v-progress-linear style="max-width: 312px;" value="50"></v-progress-linear>

    <catalog-item
        style=" width: 312px"
        class="mx-auto" v-for="(item, index) in catalog" :key="index" :value="item"
        @input="(value) => onCatalogItemInput(index, value)"
    />

    <v-card class="mt-4 elevation-0" style="width: 312px; border-radius: 16px;">
      <v-card-title class="d-flex pa-0 px-4 mb-2">
        <v-subheader class="pa-0 font-ST3-semi-bold">Вы выбрали </v-subheader>
        <v-subheader class="pa-0 font-ST3-semi-bold ml-auto">{{ qnt }}{{buyCaption}}</v-subheader>
      </v-card-title>

      <v-card-title class="d-flex pa-0 px-4 mb-2">

        <v-subheader class="pa-0 font-ST3-semi-bold">К оплате</v-subheader>
        <v-subheader class="pa-0 font-ST3-semi-bold ml-auto">{{ sum }} &#8381;</v-subheader>
      </v-card-title>
      <v-card-text>

      </v-card-text>
    </v-card>
    <v-row class="align-center pt-10">
      <v-col class="my-0 py-0 d-flex justify-center">

        <v-btn class="button__w-312_h-52"
            color="primary" @click="onBuyTickets" large style="">
          <!--            <v-icon class="mx-3">mdi-check-outline</v-icon>-->
          Продолжить
        </v-btn>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>

import catalogItem from '@/components/catalog-item.vue';
import { MUTATION_CATALOG_ITEM_SET_QNT } from '@/store/const-mutations';

export default {
  components: { catalogItem },
  name: 'home-checkout',

  computed: {
    catalog: (vm) => vm.$store.state.data.catalog, // .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)),

    sum: (vm) => {
      const result = vm.catalog.reduce((sum, current) => {
        return sum + current.qnt * current.price;
      }, 0);
      return result;
    },
    qnt: (vm) => {
      const result = vm.catalog.reduce((sum, current) => {
        return sum + current.qnt;
      }, 0);
      return result;
    },
    buyCaption: (vm) => (vm.qnt === 1 ? ' услугу' : ' услуги')

  },

  methods: {
    async onBuyTickets () {
      this.$emit('action', { action: 'complete-order' });
    },
    async onGoBack () {
      this.$emit('action', { action: 'go-back' });
    },
    onCatalogItemInput (index, value) {
      this.$store.commit(MUTATION_CATALOG_ITEM_SET_QNT, { index, qnt: value.qnt });
    }
  }
};
</script>
