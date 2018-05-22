import AchivementModel from '@/models/achievement'
import UserModel from '@/models/user'

exports.resolver = {
	Game: {
		achievements (game) {
			return AchivementModel.find({game: game._id})
		},
		players (game) {
			return UserModel.find({game: game._id}).count()
		}

	},
	Query: {
		me (db, args, {admin}) {
			return admin
		},
		games (db, args, {admin}) {
			return db.model('Game').find({admin: admin}).select('appid key')
		},
		game (db, {appid}, {admin}) {
			return db.model('Game').findOne({admin: admin, appid: appid})
		},

	},
	Mutation: {
		async createGame (db, {game}, {admin}) {
			game.admin = admin
			game._id = db.Types.ObjectId()

			if (game.achievements) {
				game.achievements.map(achievement => {
					achievement.game = game
				})

				var achievements = await db.model('Achievement').create(game.achievements)
			}

			game.achievements = achievements

			try {
				await db.model('Game').create(game)
			} catch (err) {
				return err
			}
		},
		async upsertAchievements(db, {achievements, appid}, {admin}) {
			var game = await db.model('Game').FindGame(appid, admin)
			return game.UpsertAchievements(achievements)
		}
	}
}