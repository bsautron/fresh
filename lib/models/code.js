import mongoose from 'mongoose';

let CodeSchema = new mongoose.Schema({
  value: {type: String, required: true, unique: true},
  redirect_uri: {type: String, required: true},
  user_id: {type: String, required: true},
  client_id: {type: String, required: true}
});

export default mongoose.model('Code', CodeSchema);
