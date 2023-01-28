import Vue from 'vue';
import app from './app.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
// import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';

// eslint-disable-next-line no-unused-vars
window.gkSettingsPhpUrl = 'http://81.94.140.194:8091';

Vue.config.productionTip = false;

Vue.use(VueTelInputVuetify, {
  vuetify
});
// Vue.use(VueTelInput, {
//   mode: 'international',
//   inputOptions: {
//     placeholder: '+70000000000'
//   },
//   dropdownOptions: {
//     showFlags: false,
//     showDialCodeInSelection: true
//   },
//   defaultCountry: 'RU',
//   preferredCountries: ['RU']
// });

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(app)
}).$mount('#app');
