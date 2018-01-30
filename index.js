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

var corsOptions = {
	origin: 'https://rafaelnsantos.github.io',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// .use all middlewares from the folder
Object.keys(middlewares).map(e => app.use(middlewares[e]))

app.use('/graphql',
	bodyParser.json(), cors(corsOptions), graphqlExpress((req) => ({
		schema,
		context: req.context
	}))
)

// used for development
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))

// start server
app.listen(process.env.PORT, () => console.log('Listening at port', process.env.PORT))
