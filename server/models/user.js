const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  email: {
    type: 'String',
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email!',
    },
  },
  password: {
    type: 'String',
    required: true,
    minlength: 8,
  },
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  }],
});

if (!UserSchema.options.toJSON) {
  UserSchema.options.toJSON = {};
}

UserSchema.options.toJSON.transform = function hideSensitiveUserInfo(doc, ret) {
  return {
    _id: ret._id,
    email: ret.email,
  };
};

UserSchema.methods.generateAuthToken = function generateToken() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();
  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(() => token);
};

UserSchema.statics.findByToken = function findUserByToken(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (err) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
};

const User = mongoose.model('user', UserSchema);

module.exports = { User };
