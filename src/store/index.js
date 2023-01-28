import Vue from 'vue';
import Vuex from 'vuex';

import progress from '@/store/module-progress';
import data from '@/store/module-data';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    progress,
    data
  }
});
