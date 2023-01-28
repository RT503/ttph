<template>
  <v-container outlined class="pa-0 d-flex flex-column" style="background-color: #F5F5F5; ">
    <component :is="component" @action="onAction" v-bind="componentProps" style="min-height: calc(100vh - 468px)"> </component>
    <gk-footer/>

    <gk-progress />

  </v-container>
</template>

<script>
import gkProgress from '@/components/gk-progress.vue';
import homeTitle from './home-title.vue';
import homeUserInfo from './home-user-info.vue';
import homeCatalog from './home-catalog.vue';
import homeCheckout from '@/views/home-checkout.vue';
import {
  ACTION_GET_CATALOG,
  ACTION_REGISTER_BEGIN_PURCHASE
} from '@/store/const-actions';
import { MUTATION_CONFIGURATION_SET } from '@/store/const-mutations';
import GkFooter from '@/components/gk-footer.vue';

export default {
  name: 'home',

  components: { GkFooter, gkProgress, homeTitle, homeUserInfo, homeCatalog, homeCheckout },

  data: function () {
    return {
      component: homeCatalog,
      componentProps: null
    };
  },

  mounted: async function () {
    const queryString = window.location.search;
    const params = new Proxy(new URLSearchParams(queryString), {
      get: (searchParams, prop) => searchParams.get(prop)
    });

    const posId = params.posId;
    const backUrl = params.backurl;

    this.$store.commit(MUTATION_CONFIGURATION_SET, { backUrl, posId });

    await this.$store.dispatch(ACTION_GET_CATALOG, { posId });

    this.component = homeCatalog;
  },

  methods: {
    async onAction (payload) {
      switch (this.component) {
        case homeCatalog:
          if (payload.action === 'buy-tickets') {
            this.component = homeCheckout;
          }
          break;
        case homeCheckout:
          if (payload.action === 'complete-order') {
            this.component = homeUserInfo;
            await this.$store.dispatch(ACTION_REGISTER_BEGIN_PURCHASE);
            break;
          }
          if (payload.action === 'go-back') {
            this.component = homeCatalog;
            break;
          }
          this.component = homeTitle;
          break;
        case homeUserInfo:
          if (payload.action === 'back') {
            this.component = homeCatalog;
            return;
          }
          await this.$store.dispatch(ACTION_REGISTER_BEGIN_PURCHASE);
          break;
      }
    }
  }
};
</script>
