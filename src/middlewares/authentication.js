import UserModel from '@/models/user'
import GameModel from '@/models/game'
import AdminModel from '@/models/admin'

import graph from 'fbgraph'

module.exports = async(req, res, next) => {
	const appId = req.headers.appid

	// ADMIN AUTH
	if (!appId) {
		if (!req.headers.admintoken) {
			return next()
		}

		try {
			req.context.admin = await AdminModel.findByToken(req.headers.admintoken)
			return next()
		} catch (err) {
			console.log(err)
			return next()
		}
	}

	// TESTE
	if (req.headers.teste === 'true' && process.env.NODE_ENV !== 'production') {
		const game = await GameModel.findOne({appid: appId}).select('key').cache(0)
		const user = await UserModel.FindOrCreate(req.headers.fbid, game)
		if (!user) return res.sendStatus(500)
		req.context.user = user

		return next()
	}

	if (!req.headers.authorization) return next()

	// GAME AUTH
	const parts = req.headers.authorization.split(' ')

	if (parts.length !== 2) return res.sendStatus(500)

	const scheme = parts[0]
	const credentials = parts[1]

	if (!/^Bearer$/i.test(scheme)) return res.sendStatus(500)

	const game = await GameModel.findOne({appid: appId}).select('key').cache(0)

	graph.get('debug_token?input_token=' + credentials + '&access_token=' + appId + '|' + game.key, async(err, result) => {
		if (err) return res.sendStatus(500)

		const userId = result.data.user_id

		const user = await UserModel.FindOrCreate(userId, game)
		if (!user) return res.sendStatus(500)
		req.context.user = user

		next()
	})
}
