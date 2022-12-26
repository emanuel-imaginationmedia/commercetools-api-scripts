import { OrderImportRequest, ClientResponse, ImportResponse } from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const importOrders = (importContainerKey: string, orderImportRequest: OrderImportRequest): Promise<ClientResponse<ImportResponse>> => {
    return importApiClient
        .orders()
        .importContainers()
        .withImportContainerKeyValue({ importContainerKey: importContainerKey })
        .post({
            body: orderImportRequest,
        })
        .execute();
};
