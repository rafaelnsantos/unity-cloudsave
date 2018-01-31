'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _graphqlTools = require('graphql-tools');

var _graphqlS2s = require('graphql-s2s');

var _schemaglue = require('schemaglue');

var transpileSchema = _graphqlS2s.graphqls2s.transpileSchema; // https://hackernoon.com/graphql-schemas-easier-better-structure-31677a640d18

var _glue = (0, _schemaglue.glue)(process.env.NODE_ENV !== 'production' ? 'src/graphql' : 'build/src/graphql'),
    schema = _glue.schema,
    resolver = _glue.resolver;

exports.default = (0, _graphqlTools.makeExecutableSchema)({
	typeDefs: [transpileSchema(schema)],
	resolvers: resolver
});