const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  token: {
    type:String,
    required: false,
  }
});

UserSchema.pre('save', function(next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt
      .hash(user.password, 9)
      .then(hash => {
        user.password = hash;
        return next();
      })
      .catch(err => next(err));
  } else {
    next();
  }
});

const User = mongoose.model('Users', UserSchema);

module.exports = User;
