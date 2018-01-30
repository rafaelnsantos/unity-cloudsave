exports.resolver = {
	User: {
		email (root) {
			return root.GetString('email')
		}
	}
}
