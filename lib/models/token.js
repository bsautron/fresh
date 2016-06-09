import mongoose from 'mongoose';

let TokenSchema = new mongoose.Schema({
  value: {type: String, required: true},
  user_id: {type: String, required: true},
  client_id: {type: String, required: true}
});

export default mongoose.model('Token', TokenSchema);
