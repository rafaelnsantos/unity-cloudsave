import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import bodyParser from 'body-parser'
import cors from 'cors'
import schema from './schema'
import context from 'context-middleware'
import middlewares from '@/middlewares'
import '@/config/db'

const app = express()

app.use(context())
app.use(bodyParser.raw({ type: 'application/twodversestudio.custom-type' }))
// .use all middlewares from the folder
Object.keys(middlewares).map(e => app.use(middlewares[e]))
app.use('/graphql', 
	bodyParser.json(), cors(), graphqlExpress((req) => ({
		schema,
		context: req.context
	}))
)

// used for development
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))

// start server
app.listen(process.env.PORT, () => console.log('Listening at port', process.env.PORT))
