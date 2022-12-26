import { ProductVariantPatchRequest, ClientResponse, ImportResponse } from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const importProductVariantPatches = (
    importContainerKey: string,
    productVariantPatchRequest: ProductVariantPatchRequest
): Promise<ClientResponse<ImportResponse>> => {
    return importApiClient
        .productVariantPatches()
        .importContainers()
        .withImportContainerKeyValue({ importContainerKey: importContainerKey })
        .post({
            body: productVariantPatchRequest,
        })
        .execute();
};
