import jwt from 'jsonwebtoken'

exports.resolver = {
	Query: {
		login (db, {credentials}) {
			return db.model('Admin').login(credentials.email, credentials.password)
		}
	},
	Mutation: {
		async createUser (db, {credentials}) {
			try {
				const admin = await db.model('Admin').create(credentials)
				return jwt.sign(admin.toJSON(), process.env.SECRET)
			} catch (err) {
				return err
			}
		},
		changePassword (db, {oldPassword, newPassword}, {admin}) {
			return admin.changePassword(oldPassword, newPassword)
		}
	}
}
