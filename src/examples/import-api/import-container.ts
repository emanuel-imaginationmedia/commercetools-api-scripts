import {
  createImportContainer,
  deleteImportContainer,
  getImportContainer,
  getImportContainers,
  updateImportContainer,
} from '../../services/import-api/import-container';
import { log } from '../../utils/logger';

(async () => {
  try {
    // Create an import container
    const createImportContainerResponse = await createImportContainer({
      key: 'emm-import-container',
    });
    log(createImportContainerResponse);

    // Get import containers
    const getImportContainersResponse = await getImportContainers();
    log(getImportContainersResponse);

    // Get an import container
    const getImportContainerResponse = await getImportContainer('emm-import-container');
    log(getImportContainerResponse);

    // Update an import container
    const updateImportContainerResponse = await updateImportContainer('emm-import-container', {
      version: getImportContainerResponse.body.version,
      resourceType: 'product',
    });
    log(updateImportContainerResponse);

    // Delete an import container
    const deleteImportContainerResponse = await deleteImportContainer('emm-import-container');
    log(deleteImportContainerResponse);
  } catch (error) {
    log(error);
  }
})();
