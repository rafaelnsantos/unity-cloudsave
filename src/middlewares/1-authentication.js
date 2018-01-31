'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _fbgraph = require('fbgraph');

var _fbgraph2 = _interopRequireDefault(_fbgraph);

var _atob = require('atob');

var _atob2 = _interopRequireDefault(_atob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res, next) {
		var user, parts, scheme, credentials;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						if (!req.headers.teste) {
							_context3.next = 10;
							break;
						}

						_context3.next = 3;
						return _user2.default.findById(4);

					case 3:
						user = _context3.sent;

						if (user) {
							_context3.next = 8;
							break;
						}

						_context3.next = 7;
						return _user2.default.create({ _id: 4 });

					case 7:
						user = _context3.sent;

					case 8:

						req.context.user = user;

						return _context3.abrupt('return', next());

					case 10:
						if (req.headers.authorization) {
							_context3.next = 12;
							break;
						}

						return _context3.abrupt('return', next());

					case 12:
						parts = req.headers.authorization.split(' ');

						if (!(parts.length !== 2)) {
							_context3.next = 15;
							break;
						}

						return _context3.abrupt('return', next());

					case 15:
						scheme = parts[0];
						credentials = parts[1];

						if (/^Bearer$/i.test(scheme)) {
							_context3.next = 19;
							break;
						}

						return _context3.abrupt('return', next());

					case 19:

						_fbgraph2.default.setAccessToken(credentials);

						_fbgraph2.default.get('debug_token?input_token=' + credentials + '&access_token=' + process.env.APP_ID + '|' + process.env.APP_SECRET, function () {
							var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(err, res) {
								var id, user;
								return _regenerator2.default.wrap(function _callee2$(_context2) {
									while (1) {
										switch (_context2.prev = _context2.next) {
											case 0:
												if (!err) {
													_context2.next = 2;
													break;
												}

												return _context2.abrupt('return', next());

											case 2:
												id = res.data.user_id;
												_context2.next = 5;
												return _user2.default.findById(id);

											case 5:
												user = _context2.sent;

												if (user) {
													_context2.next = 11;
													break;
												}

												_context2.next = 9;
												return _user2.default.create({ _id: id });

											case 9:
												user = _context2.sent;

												_fbgraph2.default.get('me?fields=email', function () {
													var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(err, res) {
														return _regenerator2.default.wrap(function _callee$(_context) {
															while (1) {
																switch (_context.prev = _context.next) {
																	case 0:
																		if (!err) {
																			_context.next = 2;
																			break;
																		}

																		return _context.abrupt('return', next());

																	case 2:
																		_context.next = 4;
																		return user.SetString('email', res.email);

																	case 4:
																	case 'end':
																		return _context.stop();
																}
															}
														}, _callee, this);
													}));

													return function (_x6, _x7) {
														return _ref3.apply(this, arguments);
													};
												}());

											case 11:
												req.context.user = user;
												req.body = JSON.parse(rc4((0, _atob2.default)(req.body.toString())));
												next();

											case 14:
											case 'end':
												return _context2.stop();
										}
									}
								}, _callee2, this);
							}));

							return function (_x4, _x5) {
								return _ref2.apply(this, arguments);
							};
						}());

					case 21:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, this);
	}));

	return function (_x, _x2, _x3) {
		return _ref.apply(this, arguments);
	};
}();

function rc4(str) {
	var key = process.env.KEY;
	var s = [];
	var j = 0;
	var x;
	var res = '';

	for (var i = 0; i < 256; i++) {
		s[i] = i;
	}
	for (i = 0; i < 256; i++) {
		j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
	}
	i = 0;
	j = 0;
	for (var y = 0; y < str.length; y++) {
		i = (i + 1) % 256;
		j = (j + s[i]) % 256;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
		res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
	}
	return res;
}