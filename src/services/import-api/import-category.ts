import { CategoryImportRequest, ClientResponse, ImportResponse } from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const importCategories = (
  importContainerKey: string,
  categoryImportRequest: CategoryImportRequest,
): Promise<ClientResponse<ImportResponse>> => importApiClient
  .categories()
  .importContainers()
  .withImportContainerKeyValue({ importContainerKey })
  .post({
    body: categoryImportRequest,
  })
  .execute();
