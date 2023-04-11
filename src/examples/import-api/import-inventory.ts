import { importInventories } from '../../services/import-api/import-inventory';
import { log } from '../../utils/logger';

(async () => {
  try {
    // Import inventories
    const importInventoriesResponse = await importInventories('emm-import-container', {
      type: 'inventory',
      resources: [
        {
          key: 'inventory-import-key',
          sku: 'product-variant-sku',
          quantityOnStock: 15,
          restockableInDays: 2,
          expectedDelivery: '2022-06-30T14:00:00.000Z',
          supplyChannel: {
            typeId: 'channel',
            key: 'channel-key',
          },
          custom: {
            type: {
              typeId: 'type',
              key: 'custom-field-key',
            },
            fields: {
              theNameofTheInventoryCustomField: {
                type: 'LocalizedString',
                value: {
                  en: 'English text',
                  de: 'German text',
                },
              },
            },
          },
        },
      ],
    });
    log(importInventoriesResponse);
  } catch (error) {
    log(error);
  }
})();
