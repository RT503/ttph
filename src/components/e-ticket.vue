<template>
  <!-- <v-card style="width: 40rem; height: 21rem; margin-left: auto; margin-right: auto; margin-top: 1rem"> -->
  <v-card>
    <v-card-title>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            {{ ticket.serviceName }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <div class="text-body-1">
              <v-icon v-if="ticket.state==16" class="mb-1 mr-2" color="success">mdi-check-circle</v-icon>
              <v-icon v-else  class="mb-1 mr-2" color="error">mdi-close-circle</v-icon>
              {{ ticket.stateName }}
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="text-body-1 float-sm-right">{{ formatStringDateTime(ticket.creationDate) }}</div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>
    <v-card-text class="d-flex justify-center">
      <vue-barcode :value="ticket.ticketId" />
    </v-card-text>
  </v-card>
</template>

<script>
import vueBarcode from 'vue-barcode';
import { formatStringDateTime } from '@/tools/format';

export default {
  name: 'e-ticket',

  components: { vueBarcode },

  props: {
    ticket: { type: Object, default: () => ({
      serviceName: null,
      stateName: null,
      state: null,
      creationDate: null,
      ticketId: null
    }) }
  },

  data () {
    return {
      formatStringDateTime: formatStringDateTime
    };
  }

};
</script>
