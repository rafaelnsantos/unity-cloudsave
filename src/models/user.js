import mongoose from 'mongoose'

// Schema defines how the user data will be stored in MongoDB
var UserSchema = new mongoose.Schema({
	_id: {
		type: String,
		unique: true,
		index: true,
		required: true
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

	var results = await this.aggregate([
		{$project: {score: '$integers'}},
		{$unwind: '$score'},
		{$match: {'score._id': key}},
		{$sort: {'score.value': -1}},
		{$limit: top},
		{$project: {'score._id': 0}}
	]).cache()

	var scores = []
	results.map(score =>
		scores.push({
			score: score.score.value,
			user: this({_id: score._id})
		})
	)

	return scores
}
// Export the model
module.exports = mongoose.model('User', UserSchema)
