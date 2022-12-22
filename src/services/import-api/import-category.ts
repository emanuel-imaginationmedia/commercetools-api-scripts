import { CategoryImportRequest, ClientResponse, ImportResponse } from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const importCategories = (importContainerKey: string, categoryImportRequest: CategoryImportRequest): Promise<ClientResponse<ImportResponse>> => {
    return importApiClient
        .categories()
        .importContainers()
        .withImportContainerKeyValue({ importContainerKey: importContainerKey })
        .post({
            body: categoryImportRequest,
        })
        .execute();
};
