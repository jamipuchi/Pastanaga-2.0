const { GraphQLServer } = require('graphql-yoga')
const { makeExecutableSchema } = require('graphql-tools');
const { useSofa } = require('sofa-api');
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const sofaAPI = require('sofa-api');
const path = require('path');
const graphqlImport = require('graphql-import');
const _ = require('lodash');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')

const resolvers = {
    Query,
    Mutation
}

const typeDefs = graphqlImport.importSchema('./src/schema.graphql')

const schema = new makeExecutableSchema({
    typeDefs,
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
        }
    },
})

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
        }
    },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))

const app = express();

const openApi = sofaAPI.OpenAPI({
    schema,
    info: {
        title: 'Pastanaga API',
        version: '1.0.0',
    },
});

app.use(
    '/api',
    sofaAPI.useSofa({
        schema,
        onRoute(info) {
            openApi.addRoute(info, {
                basePath: '/api',
            });
        },
    })
);

// writes every recorder route
openApi.save(path.resolve(__dirname, './swagger.json'));
openApi.save(path.resolve(__dirname, './swagger.yml'));

const swaggerDocument = require('./swagger.json');

app.use(bodyParser.json());
app.use('/api', useSofa({ schema }));
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(3000, () => {
    console.log('REST API Server listening  on http://localhost:3000')
})

