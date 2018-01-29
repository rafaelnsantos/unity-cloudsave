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

			graph.get('me?fields=id, email, name', async function (err, res) {
				if (!err) {
					let user = await UserModel.findById(res.id)
					if (!user) {
						user = await UserModel.create({_id: res.id})
						await user.SetString('email', res.email)
						await user.SetString('name', res.name)
					}
					req.context.user = user
					return next()
				}
			})
		}
	}
}
