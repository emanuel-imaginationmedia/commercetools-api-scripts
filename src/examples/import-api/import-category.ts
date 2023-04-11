import { importCategories } from '../../services/import-api/import-category';
import { log } from '../../utils/logger';

(async () => {
  try {
    // Import categories
    const importCategoriesResponse = await importCategories('emm-import-container', {
      type: 'category',
      resources: [
        {
          key: 'import-category',
          name: {
            en: 'Import Category',
          },
          slug: {
            en: 'import-category',
          },
          description: {
            en: "Category's description",
          },
          orderHint: '0.05',
          metaTitle: {
            en: 'Import Category',
          },
          metaDescription: {
            en: "Category's description",
          },
          metaKeywords: {
            en: 'import',
          },
        },
      ],
    });
    log(importCategoriesResponse);
  } catch (error) {
    log(error);
  }
})();
