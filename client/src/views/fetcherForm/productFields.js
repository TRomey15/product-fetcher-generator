// required fields have an * in the displayName
export const pf = {
  parent_id: {
    name: 'parent_id',
    displayName: 'Parent ID*',
    type: 'text',
    placeholder: '50505',
    dataType: 'string',
    required: true,
    tooltip: 'String. Parent product identifier, unique to the store. Used to group variants under a single parent product',
  },
  variant_id: {
    name: 'variant_id',
    displayName: 'Variant ID*',
    type: 'text',
    placeholder: 'AQ287444',
    dataType: 'string',
    required: true,
    tooltip: 'String. Product variant identifier, unique to the store. If not explicitly set, the api will build one using the parent_id and product_details',
  },
  canonical_url: {
    name: 'canonical_url',
    displayName: 'Canonical URL*',
    type: 'text',
    placeholder: 'https.store-name/p/1234',
    dataType: 'string',
    required: true,
    tooltip: 'String. Canonical url for this product. Used to direct users to the appropriate product page on a merchant site',
  },
  is_canonical: {
    name: 'is_canonical',
    displayName: 'Is Canonical?',
    type: 'radio',
    values: ['Yes', 'No'],
    dataType: 'boolean',
    required: true,
    tooltip: 'Boolean. True if this product is directly reachable using the canonical_url',
  },
  price_current: {
    name: 'price_current',
    displayName: 'Current Price*',
    type: 'string',
    placeholder: '44.00',
    dataType: 'number',
    required: true,
    tooltip: 'Number. Product\'s current ("discounted") price, in the specified currency',
  },
  price_list: {
    name: 'price_list',
    displayName: 'List Price*',
    type: 'string',
    placeholder: '58.00',
    dataType: 'number',
    required: true,
    tooltip: 'Number. Product\'s list price, in the specified currency',
  },
  image_url_primary: {
    name: 'image_url_primary',
    displayName: 'Primary Image Url*',
    type: 'text',
    placeholder: 'https://images.lululemon.com/is/image/lululemon/LW1BE5S_032567_4',
    dataType: 'string',
    required: true,
    tooltip: 'String. Proudct\'s main image url. Try to get a large image ( so that we can generate different site variations)',
  },
  image_url_secondaries: {
    name: 'image_url_secondaries',
    displayName: 'Secondary Image Urls',
    type: 'text',
    placeholder: '["https://images.lululemon.com/is/image/lululemon/LW1BE5S_032567_5", "https://images.lululemon.com/is/image/lululemon/LW1BE5S_032567_6"]',
    dataType: 'array',
    tooltip: 'Array of strings. Array of secondary image urls',
  },
  categories: {
    name: 'categories',
    displayName: 'Categories',
    type: 'text',
    placeholder: '["Women\'s", "Shirts"]',
    dataType: 'array',
    tooltip: 'Array of strings. Array of product categories',
  },
  in_stock: {
    name: 'in_stock',
    displayName: 'In Stock?',
    type: 'radio',
    values: ['Yes', 'No'],
    dataType: 'boolean',
    tooltip: 'Boolean. True if the product is in stock, false otherwise',
  },
  title: {
    name: 'title',
    displayName: 'Title',
    type: 'text',
    placeholder: 'Breezy Tank',
    dataType: 'string',
    tooltip: 'String. Product title',
  },
  brand: {
    name: 'brand',
    displayName: 'Brand',
    type: 'text',
    placeholder: 'Lululemon',
    dataType: 'string',
    tooltip: 'String. Product brand',
  },
  description: {
    name: 'description',
    displayName: 'Description',
    rows: 5,
    cols: 20,
    placeholder: 'Ace your technique in this breezy tank that we designed with a back slit that you can tie up or wear loose',
    dataType: 'string',
    tooltip: 'String. Product\'s short (main) description',
  },
  ext_description: {
    name: 'ext_description',
    displayName: 'Extended Description',
    type: 'text',
    placeholder: 'Comes in 5 different colors. Materials: Cotton, Microfiber',
    dataType: 'string',
    tooltip: 'String. Product\'s extended description (usually too long to display)',
  },
  currency: {
    name: 'currency',
    displayName: 'Currency',
    type: 'text',
    placeholder: 'USD',
    dataType: 'string',
    tooltip: 'String. ISO 4217 3-letter code',
  },
  rating_count: {
    name: 'rating_count',
    displayName: 'Rating Count',
    type: 'string',
    placeholder: 24,
    dataType: 'number',
    tooltip: 'Number. Number of ratings',
  },
  rating_value: {
    name: 'rating_value',
    displayName: 'Rating Value',
    type: 'string',
    placeholder: 98,
    dataType: 'number',
    tooltip: 'Number. Rating value [1-100]',
  },
  related_products: {
    name: 'related_products',
    displayName: 'Related Products',
    type: 'text',
    placeholder: '[{url, parent_id}]',
    dataType: 'array',
    tooltip: 'Array of related product objects. Related products are products that are different but are often used together (iPhone 7 and ear-pods)',
  },
  similar_products: {
    name: 'similar_products',
    displayName: 'Similar Products',
    type: 'text',
    placeholder: '[{url, parent_id}]',
    dataType: 'array',
    tooltip: 'Array of similar product objects. Similar products are of the same product (iPhone 7 and iPhone 7+)',
  },
  product_states: {
    name: 'product_states',
    displayName: 'Product States',
    type: 'text',
    placeholder: '["TPS", "CS"]',
    dataType: 'array',
    tooltip: `An optional array of flags to handle edge cases:
    ISPO - in store pickup only
    CS - coming soon
    TPS - third party seller
    DIGITAL - digital download`,
  },
  keywords: {
    name: 'keywords',
    displayName: 'Keywords',
    placeholder: '["Microfiber", "Dressy shirts"]',
    dataType: 'array',
    tooltip: 'Array of strings. Array of keywords related to the product',
  },
  upc: {
    name: 'upc',
    displayName: 'UPC',
    placeholder: '0848719071733',
    dataType: 'string',
    tooltip: 'Product\'s universal product code (googling this will provide links to the same product on different merchant sites)',
  },
};

export const npf = {
  quantity_in_stock: {
    name: 'quantity_in_stock',
    displayName: 'Quantity In Stock',
    type: 'text',
    placeholder: 55,
    dataType: 'number',
    tooltip: 'Number. Amount merchant has of this item in stock',
  },
  quantity_required: {
    name: 'quantity_required',
    displayName: 'Quantity Required',
    type: 'text',
    placeholder: 5,
    dataType: 'number',
    tooltip: 'Number. The minimum amount you must purchase of this item',
  },
  quantity_allowed: {
    name: 'quantity_allowed',
    displayName: 'Quantity Allowed',
    type: 'text',
    placeholder: 2,
    dataType: 'number',
    tooltip: 'The maximum amount you are allowed to purchase of this item',
  },
  quanitity_increment: {
    name: 'quantity_increment',
    displayName: 'Quantity Increment',
    type: 'text',
    placeholder: 7,
    dataType: 'number',
    tooltip: 'Quantities must increment by this number',
  },
  final_sale: {
    name: 'final_sale',
    displayName: 'Final Sale?',
    type: 'radio',
    values: ['Yes', 'No'],
    dataType: 'boolean',
    tooltip: 'Boolean. Indicates that this item is final (i.e., non-refundable)',
  },
};

export const cf = {
  product_details: {
    name: 'product_details',
    displayName: 'Product Details',
    type: 'text',
    dataType: 'string',
    keyVal: [{}],
    tooltip: 'JSON-encoded with the product\'s variant detials (e.g., color, size, etc.)',
  },
  store_extra_info: {
    name: 'store_extra_info',
    displayName: 'Store Extra Info',
    type: 'text',
    dataType: 'string',
    keyVal: [{}],
    tooltip: 'Opaque JSON-encoded store-specific extra info (for universal cart and checkout).',
  },
};

export const productPageUrl = {
  name: 'product_page_url',
  displayName: 'Product Page URL:',
  inputype: 'text',
  placeholder: 'https://www.lululemon.com/',
  dataType: 'string',
  required: false,
};