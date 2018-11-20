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
  metadata: {
    __typename: 'Metadata',
  },
  ui: {
    __typename: 'UI',
    schemaField: 'title',
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
  Query: {
    metadata: (_, { schemaField }) => {
      console.log('CALLED GET_METADATA', schemaField);
      return { __typename: 'Metadata', xhr: 'Hello World' };
    },
  },
  Mutation: {
    closeModal: (_, variables, { cache }) => {
      const query = gql`
          query GetSchemaField {
              ui @client {
                  schemaField
              }
          }
      `;

      const { ui: prevUi } = cache.readQuery({ query });
      const ui = { ...prevUi, schemaField: '' };

      cache.writeQuery({
        query,
        data: { ui },
      });

      return ui;
    },
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
