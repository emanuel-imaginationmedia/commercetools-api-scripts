import { importStandalonePrices } from '../../services/import-api/import-standalone-price';
import { log } from '../../utils/logger';

(async () => {
  try {
    // Import standalone prices
    const importStandalonePricesResponse = await importStandalonePrices('emm-import-container', {
      type: 'standalone-price',
      resources: [
        {
          key: 'priceKey',
          sku: 'variantSku',
          value: {
            type: 'centPrecision',
            currencyCode: 'EUR',
            centAmount: 100,
          },
        },
      ],
    });
    log(importStandalonePricesResponse);
  } catch (error) {
    log(error);
  }
})();
