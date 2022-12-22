import { importProductDrafts } from '../../services/import-api/import-product-draft';
import { log } from '../../utils/logger';

(async () => {
    try {
        // Import product drafts
        const importProductDraftsResponse = await importProductDrafts('emm-import-container', {
            type: 'product-draft',
            resources: [
                {
                    key: 'import-product-draft',
                    name: {
                        en: 'Import Product Draft',
                    },
                    slug: {
                        en: 'import-product-draft',
                    },
                    productType: {
                        typeId: 'product-type',
                        key: 'import-product-type',
                    },
                    masterVariant: {
                        key: 'master-variant-key',
                        prices: [
                            {
                                value: {
                                    centAmount: 1000,
                                    currencyCode: 'USD',
                                    type: 'centPrecision',
                                },
                            },
                        ],
                    },
                    categories: [{ typeId: 'category', key: 'import-category' }],
                    description: { en: 'Import Product Draft description' },
                    variants: [
                        {
                            key: 'variant-key',
                            prices: [
                                {
                                    value: {
                                        centAmount: 1500,
                                        currencyCode: 'USD',
                                        type: 'centPrecision',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        log(importProductDraftsResponse);
    } catch (error) {
        log(error);
    }
})();
