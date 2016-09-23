import mongoose from 'mongoose';
import * as Acl from '../acl/acl-service';
import ApiError from '../../utils/errors/api-error';
import bcrypt from 'bcrypt';
import async from 'async';

const validators = {
	password: (password) => password.length >= 4 && password.length <= 12
};

const emailRange = getRangeString(5, 255);
const usernameRange = getRangeString(3, 12);

const UserSchema = new mongoose.Schema({
	email:		{type: String, required: true, select: true, lowercase: true, unique: true, trim: true, minlength: emailRange.min, maxlength: emailRange.max},
	username:	{type: String, required: true, select: true, lowercase: true, unique: true, trim: true, minlength: usernameRange.min, maxlength: usernameRange.max},
	password:	{type: String, required: true, select: false, validate: validators.password},
	age:		{type: Number, required: true, select: true, min: 18, max: 100},
	role:		{type: String, required: true, select: true, enum: Acl.roles, default: 'member'}
}, {timestamps: true, versionKey: false});


UserSchema.pre('save', function(next) {
	if (!this.isNew && !this.isModified('password')) return next();

	bcrypt.genSalt(5, (err, salt) => {
		if (err) return next(err);

		bcrypt.hash(this.password, 5, (err, hash) => {
			if (err) return next(err);

			this.password = hash;
			next();
		});
	});
});

UserSchema.post('findOne', (user, next) => next((!user)
	? new ApiError('user-not-found')
	: null
));

UserSchema.methods.verifyPassword = function(password) {
	return new Promise(
		(resolve, reject) => bcrypt.compare(password, this.password,
		(err, isMatch) => (err) ? reject(err) : resolve(isMatch))
	);
};

function getRangeString(min, max) {
	return {
		min: [min, 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'],
		max: [max, 'The value of path `{PATH}` (`{VALUE}`) exceeds the maximum allowed length ({MAXLENGTH}).'],
	};
}

export default mongoose.model('User', UserSchema);
