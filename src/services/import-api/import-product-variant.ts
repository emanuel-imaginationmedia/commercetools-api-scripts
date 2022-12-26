import { ProductVariantImportRequest, ClientResponse, ImportResponse } from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const importProductVariants = (
    importContainerKey: string,
    productVariantImportRequest: ProductVariantImportRequest
): Promise<ClientResponse<ImportResponse>> => {
    return importApiClient
        .productVariants()
        .importContainers()
        .withImportContainerKeyValue({ importContainerKey: importContainerKey })
        .post({
            body: productVariantImportRequest,
        })
        .execute();
};
