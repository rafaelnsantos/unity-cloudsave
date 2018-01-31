'use strict';

var _user = require('../../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.resolver = {
	User: {
		email: function email(root) {
			return root.GetString('email');
		},
		score: function score(root) {
			return root.GetInt('score');
		},
		money: function money(root) {
			return root.GetInt('money');
		}
	},
	Query: {
		Me: function Me(root, args, context) {
			return context.user;
		},
		Leaderboard: function Leaderboard(root, args) {
			return _user2.default.GetLeaderboard(args.top, args.key);
		},
		GetScores: function GetScores(root, args) {
			return _user2.default.GetLeaderboard(args.top, args.key);
		}
	}
};