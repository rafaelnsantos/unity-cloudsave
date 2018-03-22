import UserModel from '@/models/user'

exports.resolver = {
	Query: {
		Leaderboard (root, {top, key}, context) {
			return context.user.GetLeaderboard(top, key)
		},
		PublicLeaderboard (root, {appid, key}) {
			return UserModel.Leaderboard(appid, key)
		}
	}
}
