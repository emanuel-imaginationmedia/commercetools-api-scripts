import { log } from '../../../utils/logger';
import { getProductDraftsFromCSV } from './get-product-drafts-from-csv';
import fs from 'fs';

(async () => {
    try {
        const getProductDraftsFromCSVResponse = await getProductDraftsFromCSV();
        log(`Products without conversion error: ${getProductDraftsFromCSVResponse.responseStatus.productsWithoutError.length}`);
        log(`Products with conversion error: ${getProductDraftsFromCSVResponse.responseStatus.productsWithError.length}`);

        fs.writeFileSync('ds-products-drafts.json', JSON.stringify(getProductDraftsFromCSVResponse.productDrafts));
    } catch (error) {
        log(error);
    }
})();
