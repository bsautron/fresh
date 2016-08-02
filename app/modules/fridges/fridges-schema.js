import mongoose from 'mongoose';

const validators = {
	name(name) {
		return name.length >= 4
		&& name.length <= 24;
	}
};
const FridgeSchema = new mongoose.Schema({
	owner:		{type: String, required: true},
	name: 		{type: String, required: true, trim: true, validate: validators.name},
	capacity: {type: Number, required: true, min: 10, max: 1000, default: 100},
}, {timestamps: true});

export default mongoose.model('Fridge', FridgeSchema);
