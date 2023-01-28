import { isoLocalDateTime } from '@/tools/format';

export function getEmptyOrder () {
  return {
    orderId: null,
    tickets: []
  };
}

export function throwInNotEnableConfiguration (context) {
  if (!context.state.configuration.urlToPayService) {
    const err = { errors: [{ text: 'Не задана настройка urlToPayService' }] };
    throw err;
  }
}

export function getDataForBeginPurchase (context) {
  const order = (position, productId, quantity, price) => ({ position, productId, quantity, price });
  const orderFiltered = [];
  let iterator = 0;
  let orderSum = 0;
  context.state.catalog.forEach(element => {
    if (element.qnt > 0) {
      orderSum += element.qnt * element.price;
      orderFiltered.push(order(iterator, element.productId, element.qnt, element.price));
      iterator++;
    }
  });
  const result = {
    data: {
      order: [...orderFiltered],
      phone: context.state.phone,
      visitDate: isoLocalDateTime(context.state.visitDate).slice(0, -1)
    },
    orderSum };
  return result;
}
