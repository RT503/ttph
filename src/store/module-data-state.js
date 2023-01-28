import { getEmptyOrder } from '@/store/module-data-func.js';

export const state = {
  configuration: {
    urlToPayService: null,
    maxVisitDateDays: null,
    backUrl: null,
    posId: null
  },
  order: {
    ...getEmptyOrder()
  },
  phone: null,
  catalog: [
    { name: '11:00-13:00 Посещение катка. Взрослый', price: 400, qnt: 0 },
    { name: '11:00-13:00 Посещение катка. Взрослый', price: 400, qnt: 0 },
    { name: '11:00-13:00 Посещение катка. Взрослый', price: 400, qnt: 0 },
    { name: '11:00-13:00 Посещение катка. Взрослый', price: 400, qnt: 0 }
  ],
  visitDate: new Date()
};
