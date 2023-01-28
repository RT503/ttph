<template>
  <v-container class="d-flex flex-column align-center justify-space-between px-6 py-0" style="background-color: #F5F5F5">
      <v-form v-model="validForm" ref="form" class="my-5 d-flex flex-column" style="max-width: 312px">
        <v-container class="ml-0 pa-0 pl-2" style="width: 148px">
          <dlg-date-input :label="''" :value="date" @input="onDateInput" :min="minDate" :max="maxDate"/>
        </v-container>

        <catalog-item
            style=" width: 312px"
            class="mx-auto" v-for="(item, index) in catalog" :key="index" :value="item"
            @input="(value) => onCatalogItemInput(index, value)"/>
        <!--      <v-row>-->
        <!--        <v-col cols="12" class="py-4 d-flex justify-center">-->
        <!--          <v-subheader class="text-h4 text&#45;&#45;primary mx-0 px-0">Сумма к оплате: {{ sum }}</v-subheader>-->
        <!--        </v-col>-->
        <!--      </v-row>-->

        <v-btn v-if="catalog.length !== 0" class="button__w-312_h-52 mx-auto mt-8"
               :disabled="(!validForm) || (qnt <= 0)" color="primary" width="100%" @click="onBuyTickets" large style="">
          <!--            <v-icon class="mx-3">mdi-check-outline</v-icon>-->
          {{ buyCaption }}
        </v-btn>

      </v-form>
      <v-container class="pa-0" style="margin-top: 140px" v-if="catalog.length === 0">
          <p class="font-T1-semi-bold text-center">В каталоге пусто</p>
          <p class="font-ST1-regular text-center">Выберите другую дату</p>

      </v-container>

  </v-container>
</template>

<script>
import { MUTATION_CATALOG_ITEM_SET_QNT, MUTATION_VISIT_DATE_SET } from '@/store/const-mutations';
import catalogItem from '@/components/catalog-item.vue';
import dlgDateInput from '@/components/dlg-date-input.vue';
import { isoDate } from '@/tools/format';
import { ACTION_REFRESH_CATALOG } from '@/store/const-actions';

const dateNow = Date.now();

export default {
  components: { catalogItem, dlgDateInput },
  name: 'home-first',

  data: function () {
    const delta = this.$store.state.data.configuration.maxVisitDateDays;
    let maxDate = null;
    if (delta !== null) {
      const dateTo = new Date(dateNow);
      maxDate = isoDate(Number(dateTo.setDate(dateTo.getDate() + (delta || null))));
    }
    return {
      validForm: null,
      minDate: isoDate(dateNow),
      maxDate: maxDate
    };
  },

  computed: {
    catalog: (vm) => vm.$store.state.data.catalog.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)),

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

    buyCaption: () => ('Перейти к оформлению'), // (vm) => (vm.qnt === 1 ? 'Купить билет' : 'Купить билеты'),

    date: {
      get: (vm) => vm.$store.state.data.visitDate,
      set (value) {
        this.$store.commit(MUTATION_VISIT_DATE_SET, { visitDate: value });
      }
    }
  },

  methods: {
    onCatalogItemInput (index, value) {
      this.$store.commit(MUTATION_CATALOG_ITEM_SET_QNT, { index, qnt: value.qnt });
    },

    async onBuyTickets () {
      this.$emit('action', { action: 'buy-tickets' });
    },

    onDateInput (value) {
      this.date = value;
      this.$store.dispatch(ACTION_REFRESH_CATALOG);
    }
  }
};
</script>
