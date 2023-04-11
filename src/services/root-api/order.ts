import { ClientResponse, Order } from '@commercetools/platform-sdk';
import { rootApiClient } from '../../auth/root-api-client';
import { getCartById } from './cart';

export const createOrderFromCart = async (
  data: { cartId: string },
): Promise<ClientResponse<Order>> => {
  const cart = await getCartById({ cartId: data.cartId });

  return rootApiClient
    .orders()
    .post({
      body: {
        version: cart.body.version,
        cart: { id: data.cartId, typeId: 'cart' },
      },
    })
    .execute();
};
