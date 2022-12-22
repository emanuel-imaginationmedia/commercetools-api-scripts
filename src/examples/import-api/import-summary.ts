import { getImportSummary } from '../../services/import-api/import-summary';
import { log } from '../../utils/logger';

(async () => {
    try {
        // Get an import summary
        const getImportSummaryResponse = await getImportSummary('emm-import-container');
        log(getImportSummaryResponse);
    } catch (error) {
        log(error);
    }
})();
