/* eslint-disable */

const dummyFunctions = ['cleanText', 'priceClean', 'makeDelicious']; // dummy helpers for transform

const mock = {
  dummyFunctions,
  targetProduct: {
    title: 'Bryant Faux Wood Patio Adirondack Chair - Project 62™',
    price_current: 152.99,
    price_list: 179.99,
    image_url_primary: 'https://target.scene7.com/is/image/Target/16500244',
    brand: 'Project 62',
    category: 'patio seating',
  },
  paths: {
    title: [
      {
        request: 'https:\/\/www.target.com\/p\/bryant-faux-wood-patio-adirondack-chair-project-62-153\/-\/A-16500244?preselect=51291121',
        jsonPath: [
          {
            enclosingScript: '<script class=" type="application\/ld+json">',
            path: [
              [
                '@graph',
                0,
                'name',
              ],
            ],
          },
        ],
      },
    ],
    price_current: [
      {
        request: 'https:\/\/www.target.com\/p\/bryant-faux-wood-patio-adirondack-chair-project-62-153\/-\/A-16500244?preselect=51291121',
        jsonPath: [
          {
            path: [
              [
                'probably',
                'some',
                'api',
                'data',
                'yep',
              ],
              [
                'product',
                'productDetails',
                'item',
                'children',
                '51291121',
                'price',
                'price',
              ],
            ],
          },
        ],
      },
      {
        request: 'https:\/\/www.target.com\/p\/bryant-faux-wood-patio-adirondack-chair-project-62-153\/-\/A-16500244?preselect=51291121',
        jsonPath: [
          {
            enclosingVariable: '__PRELOADED_STATE__=',
            path: [
              [
                'product',
                'productDetails',
                'item',
                'price',
                'price',
              ],
              [
                'product',
                'productDetails',
                'item',
                'children',
                '51291121',
                'price',
                'price',
              ],
            ],
          },
        ],
      },
      {
        request: 'https:\/\/www.target.com\/p\/bryant-faux-wood-patio-adirondack-chair-project-62-153\/-\/A-16500244?preselect=51291121',
        jsonPath: [
          {
            enclosingVariable: '__PRELOADED_STATE__=',
            path: [
              [
                'product',
                'productDetails',
                'item',
                'price',
                'price',
              ],
              [
                'product',
                'productDetails',
                'item',
                'children',
                '51291121',
                'price',
                'price',
              ],
            ],
          },
        ],
      },
      {
        request: 'https:\/\/www.target.com\/p\/bryant-faux-wood-patio-adirondack-chair-project-62-153\/-\/A-16500244?preselect=51291121',
        jsonPath: [
          {
            enclosingVariable: 'a very funky variable',
            path: [
              [
                'product',
                'productWeirdness',
                'this',
                'isnot',
                'right',
              ],
              [
                'product',
                'but',
                'maybe',
                'this',
                'one',
                'is',
                'price',
              ],
            ],
          },
        ],
      },
      {
        request: 'https:\/\/www.target.com\/p\/bryant-faux-wood-patio-adirondack-chair-project-62-153\/-\/A-16500244?preselect=51291121',
        jsonPath: [
          {
            enclosingScript: '<script class=" type="application\/ld+json">',
            path: [
              [
                '@graph',
                0,
                'name',
              ],
            ],
          },
        ],
      },
    ],
    brand: [
      {
        request: 'https:\/\/redsky.target.com\/v2\/pdp\/tcin\/16500244?excludes=taxonomy%2Cbulk_ship%2Cawesome_shop%2Cquestion_answer_statistics%2Crating_and_review_reviews%2Crating_and_review_statistics%2Cdeep_red_labels%2Craw_price%2Cin_store_location&storeId=1192',
        jsonPath: [
          {
            path: [
              [
                'product',
                'item',
                'child_items',
                0,
                'product_brand',
                'brand',
              ],
              [
                'product',
                'item',
                'child_items',
                1,
                'product_brand',
                'brand',
              ],
              [
                'product',
                'item',
                'product_brand',
                'brand',
              ],
            ],
          },
        ],
      },

      {
        request: 'anotherRequest',
        jsonPath: [
          {
            path: [
              [
                'product',
                'item',
                'child_items',
                0,
                'product_brand',
                'brandzzzzz',
              ],
              [
                'product',
                'item',
                'child_items',
                1,
                'product_brand',
                'brand',
              ],
              [
                'product',
                'item',
                'product_brand',
                'brand',
              ],
            ],
          },
        ],
      },
    ],
  },
};

export default mock;
