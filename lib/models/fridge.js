import mongoose from 'mongoose';

const FridgeSchema = new mongoose.Schema({
  user_id: {type: Number, required: true},
  size_max: {type: Number, default: 100}
}, {timestamps: true});


export default mongoose.model('Fridge', FridgeSchema);
