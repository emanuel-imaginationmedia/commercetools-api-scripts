import { importProductVariants } from '../../services/import-api/import-product-variant';
import { log } from '../../utils/logger';

(async () => {
  try {
    // Import product variants
    const importProductVariantsResponse = await importProductVariants('emm-import-container', {
      type: 'product-variant',
      resources: [
        {
          key: 'import-product-variant',
          sku: 'import-product-variant',
          product: {
            typeId: 'product',
            key: 'import-product',
          },
          isMasterVariant: false,
          images: [
            {
              url: 'https://picsum.photos/1400/1400?grayscale',
              dimensions: {
                w: 1400,
                h: 1400,
              },
              label: 'Placeholder image',
            },
          ],
        },
      ],
    });
    log(importProductVariantsResponse);
  } catch (error) {
    log(error);
  }
})();
