'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Schema defines how the user data will be stored in MongoDB
var UserSchema = new _mongoose2.default.Schema({
	_id: {
		type: String,
		unique: true,
		index: true,
		required: true
	},
	strings: [{
		_id: {
			type: String,
			unique: true,
			index: true,
			required: true
		},
		value: String
	}],
	integers: [{
		_id: {
			type: String,
			unique: true,
			index: true,
			required: true
		},
		value: Number
	}],
	booleans: [{
		_id: {
			type: String,
			unique: true,
			index: true,
			required: true
		},
		value: Boolean
	}],
	floats: [{
		_id: {
			type: String,
			unique: true,
			index: true,
			required: true
		},
		value: Number
	}]
}, {
	timestamps: true
});

UserSchema.methods.SetString = function () {
	var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(key, value) {
		var entry;
		return _regenerator2.default.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						entry = this.strings.id(key);


						if (entry) {
							entry.value = value;
						} else {
							this.strings.push({ _id: key, value: value });
						}

						_context.next = 4;
						return this.save();

					case 4:
						return _context.abrupt('return', value);

					case 5:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
}();

UserSchema.methods.GetString = function (key) {
	var entry = this.strings.id(key);

	return entry ? entry.value : '';
};

UserSchema.methods.SetInt = function () {
	var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(key, value) {
		var entry;
		return _regenerator2.default.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						entry = this.integers.id(key);


						if (entry) {
							entry.value = value;
						} else {
							this.integers.push({ _id: key, value: value });
						}

						_context2.next = 4;
						return this.save();

					case 4:
						return _context2.abrupt('return', value);

					case 5:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, this);
	}));

	return function (_x3, _x4) {
		return _ref2.apply(this, arguments);
	};
}();

UserSchema.methods.GetInt = function (key) {
	var entry = this.integers.id(key);

	return entry ? entry.value : 0;
};

UserSchema.methods.SetBool = function () {
	var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(key, value) {
		var entry;
		return _regenerator2.default.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						entry = this.booleans.id(key);


						if (entry) {
							entry.value = value;
						} else {
							this.booleans.push({ key: key, value: value });
						}

						_context3.next = 4;
						return this.save();

					case 4:
						return _context3.abrupt('return', value);

					case 5:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, this);
	}));

	return function (_x5, _x6) {
		return _ref3.apply(this, arguments);
	};
}();

UserSchema.methods.GetBool = function (key) {
	var entry = this.booleans.id(key);

	return entry ? entry.value : false;
};

UserSchema.methods.SetFloat = function () {
	var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(key, value) {
		var entry;
		return _regenerator2.default.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						entry = this.floats.id(key);


						if (entry) {
							entry.value = value;
						} else {
							this.floats.push({ key: key, value: value });
						}

						_context4.next = 4;
						return this.save();

					case 4:
						return _context4.abrupt('return', value);

					case 5:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, this);
	}));

	return function (_x7, _x8) {
		return _ref4.apply(this, arguments);
	};
}();

UserSchema.methods.GetFloat = function (key) {
	var entry = this.floats.id(key);

	return entry ? entry.value : 0;
};

UserSchema.statics.GetLeaderboard = function () {
	var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(top, key) {
		var _this = this;

		var results, scores;
		return _regenerator2.default.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						top = top < 100 && top > 0 ? top : 100;

						_context5.next = 3;
						return this.aggregate([{ $project: { score: '$integers' } }, { $unwind: '$score' }, { $match: { 'score._id': key } }, { $sort: { 'score.value': -1 } }, { $limit: top }, { $project: { 'score._id': 0 } }]).cache();

					case 3:
						results = _context5.sent;
						scores = [];

						results.map(function (score) {
							return scores.push({
								score: score.score.value,
								user: _this({ _id: score._id })
							});
						});

						return _context5.abrupt('return', scores);

					case 7:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, this);
	}));

	return function (_x9, _x10) {
		return _ref5.apply(this, arguments);
	};
}();
// Export the model
module.exports = _mongoose2.default.model('User', UserSchema);