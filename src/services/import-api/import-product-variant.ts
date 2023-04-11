import { ProductVariantImportRequest, ClientResponse, ImportResponse } from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const importProductVariants = (
  importContainerKey: string,
  productVariantImportRequest: ProductVariantImportRequest,
): Promise<ClientResponse<ImportResponse>> => importApiClient
  .productVariants()
  .importContainers()
  .withImportContainerKeyValue({ importContainerKey })
  .post({
    body: productVariantImportRequest,
  })
  .execute();
