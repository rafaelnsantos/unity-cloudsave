exports.resolver = {
	Query: {
		Leaderboard (root, {top, key}, context) {
			return context.user.GetLeaderboard(top, key)
		}
	}
}
