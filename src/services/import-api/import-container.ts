import {
    ClientResponse,
    ImportContainer,
    ImportContainerDraft,
    ImportContainerPagedResponse,
    ImportContainerUpdateDraft,
    QueryParam,
} from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const getImportContainer = (importContainerKey: string): Promise<ClientResponse<ImportContainer>> => {
    return importApiClient.importContainers().withImportContainerKeyValue({ importContainerKey: importContainerKey }).get().execute();
};

export const getImportContainers = (queryArgs?: {
    limit?: number;
    offset?: number;
    sort?: string | string[];
    [key: string]: QueryParam;
}): Promise<ClientResponse<ImportContainerPagedResponse>> => {
    return importApiClient.importContainers().get({ queryArgs: queryArgs }).execute();
};

export const createImportContainer = (importContainerDraft: ImportContainerDraft): Promise<ClientResponse<ImportContainer>> => {
    return importApiClient
        .importContainers()
        .post({
            body: importContainerDraft,
        })
        .execute();
};

export const updateImportContainer = (
    importContainerKey: string,
    importContainerUpdateDraft: ImportContainerUpdateDraft
): Promise<ClientResponse<ImportContainer>> => {
    return importApiClient
        .importContainers()
        .withImportContainerKeyValue({ importContainerKey: importContainerKey })
        .put({ body: importContainerUpdateDraft })
        .execute();
};

export const deleteImportContainer = (importContainerKey: string): Promise<ClientResponse<ImportContainer>> => {
    return importApiClient.importContainers().withImportContainerKeyValue({ importContainerKey: importContainerKey }).delete().execute();
};
