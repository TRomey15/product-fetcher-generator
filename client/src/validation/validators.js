// import partialize from 'folktale/core/lambda/partialize';
import { notEmpty } from './rules';

// const _ = partialize.hole;
// const inRange = partialize(4, validRange);

// Enable/create validators on demand

export const validators = {
  storeId: notEmpty,
  productPageUrl: notEmpty,
  // schemaVersion: notEmpty,
  // variantId: notEmpty,
  // parentId: notEmpty,
  // priceCurrent: validPrice,
  // priceList: validPrice,
  // currency: validCurrencyCode,
  // canonicalUrl: notEmpty,
  // imageUrlPrimary: notEmpty,
  // ratingValue: inRange(_, _, 0, 100),
  // productDetails: validProductDetails,
  // quantityInStock: validQuantity,
  // quantityRequired: validQuantity,
  // quantityAllowed: validQuantity,
  // quantityIncrement: validQuantity,
};

export const validate = (key, value, msg) => {
  const func = validators[key];
  return func(key, value, msg);
};
