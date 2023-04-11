import { CustomerImportRequest, ClientResponse, ImportResponse } from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const importCustomers = (
  importContainerKey: string,
  customerImportRequest: CustomerImportRequest,
): Promise<ClientResponse<ImportResponse>> => importApiClient
  .customers()
  .importContainers()
  .withImportContainerKeyValue({ importContainerKey })
  .post({
    body: customerImportRequest,
  })
  .execute();
