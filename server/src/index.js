const { GraphQLServer } = require('graphql-yoga')
const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const { useSofa, OpenAPI } = require('sofa-api');
const path = require('path');
const graphqlImport = require('graphql-import');
const _ = require('lodash');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')

const resolvers = {
    Query,
    Mutation,
    User
}

const typeDefs = graphqlImport.importSchema(path.resolve(__dirname, './schema.graphql'))

const schema = new makeExecutableSchema({
    typeDefs,
    resolvers,
})

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
        }
    },
})


// const app = express();

const openApi = OpenAPI({
    schema,
    info: {
        title: 'Pastanaga API',
        version: '1.0.0',
    },
});

server.express.use(bodyParser.json());

server.express.use(
    '/api',
    useSofa({
        schema,
        onRoute(info) {
            openApi.addRoute(info, {
                basePath: '/api',
            });
        },
        context: request => {
            return {
                ...request,
                prisma,
            }
        },
    })
);

// writes every recorder route
openApi.save(path.resolve(__dirname, './swagger.json'));
openApi.save(path.resolve(__dirname, './swagger.yml'));

const swaggerDocument = require('./swagger.json');

server.express.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.listen(2368, () => {
//     console.log('REST API Server listening  on http://localhost:3000')
// })

server.start({ port: 2368 }, () => console.log(`Server is running on http://localhost:2368`))