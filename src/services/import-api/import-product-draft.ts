import { ProductDraftImportRequest, ClientResponse, ImportResponse } from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const importProductDrafts = (
    importContainerKey: string,
    productDraftImportRequest: ProductDraftImportRequest
): Promise<ClientResponse<ImportResponse>> => {
    return importApiClient
        .productDrafts()
        .importContainers()
        .withImportContainerKeyValue({ importContainerKey: importContainerKey })
        .post({
            body: productDraftImportRequest,
        })
        .execute();
};
