import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import {GRAPHQL_URL} from './constants';

const cache = new InMemoryCache();
const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
);
