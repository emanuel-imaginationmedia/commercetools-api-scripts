import { importOrders } from '../../services/import-api/import-order';
import { log } from '../../utils/logger';

(async () => {
  try {
    // Import orders
    const importOrdersResponse = await importOrders('emm-import-container', {
      type: 'order',
      resources: [
        {
          orderNumber: 'test-order-number',
          customer: {
            typeId: 'customer',
            key: 'order-customer-key',
          },
          customerEmail: 'customer-email@example.com',
          shippingInfo: {
            shippingMethodName: 'string-name',
            price: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 300,
            },
            shippingRate: {
              price: {
                type: 'centPrecision',
                currencyCode: 'EUR',
                centAmount: 3,
              },
              tiers: [],
            },
            deliveries: [
              {
                id: '4ce24c27-cce5-447c-890e-0d6b70b690ba',
                createdAt: '2021-04-30T09:21:15.003Z',
                items: [
                  {
                    id: '95a6e7a7-b74e-4397-b0b4-37473d2e3573',
                    quantity: 4,
                  },
                ],
                parcels: [
                  {
                    id: '98840afa-ac20-4a34-a904-88d3407e2d76',
                    createdAt: '2021-04-30T09:21:15.003Z',
                    measurements: {
                      heightInMillimeter: 20,
                      lengthInMillimeter: 40,
                      widthInMillimeter: 5,
                      weightInGram: 10,
                    },
                  },
                ],
              },
            ],
          },
          lineItems: [
            {
              name: {
                en: 'abc',
              },
              quantity: 10,
              price: {
                value: {
                  type: 'centPrecision',
                  centAmount: 100,
                  currencyCode: 'EUR',
                },
              },
              supplyChannel: {
                typeId: 'channel',
                key: 'supplier-channel-key',
              },
              variant: {
                productVariant: {
                  typeId: 'product-variant',
                  key: 'product-key',
                },
                sku: 'variant-sku',
                attributes: [],
                images: [],
                prices: [],
              },
            },
          ],
          customLineItems: [
            {
              name: {
                en: 'name',
              },
              totalPrice: {
                type: 'centPrecision',
                centAmount: 123,
                currencyCode: 'EUR',
              },
              state: [
                {
                  quantity: 10,
                  state: {
                    key: 'state-key',
                    typeId: 'state',
                  },
                },
              ],
              money: {
                type: 'centPrecision',
                centAmount: 123,
                currencyCode: 'EUR',
              },
              quantity: 10,
              slug: 'my-slug',
              taxCategory: {
                typeId: 'tax-category',
                key: 'tax-category-key',
              },
              discountedPricePerQuantity: [
                {
                  value: {
                    type: 'centPrecision',
                    centAmount: 123,
                    currencyCode: 'EUR',
                  },
                  includedDiscounts: [
                    {
                      discountedAmount: {
                        type: 'centPrecision',
                        centAmount: 123,
                        currencyCode: 'EUR',
                      },
                      discount: {
                        typeId: 'cart-discount',
                        key: 'cart-discount-key',
                      },
                    },
                  ],
                },
              ],
            },
          ],
          customerGroup: {
            typeId: 'customer-group',
            key: 'customer-group-key',
          },
          totalPrice: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 4200,
          },
        },
      ],
    });
    log(importOrdersResponse);
  } catch (error) {
    log(error);
  }
})();
