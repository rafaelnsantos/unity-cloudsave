// import interceptor from 'express-interceptor'
// import btoa from 'btoa'
// import rc4 from '@/utils/rc4'
//
// module.exports = interceptor((req, res) => {
// 	return {
// 		isInterceptable: () => {
// 			return req.headers.authorization && process.env.SECURE === 'true'
// 		},
// 		intercept: (body, send) => {
// 			send(btoa(rc4(body, req.headers.appid)))
// 		}
// 	}
// })
