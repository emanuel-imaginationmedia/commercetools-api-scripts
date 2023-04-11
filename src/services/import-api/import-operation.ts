import {
  ClientResponse, ImportOperation, ImportOperationPagedResponse, ProcessingState, QueryParam,
} from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const getImportOperation = (
  id: string,
): Promise<ClientResponse<ImportOperation>> => importApiClient
  .importOperations()
  .withIdValue({ id })
  .get()
  .execute();

export const getImportOperations = (
  importContainerKey: string,
  queryArgs?: {
    limit?: number;
    offset?: number;
    sort?: string | string[];
    resourceKey?: string;
    state?: ProcessingState;
    debug?: boolean;
    [key: string]: QueryParam;
  },
): Promise<ClientResponse<ImportOperationPagedResponse>> => importApiClient
  .importContainers()
  .withImportContainerKeyValue({ importContainerKey })
  .importOperations()
  .get({
    queryArgs,
  })
  .execute();
