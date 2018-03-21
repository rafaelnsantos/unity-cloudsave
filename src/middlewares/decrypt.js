import atob from 'atob'
import rc4 from '@/utils/rc4'

module.exports = (req, res, next) => {
	if (!req.headers.authorization) return next()

	req.body = process.env.SECURE === 'true' ? JSON.parse(rc4(atob(req.body.toString()), req.headers.appid)) : JSON.parse(req.body.toString())

	next()
}
