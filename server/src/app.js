const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const { typeDefs } = require('./generated/prisma-client/prisma-schema');
const { getAllPaths } = require('./templates/partials/getAllPaths');
const { formatPaths } = require('./templates/partials/formatPaths.js');
const loafers = require('./test/target.har.loafers.json');
const testOutput = require('./output/testOutput.json');

const resolvers = {
  Query: {
    store(root, args, context, info) {
      return context.db.query.store({ where: { id: args.id } }, info);
    },
    productObservation(root, args, context, info) {
      return context.db.query.productObservation({ where: { id: args.id } }, info);
    },
    availableTransformations(root, args, context, info) {
      const where = args.filter ? { functionName_contains: args.filter } : {};
      return context.db.query.transformations({ where }, info);
    },
  },
  Mutation: {
    analyze(root, { store, productObservation }) {
      // Analyzer handler goes here
      console.log('Store', store);
      console.log('ProductObservation', productObservation);

      getAllPaths(productObservation, loafers, 'src/output/output.json');

      return { result: JSON.stringify(formatPaths('brand', testOutput) || '') };
    },
    createProductObservation(root, args, context, info) {
      return context.db.mutation.createProductObservation(args, info);
    },
    updateProductObservation(root, args, context, info) {
      return context.db.mutation.updateProductObservation({ where: { id: args.id } }, info);
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: {
    db: new Prisma({
      typeDefs,
      endpoint: 'http://prisma:4466',
    }),
  },
});

server.start({ endpoint: '/graphql' }, () => console.log('Server is running on http://localhost:4000'));
