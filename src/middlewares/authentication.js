import UserModel from '@/models/user'
import graph from 'fbgraph'

module.exports = async (req, res, next) => {
	const appId = req.headers.appid

	if (req.headers.teste === 'true' && process.env.NODE_ENV !== 'production') {
		const user = await UserModel.FindUserByFacebookId(req.headers.fbid, appId)
		if (!user) return res.sendStatus(500)
		req.context.user = user

		return next()
	}

	if (!req.headers.authorization) return next()

	const parts = req.headers.authorization.split(' ')

	if (parts.length !== 2) return res.sendStatus(500)

	const scheme = parts[0]
	const credentials = parts[1]

	if (!/^Bearer$/i.test(scheme)) return res.sendStatus(500)

	graph.get('debug_token?input_token=' + credentials + '&access_token=' + appId + '|' + process.env[appId], async (err, result) => {
		if (err) return res.sendStatus(500)

		const userId = result.data.user_id

		const user = await UserModel.FindUserByFacebookId(userId, appId)
		if (!user) return res.sendStatus(500)
		req.context.user = user

		next()
	})
}
