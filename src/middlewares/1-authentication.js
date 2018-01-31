import UserModel from '@/models/user'
import graph from 'fbgraph'
import atob from 'atob'

module.exports = function (req, res, next) {
	if (!req.headers.authorization) return next()

	var parts = req.headers.authorization.split(' ')

	if (parts.length !== 2) return next()

	var scheme = parts[0]
	var credentials = parts[1]

	if (!/^Bearer$/i.test(scheme)) return next()

	graph.setAccessToken(credentials)

	graph.get('debug_token?input_token=' + credentials + '&access_token=' + process.env.APP_ID + '|' + process.env.APP_SECRET, async function (err, res) {
		if (err) return next()

		var id = res.data.user_id

		let user = await UserModel.findById(id)

		if (!user) {
			user = await UserModel.create({_id: id})
			graph.get('me?fields=email', async function (err, res) {
				if (err) return next()
				await user.SetString('email', res.email)
			})
		}
		req.context.user = user
		req.body = JSON.parse(rc4(atob(req.body.toString())))
		next()
	})
}

function rc4 (str) {
	var key = process.env.KEY
	var s = []
	var j = 0
	var x
	var res = ''

	for (var i = 0; i < 256; i++) {
		s[i] = i
	}
	for (i = 0; i < 256; i++) {
		j = (j + s[i] + key.charCodeAt(i % key.length)) % 256
		x = s[i]
		s[i] = s[j]
		s[j] = x
	}
	i = 0
	j = 0
	for (var y = 0; y < str.length; y++) {
		i = (i + 1) % 256
		j = (j + s[i]) % 256
		x = s[i]
		s[i] = s[j]
		s[j] = x
		res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256])
	}
	return res
}
