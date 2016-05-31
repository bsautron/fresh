import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  email: {type: String, lowercase: true, unique: true, required: true},
  username: {type: String, lowercase: true, unique: true, required: true},
  password: {type: String, required: true},
  role: {type: String, enum: ['client', 'manager', 'admin'], default: 'client'},
}, {timestamps: true});

/* keep 'function(next) - not an arrow function' */
UserSchema.pre('save', function(next) {
  // if (this.isModified('password') || this.isNew) {
    next();
    // bcrypt.hash(this.password, 10, (err, hash) => {
    //   if (err) return next(err);
    //   this.password = hash;
    //   next();
    // });
  // } else next();
});

UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default mongoose.model('User', UserSchema);
