exports.resolver = {
	Query: {
		GetString (root, {key}, context) {
			return context.user.GetString(key)
		},
		GetInt (root, {key}, context) {
			return context.user.GetInt(key)
		},
		GetBool (root, {key}, context) {
			return context.user.GetBool(key)
		},
		GetFloat (root, {key}, context) {
			return context.user.GetFloat(key)
		}
	},
	Mutation: {
		SetString (root, {key, value}, context) {
			return context.user.SetString(key, value)
		},
		SetInt (root, {key, value}, context) {
			return context.user.SetInt(key, value)
		},
		SetBool (root, {key, value}, context) {
			return context.user.SetBool(key, value)
		},
		SetFloat (root, {key, value}, context) {
			return context.user.SetFloat(key, value)
		}
	}
}
