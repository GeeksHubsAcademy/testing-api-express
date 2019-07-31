const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const isEmail = require('validator/lib/isEmail');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    validate: (value) => isEmail(value)
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  token: {
    type: String,
    required: false,
  },
}, {timestamps: true});

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

UserSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

UserSchema.methods.createAndSaveJWT = async function() {
  const user = this;
  var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  user.token = token;
  await user.save();
  return user;
};

UserSchema.methods.deleteJWT = async function(token) {
  const user = this;
  if (user.token === token) {
    user.token = null;
    await user.save();
    return user;
  } else {
    throw 'not the same token';
  }
};
UserSchema.statics.isValidLogin = async function(email, password) {
  const UserModel = this;

  const userFound = await UserModel.findOne({ email });
  const isSamePassword = await bcrypt.compare(password, userFound.password);

  if (isSamePassword) {
    return userFound;
  } else {
    throw 'no valid password or email'
  }
};

const User = mongoose.model('Users', UserSchema);

module.exports = User;
