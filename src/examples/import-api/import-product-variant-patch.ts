import { importProductVariantPatches } from '../../services/import-api/import-product-variant-patch';
import { log } from '../../utils/logger';

(async () => {
  try {
    // Import product variant patches
    const importProductVariantPatchesResponse = await importProductVariantPatches('emm-import-container', {
      type: 'product-variant-patch',
      patches: [
        {
          productVariant: {
            typeId: 'product-variant',
            key: 'import-product-variant',
          },
          attributes: {
            'attribute-to-update': {
              type: 'boolean',
              value: true,
            },
            'name-of-attribute-to-delete': null,
            'name-of-localized-attribute-to-update': {
              type: 'ltext',
              value: {
                en: 'Existing field',
              },
            },
            'name-of-localized-attribute-set-to-update': {
              type: 'ltext-set',
              value: [
                {
                  en: 'Existing field',
                },
                {
                  en: 'Another Existing field',
                },
              ],
            },
          },
          staged: false,
        },
      ],
    });
    log(importProductVariantPatchesResponse);
  } catch (error) {
    log(error);
  }
})();
