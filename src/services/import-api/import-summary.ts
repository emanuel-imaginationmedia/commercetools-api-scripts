import { ClientResponse, ImportSummary } from '@commercetools/importapi-sdk';
import { importApiClient } from '../../auth/import-api-client';

export const getImportSummary = (importContainerKey: string): Promise<ClientResponse<ImportSummary>> => {
    return importApiClient.importContainers().withImportContainerKeyValue({ importContainerKey: importContainerKey }).importSummaries().get().execute();
};
