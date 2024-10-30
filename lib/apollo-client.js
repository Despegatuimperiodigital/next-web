// lib/apollo-client.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { wpGraphQLConfig } from './wordpress-config';

const httpLink = createHttpLink({
  uri: wpGraphQLConfig.url,
  headers: wpGraphQLConfig.headers,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

export default client;