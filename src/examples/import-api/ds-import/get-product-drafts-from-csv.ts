import {
  Attribute,
  CategoryKeyReference,
  ProductDraftImport,
  ProductTypeKeyReference,
  ProductVariantDraftImport,
} from '@commercetools/importapi-sdk';
import csvtojsonV2 from 'csvtojson';

const PRODUCT_TYPE_KEY = 'material';
const IMAGE_BASE_URL = 'https://placeholder';

const formatKey = (text: string) => text
  .replace(/[^a-zA-Z0-9- ]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .toLowerCase()
  .split(' ')
  .join('-');

const getProductType = (): ProductTypeKeyReference => ({
  typeId: 'product-type',
  key: PRODUCT_TYPE_KEY,
});

const getCategories = (categories: string): CategoryKeyReference[] => categories.split(',').map((category) => {
  const paths = category.split('/');

  return {
    typeId: 'category',
    key: formatKey(paths[paths.length - 1]),
  };
});

const getProductVariants = (
  productsFromCSV: Array<{ [key: string]: string }>,
  variants: string,
): ProductVariantDraftImport[] => {
  const productVariants: ProductVariantDraftImport[] = [];

  variants.split('|').forEach((productVariant) => {
    const properties = productVariant.split(',');
    const propertiesObject: { [key: string]: string } = {};
    properties.forEach((property) => {
      const keyAndValue = property.split('=');
      propertiesObject[keyAndValue[0]] = keyAndValue[1];
    });

    const productVariantFromCSV = productsFromCSV.find(
      (productFromCSV) => productFromCSV.sku === propertiesObject.sku,
    );

    if (productVariantFromCSV) {
      const attributes: Attribute[] = [];
      for (const [key, value] of Object.entries(propertiesObject)) {
        if (key !== 'sku') {
          attributes.push({
            name: formatKey(key),
            type: 'text',
            value,
          });
        }
      }

      const additionalAttributes = ['color', 'manufacturer_sample_id', 'manufacturer', 'paint_product_type', 'product_finish_type', 'attribute_set_code'];
      additionalAttributes.forEach((additionalAttribute) => {
        if (productVariantFromCSV[additionalAttribute] && productVariantFromCSV[additionalAttribute] !== '') {
          attributes.push({ name: formatKey(additionalAttribute), type: 'text', value: productVariantFromCSV[additionalAttribute] });
        }
      });

      productVariants.push({
        key: `${formatKey(productVariantFromCSV.name)}-${formatKey(productVariantFromCSV.sku)}`,
        sku: formatKey(productVariantFromCSV.sku),
        attributes,
        images: productVariantFromCSV.base_image.split(',').map((image) => ({
          url: IMAGE_BASE_URL + image,
          dimensions: { w: 1470, h: 1400 },
        })),
        prices: [
          {
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: 500,
            },
          },
        ],
      });
    }
  });

  return productVariants;
};

const convertProductFromCSVToProductDraftImport = (
  productsFromCSV: Array<{ [key: string]: string }>,
  productFromCSV: { [key: string]: string },
): ProductDraftImport => {
  const productVariants = getProductVariants(
    productsFromCSV,
    productFromCSV.configurable_variations,
  );

  if (productVariants.length === 0) {
    throw new Error('A product must have at least one variant.');
  }

  if (!productFromCSV.name || productFromCSV.name === '') {
    throw new Error('A product must have a name.');
  }

  return {
    key: `${formatKey(productFromCSV.name)}-${formatKey(productFromCSV.sku)}`,
    name: {
      'en-US': productFromCSV.name,
    },
    description: productFromCSV.description
      ? {
        'en-US': productFromCSV.description,
      }
      : undefined,
    slug: {
      'en-US': formatKey(productFromCSV.name),
    },
    metaTitle: productFromCSV.meta_title
      ? {
        'en-US': productFromCSV.meta_title,
      }
      : undefined,
    metaDescription: productFromCSV.meta_description
      ? {
        'en-US': productFromCSV.meta_description,
      }
      : undefined,
    metaKeywords: productFromCSV.meta_keywords
      ? {
        'en-US': productFromCSV.meta_keywords,
      }
      : undefined,
    productType: getProductType(),
    categories: getCategories(productFromCSV.categories),
    masterVariant: productVariants[0],
    variants: productVariants.slice(1),
    publish: true,
  };
};

export const getProductDraftsFromCSV = async (): Promise<{
  productDrafts: ProductDraftImport[];
  responseStatus: {
    productsWithoutError: string[];
    productsWithError: string[];
  };
}> => {
  const productsFromCSV = await csvtojsonV2({ delimiter: ';' }).fromFile(`${__dirname}/../../../assets/ds-products.csv`);
  const responseStatus: {
    productsWithoutError: string[];
    productsWithError: string[];
  } = {
    productsWithoutError: [],
    productsWithError: [],
  };

  const productDrafts: ProductDraftImport[] = [];
  for (const productFromCSV of productsFromCSV) {
    try {
      if (productFromCSV.product_type === 'configurable' && productFromCSV.product_finish_type === 'Material') {
        productDrafts.push(
          convertProductFromCSVToProductDraftImport(productsFromCSV, productFromCSV),
        );

        responseStatus.productsWithoutError.push(productFromCSV.sku);
      }
    } catch (error) {
      responseStatus.productsWithError.push(productFromCSV.sku);
    }
  }

  return {
    productDrafts,
    responseStatus,
  };
};
