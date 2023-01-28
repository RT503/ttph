import {
  ACTION_EMULATE_PAYMENT,
  ACTION_GET_CATALOG,
  ACTION_GET_CONFIGURATION,
  ACTION_GET_ORDER,
  ACTION_REFRESH_CATALOG,
  ACTION_REGISTER_BEGIN_PURCHASE
} from '@/store/const-actions.js';
import {
  MUTATION_CATALOG_SET,
  MUTATION_CONFIGURATION_SET,
  MUTATION_ORDER_SET
} from '@/store/const-mutations.js';
import {
  getDataForBeginPurchase,
  getEmptyOrder,
  throwInNotEnableConfiguration
} from '@/store/module-data-func.js';

import { api } from '@/api/api.js';
import { processActionAsync } from '@/store/process-action.js';
import token from '@/shared/token.js';
import { isoDate } from '@/tools/format';

export const actions = {

  async [ACTION_GET_CONFIGURATION] (context, payload) {
    const result = await api.configuration();

    context.commit(MUTATION_CONFIGURATION_SET, result.data);
    context.commit(MUTATION_ORDER_SET, getEmptyOrder());
  },

  async [ACTION_GET_CATALOG] (context, payload) {
    return await processActionAsync(context, payload, async function () {
      const result = await api.getCatalog(payload.posId, isoDate(context.state.visitDate));
      context.commit(MUTATION_CATALOG_SET, result.data.map(item => ({ ...item, qnt: 0 })));
      return result;
    });
  },

  async [ACTION_REFRESH_CATALOG] (context, payload) {
    return await processActionAsync(context, payload, async function () {
      const result = await api.getCatalog(context.state.configuration.posId, isoDate(context.state.visitDate));
      context.commit(MUTATION_CATALOG_SET, result.data.map(item => ({ ...item, qnt: 0 })));
      return result;
    });
  },

  async [ACTION_REGISTER_BEGIN_PURCHASE] (context, payload) {
    return await processActionAsync(context, payload, async function () {
      throwInNotEnableConfiguration(context);
      const dataForBeginPurchase = getDataForBeginPurchase(context);
      const result = await api.registerBeginPurchase(dataForBeginPurchase.data);
      // token.saveGkId(result.data.gkId);
      // Если это заглушка для отладки, перенаправляем на страницу заглушки
      // if (context.state.configuration.urlToPayService.toUpperCase() === 'DEBUG_DUMMY') {
      //   router.push(`/pay-service-emulation?gkId=${token.getGkId()}&amount=${dataForBeginPurchase.orderSum * 100}`);
      // }
      // else {
      const ref = `${result.data.url}`;
      window.location = ref;
      // }
    });
  },

  async [ACTION_EMULATE_PAYMENT] (context, payload) {
    return await processActionAsync(context, payload, async function () {
      const saleInfo = context.state.saleInfo;
      const sum = saleInfo.qnt * saleInfo.price;

      const result = await api.emulatePayment(token.getGkId(), sum * 100);
      context.commit(MUTATION_ORDER_SET, result.data);
    });
  },

  async [ACTION_GET_ORDER] (context, payload) {
    return await processActionAsync(context, payload, async function () {
      const orderId = payload.orderId ? payload.orderId : token.getGkId();

      const result = await api.getOrder(orderId);

      context.commit(MUTATION_ORDER_SET, result.data);

      return result;
    });
  }

};
