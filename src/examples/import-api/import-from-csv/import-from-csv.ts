import { importProductTypes } from '../../../services/import-api/import-product-type';
import { importCategories } from '../../../services/import-api/import-category';
import { createImportContainer } from '../../../services/import-api/import-container';
import { getImportOperations } from '../../../services/import-api/import-operation';
import { getImportSummary } from '../../../services/import-api/import-summary';
import { importProductDrafts } from '../../../services/import-api/import-product-draft';
import { log } from '../../../utils/logger';
import { ProductDraftImport } from '@commercetools/importapi-sdk';
import csvtojsonV2 from 'csvtojson';

(async () => {
    try {
        const importContainerKey = 'emm-import-container';

        // Create an import container
        const createImportContainerResponse = await createImportContainer({
            key: importContainerKey,
        });
        log(createImportContainerResponse);

        // Import categories
        const importCategoriesResponse = await importCategories(importContainerKey, {
            type: 'category',
            resources: [
                {
                    key: 'import-category',
                    name: {
                        en: 'Import Category',
                    },
                    slug: {
                        en: 'import-category',
                    },
                    description: {
                        en: "Category's description",
                    },
                    orderHint: '0.05',
                    metaTitle: {
                        en: 'Import Category',
                    },
                    metaDescription: {
                        en: "Category's description",
                    },
                    metaKeywords: {
                        en: 'import',
                    },
                },
                {
                    key: 'import-category-2',
                    name: {
                        en: 'Import Category 2',
                    },
                    slug: {
                        en: 'import-category-2',
                    },
                    description: {
                        en: "Category's description",
                    },
                    orderHint: '0.05',
                    metaTitle: {
                        en: 'Import Category 2',
                    },
                    metaDescription: {
                        en: "Category's description",
                    },
                    metaKeywords: {
                        en: 'import',
                    },
                },
                {
                    key: 'import-category-3',
                    name: {
                        en: 'Import Category 3',
                    },
                    slug: {
                        en: 'import-category-3',
                    },
                    description: {
                        en: "Category's description",
                    },
                    orderHint: '0.05',
                    metaTitle: {
                        en: 'Import Category 3',
                    },
                    metaDescription: {
                        en: "Category's description",
                    },
                    metaKeywords: {
                        en: 'import',
                    },
                    parent: {
                        typeId: 'category',
                        key: 'import-category',
                    },
                },
            ],
        });
        log(importCategoriesResponse);

        // Import product types
        const importProductTypesResponse = await importProductTypes(importContainerKey, {
            type: 'product-type',
            resources: [
                {
                    key: 'import-product-type',
                    name: 'Import Product Type',
                    description: 'Product Type description',
                    attributes: [
                        {
                            isRequired: true,
                            name: 'boolean-attribute',
                            label: {
                                en: 'Boolean Attribute',
                            },
                            type: {
                                name: 'boolean',
                            },
                            isSearchable: true,
                        },
                        {
                            isRequired: true,
                            name: 'enum-attribute',
                            label: {
                                en: 'enum Attribute',
                            },
                            type: {
                                name: 'enum',
                                values: [
                                    { key: 'first-option', label: 'First Option' },
                                    { key: 'second-option', label: 'Second Option' },
                                ],
                            },
                            isSearchable: true,
                        },
                    ],
                },
            ],
        });
        log(importProductTypesResponse);

        // Get products data from csv
        const productsFromCSV = await csvtojsonV2().fromFile(__dirname + '/../../../assets/products.csv');

        const productFromCSVToProductDraftImport = (product: { [key: string]: string }): ProductDraftImport => {
            return {
                key: product.productName.toLowerCase().split(' ').join('-'),
                name: {
                    en: product.productName,
                },
                description: {
                    en: product.productDescription,
                },
                slug: {
                    en: product.productName.toLowerCase().split(' ').join('-'),
                },
                productType: {
                    typeId: 'product-type',
                    key: product.productType,
                },
                categories: product.categories.split(',').map((category) => ({
                    typeId: 'category',
                    key: category,
                })),
                masterVariant: {
                    key: product.productName.toLowerCase().split(' ').join('-') + '-' + product.sku.toLowerCase(),
                    sku: product.productName.toLowerCase().split(' ').join('-') + '-' + product.sku.toLowerCase(),
                    prices: [
                        {
                            value: {
                                type: 'centPrecision',
                                currencyCode: product.currencyCode,
                                centAmount: parseInt(product.basePrice, 10),
                            },
                        },
                    ],
                    images: product.images.split(',').map((image) => ({
                        url: image,
                        dimensions: { w: 1400, h: 1400 },
                    })),
                    attributes: [
                        {
                            name: 'boolean-attribute',
                            type: 'boolean',
                            value: product.booleanAttribute === 'true' ? true : false,
                        },
                        {
                            name: 'enum-attribute',
                            type: 'enum',
                            value: product.enumAttribute,
                        },
                    ],
                },
            };
        };

        // Import product drafts
        const importProductDraftsResponse = await importProductDrafts(importContainerKey, {
            type: 'product-draft',
            resources: productsFromCSV.map(productFromCSVToProductDraftImport),
        });
        log(importProductDraftsResponse);

        // Get import operations
        const getImportOperationsResponse = await getImportOperations(importContainerKey);
        log(getImportOperationsResponse);

        // Get an import summary
        const getImportSummaryResponse = await getImportSummary(importContainerKey);
        log(getImportSummaryResponse);
    } catch (error) {
        log(error);
    }
})();
