import { importProductTypes } from '../../services/import-api/import-product-type';
import { log } from '../../utils/logger';

(async () => {
  try {
    // Import product types
    const importProductTypesResponse = await importProductTypes('emm-import-container', {
      type: 'product-type',
      resources: [
        {
          key: 'import-product-type',
          name: 'Import Product Type',
          description: 'Product Type description',
        },
      ],
    });
    log(importProductTypesResponse);
  } catch (error) {
    log(error);
  }
})();
