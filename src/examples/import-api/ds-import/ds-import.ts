import { createImportContainer } from '../../../services/import-api/import-container';
import { getImportOperations } from '../../../services/import-api/import-operation';
import { getImportSummary } from '../../../services/import-api/import-summary';
import { importProductDrafts } from '../../../services/import-api/import-product-draft';
import { log } from '../../../utils/logger';
import { getProductDraftsFromCSV } from './get-product-drafts-from-csv';

(async () => {
    try {
        const importContainerKey = 'ds-import-container';

        // Create an import container
        const createImportContainerResponse = await createImportContainer({
            key: importContainerKey,
        });
        log(createImportContainerResponse);

        // Import product drafts
        const getProductDraftsFromCSVResponse = await getProductDraftsFromCSV();
        log(`Products without conversion error: ${getProductDraftsFromCSVResponse.responseStatus.productsWithoutError.length}`);
        log(`Products with conversion error: ${getProductDraftsFromCSVResponse.responseStatus.productsWithError.length}`);

        for (let index = 0; index < getProductDraftsFromCSVResponse.productDrafts.length; index = index + 20) {
            const importProductDraftsResponse = await importProductDrafts(importContainerKey, {
                type: 'product-draft',
                resources: getProductDraftsFromCSVResponse.productDrafts.slice(index, index + 20),
            });
            log(importProductDraftsResponse);

            await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        // Get import operations
        const getImportOperationsResponse = await getImportOperations(importContainerKey);
        log(getImportOperationsResponse);

        // Get an import summary
        const getImportSummaryResponse = await getImportSummary(importContainerKey);
        log(getImportSummaryResponse);
    } catch (error: any) {
        console.log(error.body);
    }
})();
