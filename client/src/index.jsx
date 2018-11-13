import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { resolvers, defaults } from './store/resolvers';
import App from './views/App';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphl',
  clientState: {
    defaults,
    resolvers,
  },
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
