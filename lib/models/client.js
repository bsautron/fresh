import mongoose from 'mongoose';
import config from '../config';

const ClientShema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  key: {type: String, required: true, unique: true}, // Oauth2
  secret: {type: String, required: true}, // Oauth2 -> hash them
  user_id: {type: String, required: true},
}, {timestamps: true});

ClientShema.statics.getInfos = function(client) {
  return {
    name: client.name,
    key: client.key,
    user_id: client.user_id
  };
}

export default mongoose.model('Client', ClientShema);
