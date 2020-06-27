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

    const port = process.env.PORT || 4000;

    app.listen(port, () =>
        log.info(`Server is running on http://localhost:${port}/graphql`)
    );
}

startServer();
