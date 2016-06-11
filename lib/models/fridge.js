import mongoose from 'mongoose';

const FridgeSchema = new mongoose.Schema({
  name: {type: String, required: true},
  user_id: {type: String, required: true},
  capacity: {type: Number, default: 100}
}, {timestamps: true});

FridgeSchema.statics.getInfos = function(fridge) {
  return {
    id: fridge._id,
    name: fridge.name,
    user_id: fridge.user_id,
    capacity: fridge.capacity,
    createdAt: fridge.createdAt,
    updatedAt: fridge.updatedAt
  };
}

export default mongoose.model('Fridge', FridgeSchema);
