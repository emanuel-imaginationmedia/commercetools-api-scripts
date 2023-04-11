import {
  createCart, addLineItemsToCart, setShippingAddress, setShippingMethod, addPaymentToCart,
} from '../../services/root-api/cart';
import { createOrderFromCart } from '../../services/root-api/order';
import { createPayment } from '../../services/root-api/payment';
import { log } from '../../utils/logger';

(async () => {
  const cart = (
    await createCart({
      customerId: 'f91ac83c-4075-439f-a996-9c779181fbf9',
    })
  ).body;

  await addLineItemsToCart({
    cartId: cart.id,
    lineItems: [
      {
        productId: 'ffbc4327-6095-4100-9fad-616bb305dfc6',
        variantId: 1,
        quantity: 1,
      },
    ],
  });

  await setShippingAddress({
    cartId: cart.id,
    address: {
      title: 'My Address',
      salutation: 'Mr.',
      firstName: 'Jon',
      lastName: 'Doe',
      streetName: 'S FEDERAL HWY',
      streetNumber: '1515',
      additionalStreetInfo: 'suite 304',
      postalCode: '33432',
      city: 'Boca Raton',
      state: 'FL',
      country: 'US',
    },
  });

  await setShippingMethod({
    cartId: cart.id,
    shippingMethodName: 'FedEx Overnight',
    centAmount: 4200,
    taxCategoryId: '766fc549-a21f-433d-9f4f-5950e5d9868f',
  });

  const payment = (
    await createPayment({
      interfaceId: 'interfaceId',
      amountPlanned: 5083,
      paymentMethodInfo: {
        paymentInterface: 'STRIPE',
        method: 'CREDIT_CARD',
        name: 'Credit Card',
      },
      transactions: [
        {
          timestamp: new Date().toISOString(),
          type: 'Authorization',
          amount: 5083,
          state: 'Pending',
        },
      ],
    })
  ).body;

  await addPaymentToCart({
    cartId: cart.id,
    paymentId: payment.id,
  });

  const order = (
    await createOrderFromCart({
      cartId: cart.id,
    })
  ).body;

  log(`cart: ${cart.id}`);
  log(`payment: ${payment.id}`);
  log(`order: ${order.id}`);
})();
