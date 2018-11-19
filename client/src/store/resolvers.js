import gql from 'graphql-tag';

export const defaults = {
  productObservation: {
    __typename: 'ProductObservation',
    id: 0,
    schemaVersion: '4.0.0',
    vimVersion: '1.0.0',
  },
};

export const resolvers = {
  Mutation: {
    updateProductObservation: (_, { data }, { cache }) => {
      const query = gql`
          query GetProductObservation {
              productObservation @client {
                  id
                  schemaVersion
                  vimVersion
              }
          }
      `;

      const { productObservation: prev } = cache.readQuery({ query });
      const productObservation = { ...prev, ...data };

      cache.writeQuery({
        query,
        data: { productObservation },
      });

      return productObservation;
    },
  },
};
