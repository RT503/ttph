<template>
  <v-container outlined fill-height class="align-content-start col-xl-5 col-lg-6" fluid>

    <v-row v-if="backUrl" class="mt-3">
      <v-col>
        <v-btn large color="primary" @click="onBack"><v-icon class="mr-2">mdi-keyboard-backspace</v-icon>Назад в личный кабинет</v-btn>
        <v-spacer />
      </v-col>
    </v-row>

    <v-row v-if="orderNo">
      <v-col class="d-flex justify-center">
        <v-subheader class="text-h5 text--primary">Заказ №{{ this.orderNo }}</v-subheader>
      </v-col>
    </v-row>

    <e-tickets v-if="!inPayProcess" />

    <e-items v-if="!inPayProcess" />

    <pay-progress v-if="inPayProcess" :showDialog="inPayProcess" />
    <gk-progress />
    <eticket-pdf-view ref="pdf" />
  </v-container>
</template>

<script>
import { ACTION_GET_ORDER } from '@/store/const-actions';
import { PROGRESS_STATE_ERROR } from '@/store/const-progress';
import payProgress from '@/components/pay-progress.vue';
import eticketPdfView from '@/views/eticket-pdf-view.vue';
import gkProgress from '@/components/gk-progress.vue';
import eTickets from '@/components/e-tickets.vue';
import eItems from '@/components/e-items.vue';

function timeout (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  name: 'eticket-view',

  components: { gkProgress, payProgress, eticketPdfView, eTickets, eItems },

  data () {
    return {
      inPayProcess: true
    };
  },

  async mounted () {
    // Если это не перезагрузка браузера, не грузим заказ
    const order = this.$store.state.data.order;
    if (order && order.orderId !== undefined && order.orderId !== null) 
      return;

    await this.loadOrder(this.$route.params.orderId);
  },

  computed: {
    error: (vm) => vm.$store.state.progress.state === PROGRESS_STATE_ERROR,

    order: (vm) => vm.$store.state.data.order.order,

    orderNo: (vm) => vm.order && vm.order.orderNo,

    backUrl: (vm) => vm.$store.state.data.configuration.backUrl
  },

  methods: {
    async loadOrder () {
      for (this.inPayProcess = true; this.inPayProcess;) {
        try {
          const getOrderResult = await this.$store.dispatch(ACTION_GET_ORDER, {
            orderId: this.$route.params.orderId,
            noProgress: true
          });
          this.inPayProcess = getOrderResult.data.inPaymentProcess;
          await timeout(1000);
        }
        catch (error) {
          break;
        }
      }
    },

    savePdf () {
      this.$refs['pdf'].savePdf(this.tickets);
    },

    onBack () {
      if (this.backUrl) 
        window.location = this.backUrl;
    }
  }
};
</script>
