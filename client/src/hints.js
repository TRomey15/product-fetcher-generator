export default Object.freeze({
  variantId: 'The product variant identifier must be unique within the store',
  parentId: 'The parent product identifier must be unique within the store. It is used to group variants under a single parent.',
  canonicalUrl: 'The product\'s canonical URL is used to display the correct product page to users',
  isCanonical: 'The product is canonical if it is directly reachable using the canonical URL. This could' +
    ' either be the (selected) default product or all products if it is possible to select a product on page load.',
  description: 'The product\'s main description (usually short)',
  extendedDescription: 'The product\'s extended description (usually verbose and too long to display)',
  listPrice: 'The product\'s list price (MSRP)',
  currency: 'ISO 4217 3-letter code, e.g. USD',
  productStates: 'An optional array of flags to handle edge cases: <b>ISPO</b> (in store pickup only), <b>CS</b> (coming soon), ' +
    '<b>TPS</b> (third party seller), <b>DIGITAL</b> (digital download), <b>CUZ</b> (customizable product), <b>ATCP</b> ' +
    '(add to cart see final price)',
  imprint: 'Checked if the user was looking at the current product variant page',
  quantityAllowed: 'Maximum amount allowed to be purchased',
  quantityIncrement: 'Quantities must be purchased in multiples of the specified number)',
  deals: 'Note potential discounts/special offers, e.g. Buy 2, get 1 FREE!',
});
