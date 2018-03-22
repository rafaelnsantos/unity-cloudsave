import atob from 'atob'
import rc4 from '@/utils/rc4'

module.exports = (req, res, next) => {
	if (!req.headers.authorization) return next()

	req.body = JSON.parse(process.env.SECURE === 'true' ? rc4(atob(req.body.toString()), req.headers.appid) : req.body.toString())

	next()
}
