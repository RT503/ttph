import Vue from 'vue';
import VueRouter from 'vue-router';
import { ROUTE_GET_ORDER, ROUTE_HOME, ROUTE_PAYMENT_ERROR, ROUTE_PAYMENT_SERVICE_EMULATION } from './const-routes';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: ROUTE_HOME, component: () => import('@/views/home.vue') },
  { path: '/pay-service-emulation/', name: ROUTE_PAYMENT_SERVICE_EMULATION, component: () => import('@/views/pay-service-emulation.vue') },
  { path: '/order/:orderId', name: ROUTE_GET_ORDER, component: () => import('@/views/eticket-view.vue'), props: true },
  { path: '/payment-error/:orderId', name: ROUTE_PAYMENT_ERROR, component: () => import('@/views/payment-error.vue'), props: true }
  // { path: '/test', component: () => import('@/views/test-view.vue') }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
