import Mongoose from 'mongoose'

Mongoose.Promise = global.Promise
Mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/unity', {useMongoClient: true})
