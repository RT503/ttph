import {
  MUTATION_CATALOG_ITEM_SET_QNT,
  MUTATION_CATALOG_SET,
  MUTATION_CONFIGURATION_SET,
  MUTATION_ORDER_SET,
  MUTATION_PHONE_SET,
  MUTATION_VISIT_DATE_SET
} from '@/store/const-mutations';

export const mutations = {
  [MUTATION_CONFIGURATION_SET] (state, payload) {
    state.configuration = Object.assign({}, state.configuration, payload);
  },

  [MUTATION_PHONE_SET] (state, payload) {
    state.phone = payload.phone;
  },

  [MUTATION_ORDER_SET] (state, payload) {
    state.order = Object.assign({}, state.order, payload);
  },

  [MUTATION_CATALOG_SET] (state, payload) {
    state.catalog = payload;
  },

  [MUTATION_CATALOG_ITEM_SET_QNT] (state, payload) {
    state.catalog[payload.index].qnt = payload.qnt;
  },

  [MUTATION_VISIT_DATE_SET] (state, payload) {
    state.visitDate = payload.visitDate;
  }
};
