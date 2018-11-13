import gql from 'graphql-tag';

export const defaults = {
  store: {
    __typename: 'Store',
    id: 0,
    storeId: '',
    productPageUrl: '',
  },
  productObservation: {
    __typename: 'ProductObservation',
    id: 0,
    schemaVersion: '4.0.0',
    vimVersion: '1.0.0',
    variantId: '',
    parentId: '',
    title: '',
    brand: '',
    description: '',
    extDescription: '',
    priceCurrent: '',
    priceList: '',
    currency: 'USD',
    canonicalUrl: '',
    isCanonical: '',
    upc: '',
    keywords: [],
    categories: [],
    productStates: [],
    imageUrlPrimary: '',
    imageUrlSecondaries: [],
    ratingCount: '',
    ratingValue: '',
    quantityInStock: '',
    quantityRequired: '',
    quantityAllowed: '',
    quantityIncrement: '',
    finalSale: false,
    deals: '',
    inStock: false,
    imprint: '',
  },
};

export const fragments = {
  schema: gql`
      fragment SchemaFields on ProductObservation {
          schemaVersion
          vimVersion
          variantId
          parentId
          title
          brand
          description
          extDescription
          priceCurrent
          priceList
          currency
          canonicalUrl
          isCanonical
          upc
          keywords
          categories
          productStates
          imageUrlPrimary
          imageUrlSecondaries
          quantityInStock
          quantityRequired
          quantityAllowed
          quantityIncrement
          finalSale
          deals
          inStock
          imprint
      }
  `,
};

export const resolvers = {
  Mutation: {
    updateStore: (_, { data }, { cache }) => {
      const query = gql`
          query GetStore {
              store @client {
                  id
                  storeId
                  productPageUrl
              }
          }
      `;

      const { store: prevStore } = cache.readQuery({ query });
      const store = { ...prevStore, ...data };

      cache.writeQuery({
        query,
        data: { store },
      });

      return store;
    },
    updateProductObservation: (_, { data }, { cache }) => {
      const query = gql`
          query GetProductObservation {
              productObservation @client {
                  id
                  ...SchemaFields
              }
          }
          ${fragments.schema}
      `;

      const { productObservation: prevProductObservation } = cache.readQuery({ query });
      const productObservation = { ...prevProductObservation, ...data };

      cache.writeQuery({
        query,
        data: { productObservation },
      });

      return productObservation;
    },
  },
};
