import { importEmbeddedPrices } from '../../services/import-api/import-embedded-price';
import { log } from '../../utils/logger';

(async () => {
  try {
    // Import embedded prices
    const importEmbeddedPricesResponse = await importEmbeddedPrices('emm-import-container', {
      type: 'price',
      resources: [
        {
          key: 'bigPriceKeyTestCat',
          country: 'DE',
          validFrom: '2021-04-11T14:00:00.000Z',
          validUntil: '2022-04-11T14:00:00.000Z',
          customerGroup: {
            typeId: 'customer-group',
            key: 'customer-group-key',
          },
          channel: {
            typeId: 'channel',
            key: 'channel-key',
          },
          discounted: {
            value: {
              type: 'centPrecision',
              currencyCode: 'EUR',
              centAmount: 251,
            },
            discount: {
              typeId: 'product-discount',
              key: 'product-discount-key',
            },
          },
          tiers: [
            {
              minimumQuantity: 5,
              value: {
                type: 'centPrecision',
                currencyCode: 'EUR',
                centAmount: 80,
              },
            },
          ],
          productVariant: {
            typeId: 'product-variant',
            key: 'red-t-shirt',
          },
          product: {
            typeId: 'product',
            key: 't-shirt',
          },
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 300,
          },
          custom: {
            type: {
              typeId: 'type',
              key: 'custom-type',
            },
            fields: {
              customFieldName: {
                type: 'String',
                value: 'customFieldValue',
              },
            },
          },
        },
        {
          key: 'bigPriceKeyTestCat',
          country: 'DE',
          validFrom: '2021-04-11T14:00:00.000Z',
          validUntil: '2022-04-11T14:00:00.000Z',
          discounted: {
            value: {
              type: 'highPrecision',
              fractionDigits: 3,
              preciseAmount: 2513,
              currencyCode: 'EUR',
              centAmount: 1234,
            },
            discount: {
              typeId: 'product-discount',
              key: 'product-discount-key',
            },
          },
          tiers: [
            {
              minimumQuantity: 5,
              value: {
                type: 'centPrecision',
                currencyCode: 'EUR',
                centAmount: 80,
              },
            },
          ],
          productVariant: {
            typeId: 'product-variant',
            key: 'red-t-shirt',
          },
          product: {
            typeId: 'product',
            key: 't-shirt',
          },
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 300,
          },
        },
      ],
    });
    log(importEmbeddedPricesResponse);
  } catch (error) {
    log(error);
  }
})();
