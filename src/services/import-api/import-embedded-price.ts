import { PriceImportRequest, ClientResponse, ImportResponse } from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const importEmbeddedPrices = (
  importContainerKey: string,
  priceImportRequest: PriceImportRequest,
): Promise<ClientResponse<ImportResponse>> => importApiClient
  .prices()
  .importContainers()
  .withImportContainerKeyValue({ importContainerKey })
  .post({
    body: priceImportRequest,
  })
  .execute();
