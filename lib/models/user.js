import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true, required: true},
  password: {type: String, required: true},
  role: {type: String, enum: ['client', 'manager', 'admin'], default: 'client'},
}, {timestamps: true});

/* keep 'function(next) - not an arrow function' */
UserSchema.pre('save', function(next) {
  console.log(this);
  if (this.isModified('password') || this.isNew) {
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      return next();
    });
  } else return next();
});

UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default mongoose.model('User', UserSchema);
