import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { rootApiClient } from '../../auth/root-api-client';

export const getCartById = (
  data: { cartId: string },
): Promise<ClientResponse<Cart>> => rootApiClient
  .carts()
  .withId({ ID: data.cartId })
  .get()
  .execute();

export const createCart = (
  data: { customerId?: string },
): Promise<ClientResponse<Cart>> => rootApiClient
  .carts()
  .post({
    body: {
      currency: 'USD',
      customerId: data.customerId || undefined,
    },
  })
  .execute();

export const addLineItemsToCart = async (data: {
  cartId: string;
  lineItems: Array<{
    productId: string;
    variantId: number;
    quantity: number;
  }>;
}): Promise<ClientResponse<Cart>> => {
  const cart = await getCartById({ cartId: data.cartId });

  return rootApiClient
    .carts()
    .withId({ ID: data.cartId })
    .post({
      body: {
        version: cart.body.version,
        actions: data.lineItems.map((lineItem) => ({
          action: 'addLineItem',
          productId: lineItem.productId,
          variantId: lineItem.variantId,
          quantity: lineItem.quantity,
          taxRate: {
            name: 'Florida',
            amount: 0.06,
            includedInPrice: false,
            country: 'US',
            state: 'Florida',
            id: 'lGs7dyyD',
            subRates: [],
          },
        })),
      },
    })
    .execute();
};

export const setShippingAddress = async (data: {
  cartId: string;
  address: {
    title: string;
    salutation: string;
    firstName: string;
    lastName: string;
    streetName: string;
    streetNumber: string;
    additionalStreetInfo: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
  };
}): Promise<ClientResponse<Cart>> => {
  const cart = await getCartById({ cartId: data.cartId });

  return rootApiClient
    .carts()
    .withId({ ID: data.cartId })
    .post({
      body: {
        version: cart.body.version,
        actions: [
          {
            action: 'setShippingAddress',
            address: {
              title: data.address.title,
              salutation: data.address.salutation,
              firstName: data.address.firstName,
              lastName: data.address.lastName,
              streetName: data.address.streetName,
              streetNumber: data.address.streetNumber,
              additionalStreetInfo: data.address.additionalStreetInfo,
              postalCode: data.address.postalCode,
              city: data.address.city,
              state: data.address.state,
              country: data.address.country,
            },
          },
        ],
      },
    })
    .execute();
};

export const setShippingMethod = async (data: {
  cartId: string;
  shippingMethodName: string;
  centAmount: number;
  taxCategoryId: string;
}): Promise<ClientResponse<Cart>> => {
  const cart = await getCartById({ cartId: data.cartId });

  return rootApiClient
    .carts()
    .withId({ ID: data.cartId })
    .post({
      body: {
        version: cart.body.version,
        actions: [
          {
            action: 'setCustomShippingMethod',
            shippingMethodName: data.shippingMethodName,
            shippingRate: {
              price: {
                currencyCode: 'USD',
                centAmount: data.centAmount,
              },
            },
            taxCategory: {
              typeId: 'tax-category',
              id: data.taxCategoryId,
            },
          },
        ],
      },
    })
    .execute();
};

export const addPaymentToCart = async (
  data: { cartId: string; paymentId: string },
): Promise<ClientResponse<Cart>> => {
  const cart = await getCartById({ cartId: data.cartId });

  return rootApiClient
    .carts()
    .withId({ ID: data.cartId })
    .post({
      body: {
        version: cart.body.version,
        actions: [
          {
            action: 'addPayment',
            payment: {
              typeId: 'payment',
              id: data.paymentId,
            },
          },
        ],
      },
    })
    .execute();
};
