import mongoose from 'mongoose'

// Schema defines how the user data will be stored in MongoDB
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

UserSchema.statics.FindUserByFacebookId = async function (fbid, appid) {
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

UserSchema.methods.SetString = async function (key, value) {
	const entry = this.strings.id(key)

	if (entry) {
		entry.value = value
	} else {
		this.strings.push({_id: key, value: value})
	}

	return save(this)
}

UserSchema.methods.GetString = function (key) {
	const entry = this.strings.id(key)

	return entry ? entry.value : ''
}

UserSchema.methods.SetInt = async function (key, value) {
	const entry = this.integers.id(key)

	if (entry) {
		entry.value = value
	} else {
		this.integers.push({_id: key, value: value})
	}

	return save(this)
}

UserSchema.methods.GetInt = function (key) {
	const entry = this.integers.id(key)
	return entry ? entry.value : 0
}

UserSchema.methods.SetBool = async function (key, value) {
	const entry = this.booleans.id(key)

	if (entry) {
		entry.value = value
	} else {
		this.booleans.push({_id: key, value: value})
	}

	return save(this)
}

UserSchema.methods.GetBool = function (key) {
	const entry = this.booleans.id(key)

	return entry ? entry.value : false
}

UserSchema.methods.SetFloat = async function (key, value) {
	const entry = this.floats.id(key)

	if (entry) {
		entry.value = value
	} else {
		this.floats.push({_id: key, value: value})
	}

	return save(this)
}

UserSchema.methods.GetFloat = function (key) {
	const entry = this.floats.id(key)

	return entry ? entry.value : 0
}

UserSchema.methods.GetLeaderboard = async function (top, key) {
	top = top < 100 && top > 0 ? top : 100
	try {
		var results = await this.model('User').aggregate([
			{$match: {'appid': this.appid}},
			{$project: {score: '$integers', id: '$fbid'}},
			{$unwind: '$score'},
			{$match: {'score._id': key}},
			{$sort: {'score.value': -1}},
			{$project: {'score': '$score.value', 'id': 1, '_id': 0}}
		]).cache()
	} catch (err) {
		return err
	}

	results.position = results.map((entry) => entry.id).indexOf(this.fbid) + 1
	results.score = results[results.position - 1].score
	results.leaderboard = results.slice(0, top)

	return results
}

async function save (user) {
	try {
		await user.save()
		return true
	} catch (err) {
		return false
	}
}

// Export the model
module.exports = mongoose.model('User', UserSchema)
