import { ProductImportRequest, ClientResponse, ImportResponse } from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const importProducts = (importContainerKey: string, productImportRequest: ProductImportRequest): Promise<ClientResponse<ImportResponse>> => {
    return importApiClient
        .products()
        .importContainers()
        .withImportContainerKeyValue({ importContainerKey: importContainerKey })
        .post({
            body: productImportRequest,
        })
        .execute();
};
