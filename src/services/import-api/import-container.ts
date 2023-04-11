import {
  ClientResponse,
  ImportContainer,
  ImportContainerDraft,
  ImportContainerPagedResponse,
  ImportContainerUpdateDraft,
  QueryParam,
} from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const getImportContainer = (
  importContainerKey: string,
): Promise<ClientResponse<ImportContainer>> => importApiClient
  .importContainers()
  .withImportContainerKeyValue({ importContainerKey })
  .get()
  .execute();

export const getImportContainers = (queryArgs?: {
  limit?: number;
  offset?: number;
  sort?: string | string[];
  [key: string]: QueryParam;
}): Promise<ClientResponse<ImportContainerPagedResponse>> => importApiClient
  .importContainers()
  .get({ queryArgs })
  .execute();

export const createImportContainer = (
  importContainerDraft: ImportContainerDraft,
): Promise<ClientResponse<ImportContainer>> => importApiClient
  .importContainers()
  .post({
    body: importContainerDraft,
  })
  .execute();

export const updateImportContainer = (
  importContainerKey: string,
  importContainerUpdateDraft: ImportContainerUpdateDraft,
): Promise<ClientResponse<ImportContainer>> => importApiClient
  .importContainers()
  .withImportContainerKeyValue({ importContainerKey })
  .put({ body: importContainerUpdateDraft })
  .execute();

export const deleteImportContainer = (
  importContainerKey: string,
): Promise<ClientResponse<ImportContainer>> => importApiClient
  .importContainers()
  .withImportContainerKeyValue({ importContainerKey })
  .delete()
  .execute();
