import { importProducts } from '../../services/import-api/import-product';
import { log } from '../../utils/logger';

(async () => {
    try {
        // Import products
        const importProductsResponse = await importProducts('emm-import-container', {
            type: 'product',
            resources: [
                {
                    key: 'import-product',
                    name: {
                        en: 'Import Product',
                    },
                    slug: {
                        en: 'import-product',
                    },
                    productType: {
                        typeId: 'product-type',
                        key: 'import-product-type',
                    },
                    categories: [{ typeId: 'category', key: 'import-category' }],
                    description: { en: 'Import Product description' },
                },
            ],
        });
        log(importProductsResponse);
    } catch (error) {
        log(error);
    }
})();
