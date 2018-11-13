export default Object.freeze({
  variantId: 'The product variant identifier must be unique within the store',
  parentId: 'The parent product identifier must be unique within the store. It is used to group variants under a single parent.',
  canonicalUrl: 'The product\'s canonical URL is used to display the correct product page to users',
  isCanonicalUrl: 'True if the product is directly reachable using the canonical URL. The canonical product could' +
    ' either be the (selected) default product or all products if it is possible to select a product on page load.',
  description: 'The product\'s main description (usually short)',
  extendedDescription: 'The product\'s extended description (usually verbose and too long to display)',
  listPrice: 'The product\'s list price (MSRP)',
  currency: 'ISO 4217 3-letter code, e.g. USD',
});
