// https://hackernoon.com/graphql-schemas-easier-better-structure-31677a640d18
import { makeExecutableSchema } from 'graphql-tools'
import { graphqls2s } from 'graphql-s2s'

import { glue } from 'schemaglue'

const { transpileSchema } = graphqls2s
const { schema, resolver } = glue(process.env.NODE_ENV !== 'production' ? 'src/graphql' : 'build/src/graphql')

export default makeExecutableSchema({
	typeDefs: [transpileSchema(schema)],
	resolvers: resolver
})
