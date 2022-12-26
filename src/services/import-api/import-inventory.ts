import { InventoryImportRequest, ClientResponse, ImportResponse } from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const importInventories = (importContainerKey: string, inventoryImportRequest: InventoryImportRequest): Promise<ClientResponse<ImportResponse>> => {
    return importApiClient
        .inventories()
        .importContainers()
        .withImportContainerKeyValue({ importContainerKey: importContainerKey })
        .post({
            body: inventoryImportRequest,
        })
        .execute();
};
