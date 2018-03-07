const { GraphQLServer } = require('graphql-yoga')
const typeDefs = require('./type-defs')
const resolvers = require('./resolvers')
const context = require('./context')

const server = new GraphQLServer({ typeDefs, resolvers, context })

server.start(() => console.log('Server is running on 127.0.0.1:4000'))