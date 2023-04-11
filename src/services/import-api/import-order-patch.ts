import { OrderPatchImportRequest, ClientResponse, ImportResponse } from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const importOrderPatches = (
  importContainerKey: string,
  orderPatchImportRequest: OrderPatchImportRequest,
): Promise<ClientResponse<ImportResponse>> => importApiClient
  .orderPatches()
  .importContainers()
  .withImportContainerKeyValue({ importContainerKey })
  .post({
    body: orderPatchImportRequest,
  })
  .execute();
