import { OrderImportRequest, ClientResponse, ImportResponse } from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const importOrders = (
  importContainerKey: string,
  orderImportRequest: OrderImportRequest,
): Promise<ClientResponse<ImportResponse>> => importApiClient
  .orders()
  .importContainers()
  .withImportContainerKeyValue({ importContainerKey })
  .post({
    body: orderImportRequest,
  })
  .execute();
