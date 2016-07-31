import mongoose from 'mongoose';

const validators = {
	password(password) {
		return password.length >= 4
		&& password.length <= 12;
	}
};

const UserSchema = new mongoose.Schema({
	email: 		{type: String, required: true, select: true, lowercase: true, unique: true, trim: true},
	username: {type: String, required: true, select: true, lowercase: true, unique: true, trim: true},
	password: {type: String, required: true, select: false, validate: validators.password},
	age: 			{type: Number, required: true, select: true, min: 18, max: 100},
	role: 		{type: String, required: true, select: true, enum: ['client', 'admin']}
});

export default mongoose.model('User', UserSchema);
