import mongoose from 'mongoose'

// Schema defines how the user data will be stored in MongoDB
var UserSchema = new mongoose.Schema({
	_id: {
		type: String,
		unique: true,
		index: true
	},
	strings: [{
		_id: {
			type: String,
			unique: true,
			index: true,
			required: true
		},
		value: String
	}],
	integers: [{
		_id: {
			type: String,
			unique: true,
			index: true,
			required: true
		},
		value: Number
	}],
	booleans: [{
		_id: {
			type: String,
			unique: true,
			index: true,
			required: true
		},
		value: Boolean
	}],
	floats: [{
		_id: {
			type: String,
			unique: true,
			index: true,
			required: true
		},
		value: Number
	}]
}, {
	timestamps: true
})

UserSchema.methods.SetString = async function (key, value) {
	var entry = this.strings.id(key)

	if (entry) {
		entry.value = value
	} else {
		this.strings.push({_id: key, value: value})
	}

	await this.save()
	return value
}

UserSchema.methods.GetString = function (key) {
	var entry = this.strings.id(key)

	return entry ? entry.value : ''
}

UserSchema.methods.SetInt = async function (key, value) {
	var entry = this.integers.id(key)

	if (entry) {
		entry.value = value
	} else {
		this.integers.push({_id: key, value: value})
	}

	await this.save()
	return value
}

UserSchema.methods.GetInt = function (key) {
	var entry = this.integers.id(key)

	return entry ? entry.value : 0
}

UserSchema.methods.SetBool = async function (key, value) {
	var entry = this.booleans.id(key)

	if (entry) {
		entry.value = value
	} else {
		this.booleans.push({key: key, value: value})
	}

	await this.save()
	return value
}

UserSchema.methods.GetBool = function (key) {
	var entry = this.booleans.id(key)

	return entry ? entry.value : false
}

UserSchema.methods.SetFloat = async function (key, value) {
	var entry = this.floats.id(key)

	if (entry) {
		entry.value = value
	} else {
		this.floats.push({key: key, value: value})
	}

	await this.save()
	return value
}

UserSchema.methods.GetFloat = function (key) {
	var entry = this.floats.id(key)

	return entry ? entry.value : 0
}

UserSchema.statics.GetLeaderboard = async function (top, key) {
	top = top < 100 && top > 0 ? top : 100

	var users = await this.aggregate([
		{$project: {user: '$$ROOT', sortfield: '$integers'}},
		{$unwind: '$sortfield'},
		{$match: {'sortfield._id': key}},
		{$sort: {'sortfield.value': -1}},
		{$limit: top},
		{$project: {user: 1}}
	]).cache()

	var scores = []
	users.map(async (obj) => {
		let user = this(obj.user)
		scores.push({
			score: user.GetInt(key),
			user: user
		})
	})

	return scores
}
// Export the model
module.exports = mongoose.model('User', UserSchema)
