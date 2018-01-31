"use strict";

exports.resolver = {
	Query: {
		GetString: function GetString(root, args, context) {
			return context.user.GetString(args.key);
		},
		GetInt: function GetInt(root, args, context) {
			return context.user.GetInt(args.key);
		},
		GetBool: function GetBool(root, args, context) {
			return context.user.GetBool(args.key);
		},
		GetFloat: function GetFloat(root, args, context) {
			return context.user.GetFloat(args.key);
		}
	},
	Mutation: {
		SetString: function SetString(root, args, context) {
			return context.user.SetString(args.key, args.value);
		},
		SetInt: function SetInt(root, args, context) {
			return context.user.SetInt(args.key, args.value);
		},
		SetBool: function SetBool(root, args, context) {
			return context.user.SetBool(args.key, args.value);
		},
		SetFloat: function SetFloat(root, args, context) {
			return context.user.SetFloat(args.key, args.value);
		}
	}
};