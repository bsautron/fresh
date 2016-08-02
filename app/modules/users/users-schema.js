import mongoose from 'mongoose';
import * as Acl from '../acl/acl-service';
import ApiError from '../../utils/errors/api-error';
import bcrypt from 'bcrypt';

const validators = {
	password(password) {
		return password.length >= 4
		&& password.length <= 12;
	}
};

const UserSchema = new mongoose.Schema({
	email: 		{type: String, required: true, select: true, lowercase: true, unique: true, trim: true},
	username: {type: String, required: true, select: true, lowercase: true, unique: true, trim: true},
	password: {type: String, required: true, select: true, validate: validators.password}, // TODO: select false
	age: 			{type: Number, required: true, select: true, min: 18, max: 100},
	role: 		{type: String, required: true, select: true, enum: Acl.roles, default: 'member'}
}, {timestamps: true});


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

UserSchema.post('findOne', (user, next) => {
	next((!user) ? new ApiError('user-not-found') : null);
});

UserSchema.statics.front = function(user) {
	return {
		id: user._id,
		username: user.username,
		email: user.email,
		age: user.age,
		role: user.role,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt
	};
};

UserSchema.methods.verifyPassword = function(password) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, this.password, (err, isMatch) => {
			if (err) reject(err);
			else resolve(isMatch);
		});
	});
};

export default mongoose.model('User', UserSchema);
