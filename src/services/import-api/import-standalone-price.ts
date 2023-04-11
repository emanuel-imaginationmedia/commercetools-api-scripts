import { StandalonePriceImportRequest, ClientResponse, ImportResponse } from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const importStandalonePrices = (
  importContainerKey: string,
  standalonePriceImportRequest: StandalonePriceImportRequest,
): Promise<ClientResponse<ImportResponse>> => importApiClient
  .standalonePrices()
  .importContainers()
  .withImportContainerKeyValue({ importContainerKey })
  .post({
    body: standalonePriceImportRequest,
  })
  .execute();
