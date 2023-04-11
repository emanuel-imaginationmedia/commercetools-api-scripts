import { ProductTypeImportRequest, ClientResponse, ImportResponse } from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const importProductTypes = (
  importContainerKey: string,
  productTypeImportRequest: ProductTypeImportRequest,
): Promise<ClientResponse<ImportResponse>> => importApiClient
  .productTypes()
  .importContainers()
  .withImportContainerKeyValue({ importContainerKey })
  .post({
    body: productTypeImportRequest,
  })
  .execute();
