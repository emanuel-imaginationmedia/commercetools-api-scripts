import { CustomerImportRequest, ClientResponse, ImportResponse } from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const importCustomers = (importContainerKey: string, customerImportRequest: CustomerImportRequest): Promise<ClientResponse<ImportResponse>> => {
    return importApiClient
        .customers()
        .importContainers()
        .withImportContainerKeyValue({ importContainerKey: importContainerKey })
        .post({
            body: customerImportRequest,
        })
        .execute();
};
