import mongoose from 'mongoose';
import config from '../config';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  email: {type: String, lowercase: true, unique: true, required: true},
  username: {type: String, lowercase: true, unique: true, required: true},
  password: {type: String, required: true},
  role: {type: String, enum: ['client', 'manager', 'admin'], default: 'client'},
}, {timestamps: true});

/* keep 'function(next) - not an arrow function' */
UserSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  } else next();
});

UserSchema.methods.comparePassword = function(pw) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pw, this.password, (err, isMatch) => {
      if (err) reject(err);
      if (!isMatch) reject('Unauthorized');
      else resolve();
    });
  });
};

UserSchema.statics.getInfos = function(user) {
  return {
    id: user._id,
    link: `${config['api-path']}/user/${user._id}`,
    username: user.username,
    role: user.role,
    email: user.email,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt
  };
}

export default mongoose.model('User', UserSchema);
