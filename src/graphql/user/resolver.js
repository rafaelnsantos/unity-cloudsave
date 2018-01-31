import UserModel from '@/models/user'

exports.resolver = {
	User: {
		email (root) {
			return root.GetString('email')
		},
		score (root) {
			return root.GetInt('score')
		},
		money (root) {
			return root.GetInt('money')
		}
	},
	Query: {
		Me (root, args, context) {
			return context.user
		},
		Leaderboard (root, args) {
			return UserModel.GetLeaderboard(args.top, args.key)
		}
	}
}
