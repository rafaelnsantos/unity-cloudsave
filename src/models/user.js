import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	fbid: {
		type: String,
		required: true,
		index: true,
		unique: true
	},
	appid: {
		type: String,
		required: true
	},
	strings: [{
		_id: {
			type: String,
			index: true,
			required: true
		},
		value: {
			type: String,
			required: true
		}
	}],
	integers: [{
		_id: {
			type: String,
			index: true,
			required: true
		},
		value: {
			type: Number,
			required: true
		}
	}],
	booleans: [{
		_id: {
			type: String,
			index: true,
			required: true
		},
		value: {
			type: Boolean,
			required: true
		}
	}],
	floats: [{
		_id: {
			type: String,
			index: true,
			required: true
		},
		value: {
			type: Number,
			required: true
		}
	}]
}, {
	timestamps: true
})

UserSchema.statics.FindOrCreateUser = async function (fbid, appid) {
	try {
		let user = await this.findOne({fbid: fbid})

		if (!user) {
			user = await this.create({fbid: fbid, appid: appid})
		}

		return user
	} catch (err) {
		return err
	}
}

UserSchema.methods.UpsertString = async function (key, value) {
	try {
		this.strings.id(key).value = value
	} catch (err) {
		this.strings.push({_id: key, value: value})
	}
}

UserSchema.methods.UpsertInt = async function (key, value) {
	try {
		this.integers.id(key).value = value
	} catch (err) {
		this.integers.push({_id: key, value: value})
	}
}

UserSchema.methods.UpsertBool = async function (key, value) {
	try {
		this.booleans.id(key).value = value
	} catch (err) {
		this.booleans.push({_id: key, value: value})
	}
}

UserSchema.methods.UpsertFloat = async function (key, value) {
	try {
		this.floats.id(key).value = value
	} catch (err) {
		this.floats.push({_id: key, value: value})
	}
}

UserSchema.methods.GetState = function () {
	return {integers: this.integers, floats: this.floats, strings: this.strings, booleans: this.booleans}
}
module.exports = mongoose.model('User', UserSchema)
