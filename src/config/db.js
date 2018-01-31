'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cachegoose = require('cachegoose');

var _cachegoose2 = _interopRequireDefault(_cachegoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(process.env.MONGODB_URI, { useMongoClient: true });

(0, _cachegoose2.default)(_mongoose2.default, {
	engine: 'redis', /* If you don't specify the redis engine,      */
	port: process.env.REDIS_PORT, /* the query results will be cached in memory. */
	host: process.env.REDIS_HOST,
	compress: true,
	password: process.env.REDIS_PASSWORD
});