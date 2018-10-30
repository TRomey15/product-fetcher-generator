const dummyFunctions = ['cleanText', 'priceClean', 'makeDelicious']; // dummy helpers for transform

const testObj =
  { // For Demoing rendering of R hand side of detail View
    '@context': 'http:schema.org',
    '@type': 'Product',
    name: 'Solid Pique Polo',
    description: 'Joe Fresh - Solid Pique Polo is now 33-38% off. Free Shipping on orders over $100.',
    brand: 'Joe Fresh',
    image: [
      'www.hautelookcdn.com/products/MC8K190003/large/8047587.jpg',
    ],
    offers: [
      {
        '@type': 'Offer',
        priceCurrency: 'USD',
        availability: 'http:schema.org/InStock',
        price: 9.96,
      },
      {
        '@type': 'Offer',
        priceCurrency: 'USD',
        availability: 'http:schema.org./inStock',
        price: 10.7,
      },
    ],
  };

const mock = {
  testObject: testObj,
  dummyFunctions,
  mockData: { // simulating Data provided by Backend...
    primary_image: {
      activeKey: 'api',
      value: '', // were this 'brand' it would be zara...
      code: 'stringified function',
      name: 'primary_image',
      sources: {
        api: [{
          selected: true,
          url: 'https://images.lululemon.com/is/image/lululemon/LW1BE.jpg',
          path: 'data.product-attribute.product-carousel["0"].image-info["4"]', // input
          object: testObj,
          functions: dummyFunctions,
        },
        {
          selected: false,
          url: 'a totally different url',
          path: 'a totally different path', // input
          object: { funnyObject: 'output to editor' },
          functions: dummyFunctions,
        },
        ],
        script: [{
          scriptRegex: '/[crazyLooking][RegexThing](.*)/',
          selected: true,
          path: 'data.product-attribute.product-carousel["0"].image-info["4"]', // input
          object: { funnyObject: 'output to editor' },
          functions: dummyFunctions,
        }],
        html: [{
          selector: 'selector',
          selected: true,
          path: 'data.product-attribute.product-carousel["0"].image-info["4"]', // input
          object: { funnyObject: 'output to editor' },
          functions: dummyFunctions,
        }],
      },
    },
  },
};

export default mock;
