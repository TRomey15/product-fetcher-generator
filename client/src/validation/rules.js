import Validation from 'folktale/validation';
import {
  isEmpty,
  startCase,
  inRange,
  isString,
  isObject,
  keys,
  toNumber,
  curry,
} from 'lodash-es';

const { Success, Failure } = Validation;

const priceRegex = /^[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$/;
const lettersOnlyRegex = /^[A-Za-z]{3}$/;

const allowedProductDetailProps = new Map([
  ['access', 'access'],
  ['color', 'color'],
  ['edition', 'edition'],
  ['finish', 'finish'],
  ['fit', 'fit'],
  ['flavor', 'flavor'],
  ['height', 'height'],
  ['inseam', 'inseam'],
  ['image', 'image'],
  ['length', 'length'],
  ['material', 'material'],
  ['model', 'model'],
  ['neck', 'neck'],
  ['option', 'option'],
  ['platform', 'platform'],
  ['size', 'size'],
  ['sleeve', 'sleeve'],
  ['style', 'style'],
  ['team', 'team'],
  ['type', 'type'],
  ['waist', 'waist'],
  ['weight', 'weight'],
  ['width', 'width'],
]);

export const notEmpty = curry((key, value, msg) => {
  return !isEmpty(value)
    ? Success(value)
    : Failure([msg || `${startCase(key)} cannot be empty.`]);
});

export const validRange = curry((key, value, min = 0, max = 0) => {
  return inRange(value, min, max)
    ? Success(value)
    : Failure([`${startCase(key)} not within allowed range [${min}-${max}].`]);
});

export const validCurrencyCode = curry((key, value) => {
  return (isString(value) && lettersOnlyRegex.test(value))
    ? Success(value)
    : Failure([`${startCase(key)} must be ISO 4217 compliant.`]);
});

export const validPrice = curry((key, value) => {
  return priceRegex.test(value)
    ? Success(value)
    : Failure([`${startCase(key)} is not valid.`]);
});

export const validProductDetails = curry((key, value) => {
  const invalidProps = [];

  if (!isObject(value)) {
    return Failure([`${startCase(key)} is not formatted correctly.`]);
  }

  for (const prop of keys(value)) {
    if (!allowedProductDetailProps.get(prop)) {
      return invalidProps.push(prop);
    }
  }

  return isEmpty(invalidProps)
    ? Success(value)
    : Failure([`${startCase(key)} contains invalid properties [${invalidProps.join(', ')}].`]);
});

export const validQuantity = curry((key, value) => {
  return (toNumber(value) >= 0)
    ? Success(value)
    : Failure([`${startCase(key)} cannot be a negative number.`]);
});
