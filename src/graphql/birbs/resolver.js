exports.resolver = {
	LeaderboardBirb: {
		position ({leaderboard}, {}, {user}) {
			return leaderboard.map((entry) => entry.id).indexOf(user.fbid) + 1
		},
		leaderboard ({leaderboard, top}){
			return leaderboard.slice(0, top)
		}
	},
	Query: {
		async GetLeaderboardBirb (db, {top}, {user}) {
			const leaderboard = await db.model('User').aggregate([
				{$match: {'game': user.game}},
				{$project: {score: '$floats', id: '$fbid', mult: '$integers'}},
				{$unwind: '$score'},
				{$match: {'score._id': 'currentSeed'}},
				{$project: {'seed': '$score.value', 'id': 1, '_id': 0, mult: 1}},
				{$unwind: '$mult'},
				{$match: {'mult._id': 'currentSeedMult'}},
				{$project: {'seed': 1, 'id': 1, '_id': 0, 'multiplier': '$mult.value'}},
				{$sort: {'multiplier': -1, 'seed': -1}}
			]).cache()
			let response = {}
			response.leaderboard = leaderboard
			response.top = top < 100 && top > 0 ? top : 100
			return response
		}
	}
}
