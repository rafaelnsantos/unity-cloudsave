import UserModel from '@/models/user'

exports.resolver = {
	Query: {
		GetScores (root, args) {
			return UserModel.GetScores(args.top)
		}
	}
}
