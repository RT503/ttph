import {
  getQueryString,
  http,
  throwIfError
} from '@/api/tools.js';

export const api = {

  configuration: async function () {
    const response = await http.get('api/configuration');
    throwIfError(response);
    return response.data;
  },

  registerBeginPurchase: async function (data) {
    const response = await http.post('api/register-begin-purchase', data);
    throwIfError(response);
    return response.data;
  },

  getCatalog: async function (posId, visitDate) {
    const queryString = getQueryString({ posId, visitDate });
    const response = await http.get(`api/catalog${queryString}`);
    throwIfError(response);
    return response.data;
  },

  emulatePayment: async function (saleId, amount) {
    const queryString = getQueryString({ cardNum: saleId, amount });
    const response = await http.post(`api/register-payment${queryString}`);
    throwIfError(response);
    return response.data;
  },

  getOrder: async function (orderId) {
    const queryString = getQueryString({ orderId });
    const response = await http.get(`api/get-order${queryString}`);
    throwIfError(response);
    return response.data;
  }
};

