import Mongoose from 'mongoose'
import cachegoose from 'cachegoose'

Mongoose.Promise = global.Promise
Mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true})

cachegoose(Mongoose, {
	engine: 'redis', /* If you don't specify the redis engine,      */
	port: process.env.REDIS_PORT, /* the query results will be cached in memory. */
	host: process.env.REDIS_HOST,
	compress: true,
	password: process.env.REDIS_PASSWORD
})
