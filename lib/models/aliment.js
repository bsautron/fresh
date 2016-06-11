import mongoose from 'mongoose';

const AlimentSchema = new mongoose.Schema({
  fridge_id: {type: String, required: true},
  name: {type: String, required: true},
  quantity: {type: Number, default: 1},
  description: {type: String}
}, {timestamps: true});

export default mongoose.model('Aliment', AlimentSchema);
