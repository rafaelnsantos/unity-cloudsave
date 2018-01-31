'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _graphqlServerExpress = require('graphql-server-express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _contextMiddleware = require('context-middleware');

var _contextMiddleware2 = _interopRequireDefault(_contextMiddleware);

var _middlewares = require('./src/middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

require('./src/config/db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _contextMiddleware2.default)());

app.use(_bodyParser2.default.raw({ type: 'application/twodversestudio.custom-type' }));

// .use all middlewares from the folder
Object.keys(_middlewares2.default).map(function (e) {
	return app.use(_middlewares2.default[e]);
});

app.use('/graphql', _bodyParser2.default.json(), (0, _cors2.default)(), (0, _graphqlServerExpress.graphqlExpress)(function (req) {
	return {
		schema: _schema2.default,
		context: req.context
	};
}));

// used for development
app.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));

// start server
app.listen(process.env.PORT, function () {
	return console.log('Listening at port', process.env.PORT);
});