<template>
  <v-container>
    <v-container v-if="items.length == 0">
      <v-row>
        <v-col class="d-flex justify-center">
          <v-subheader class="text-h5 text--primary">нет пакетов</v-subheader>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else class="elevation-10 px-md-15 px-sm-10" style="height: 100%">
      <v-row class="d-flex justify-center my-3">
        <h4 v-for="(item, index) in items" :key="index">{{ item.productName }}</h4>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'e-items',

  computed: {
    order: (vm) => vm.$store.state.data.order.order,

    items: (vm) => (vm.order && vm.order.items) || []
  }
};
</script>
