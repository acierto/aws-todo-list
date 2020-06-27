import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import {Config} from './constants';

const cache = new InMemoryCache();
const client = new ApolloClient({
    uri: Config.GRAPHQL_URL,
    cache
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
);
