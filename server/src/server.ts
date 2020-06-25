import log from 'loglevel';
import {ApolloServer} from 'apollo-server-express';
import Express from 'express';
import 'reflect-metadata';
import {buildSchema} from 'type-graphql';
import TodoResolver from './resolvers/todo-resolver';

async function startServer() {
    const schema = await buildSchema({
        resolvers: [TodoResolver],
        emitSchemaFile: true
    });

    const app = Express();

    const server = new ApolloServer({schema});
    server.applyMiddleware({app});

    app.listen(4000, () =>
        log.info('Server is running on http://localhost:4000/graphql')
    );
}

startServer();
