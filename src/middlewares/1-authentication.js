import UserModel from '@/models/user'
import graph from 'fbgraph'

module.exports = function (req, res, next) {
	if (!req.headers.authorization) {
		return next()
	}
	var parts = req.headers.authorization.split(' ')

	if (parts.length === 2) {
		var scheme = parts[0]
		var credentials = parts[1]

		if (/^Bearer$/i.test(scheme)) {
			graph.setAccessToken(credentials)

			graph.get('debug_token?input_token=' + credentials + '&access_token=' + process.env.APP_ID + '|' + process.env.APP_SECRET, async function (err, res) {
				if (err) return next()

				var id = res.data.user_id

				let user = await UserModel.findById(id)

				if (!user) {
					user = await UserModel.create({_id: id})
					graph.get('me?fields=email, name', async function (err, res) {
						if (err) return next()
						await user.SetString('email', res.email)
						await user.SetString('name', res.name)
					})
				}
				req.context.user = user
				return next()
			})
		}
	}
}
