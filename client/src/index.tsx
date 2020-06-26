import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './todo-app';
import {TodoModel} from './todo-model';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import {GRAPHQL_URL} from './utils/constants';

const model = new TodoModel('react-todos');

const cache = new InMemoryCache();
const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache
});

const render = () => ReactDOM.render(
    <ApolloProvider client={client}>
        <TodoApp model={model} />
    </ApolloProvider>,
    document.getElementById('root')
);

model.subscribe(render);
render();
