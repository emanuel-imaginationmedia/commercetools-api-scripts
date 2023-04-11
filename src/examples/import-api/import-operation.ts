import { getImportOperation, getImportOperations } from '../../services/import-api/import-operation';
import { log } from '../../utils/logger';

(async () => {
  try {
    // Get import operations
    const getImportOperationsResponse = await getImportOperations('emm-import-container');
    log(getImportOperationsResponse);

    // Get an import operation
    const getImportOperationResponse = await getImportOperation('id');
    log(getImportOperationResponse);
  } catch (error) {
    log(error);
  }
})();
