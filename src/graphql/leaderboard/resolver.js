import UserModel from '@/models/user'

exports.resolver = {
	Leaderboard: {
		position ({leaderboard}, {}, {user}) {
			return leaderboard.map((entry) => entry.id).indexOf(user.fbid) + 1
		},
		score ({leaderboard}, {}, {user}) {
			return leaderboard.filter((entry) => entry.id === user.fbid)[0].score
		},
		leaderboard ({leaderboard, top}) {
			return leaderboard.slice(0, top)
		}
	},
	Query: {
		async Leaderboard (_, {top, key}, {user}) {
			const leaderboard = await UserModel.aggregate([
				{$match: {'appid': user.appid}},
				{$project: {score: '$integers', id: '$fbid'}},
				{$unwind: '$score'},
				{$match: {'score._id': key}},
				{$sort: {'score.value': -1}},
				{$project: {'score': '$score.value', 'id': 1, '_id': 0}}
			]).cache()

			let response = {}
			response.leaderboard = leaderboard
			response.top = top < 100 && top > 0 ? top : 100
			return response
		},
		PublicLeaderboard (_, {appid, key, top}) {
			top = top < 100 && top > 0 ? top : 100
			return UserModel.aggregate([
				{$match: {'appid': appid}},
				{$project: {score: '$integers', id: '$fbid'}},
				{$unwind: '$score'},
				{$match: {'score._id': key}},
				{$sort: {'score.value': -1}},
				{$limit: top},
				{$project: {'score': '$score.value', 'id': 1, '_id': 0}}
			]).cache()
		}
	}
}
