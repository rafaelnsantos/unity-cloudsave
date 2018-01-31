exports.resolver = {
	Query: {
		GetString (root, args, context) {
			return context.user.GetString(args.key)
		},
		GetInt (root, args, context) {
			return context.user.GetInt(args.key)
		},
		GetBool (root, args, context) {
			return context.user.GetBool(args.key)
		},
		GetFloat (root, args, context) {
			return context.user.GetFloat(args.key)
		}
	},
	Mutation: {
		SetString (root, args, context) {
			return context.user.SetString(args.key, args.value)
		},
		SetInt (root, args, context) {
			return context.user.SetInt(args.key, args.value)
		},
		SetBool (root, args, context) {
			return context.user.SetBool(args.key, args.value)
		},
		SetFloat (root, args, context) {
			return context.user.SetFloat(args.key, args.value)
		}
	}
}
