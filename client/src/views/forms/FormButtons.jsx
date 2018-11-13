import React from 'react';
import { Button } from 'reactstrap';
import { css } from 'emotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic } from '@fortawesome/free-solid-svg-icons';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
// import { fragments } from '../../store/resolvers';

const GET_DATA = gql`
    {
        store  @client {
            storeId
            productPageUrl
        }
    }
`;

const ANALYZE_PDP = gql`
    mutation AnalyzePdp($store: StoreInput!) {
        analyze(store: $store) {
            hello
        }
    }
`;

const FormButtons = () => {
  return (
    <Query query={GET_DATA}>
      {({ data: { store } }) => (
        <Mutation
          mutation={ANALYZE_PDP}
          variables={{
            store: { storeId: store.storeId, productPageUrl: store.productPageUrl },
          }}
        >
          {analyzePdp => (
            <div
              id="control-buttons"
              className={css({ marginTop: '30px' })}
            >
              <Button
                type="button"
                color="primary"
                className="float-right"
                onClick={analyzePdp}
              >
                Analyze PDP{' '}
                <FontAwesomeIcon icon={faMagic} />
              </Button>
            </div>
          )}
        </Mutation>
      )}
    </Query>
  );
};

export default FormButtons;
