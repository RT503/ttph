<template>
  <v-container>
    <v-container v-if="tickets.length == 0">
      <v-row>
        <v-col class="d-flex justify-center">
          <v-subheader class="text-h5 text--primary">нет билетов</v-subheader>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else class="elevation-10 px-md-15 px-sm-10" style="height: 100%">
      <v-row class="d-flex justify-center my-3">
        <e-ticket v-if="tickets.length === 1" :ticket="tickets[0]" style="width: 40rem; height: 21rem" />
        <v-carousel :continuous="false" v-else style="height: 26rem">
          <v-carousel-item v-for="(item, index) in tickets" :key="index">
            <e-ticket :ticket="item" style="width: 40rem; height: 21rem; margin-left: auto; margin-right: auto; margin-top: 1rem" />
          </v-carousel-item>
        </v-carousel>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="savePdf">Сохранить PDF</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import eTicket from '@/components/e-ticket.vue';

export default {
  name: 'e-tickets',

  components: { eTicket },

  computed: {
    order: (vm) => vm.$store.state.data.order.order,

    tickets: (vm) => (vm.order && vm.order.tickets) || []
  }
};
</script>
