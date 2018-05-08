const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

UserSchema.statics.findByCredentials = function validateHash(email, password) {
  const User = this;
  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user);
          } else {
            reject();
          }
        });
      });
    });
};

UserSchema.methods.generateAuthToken = function generateToken() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({
    _id: user._id.toHexString(),
    access,
  }, process.env.JWT_SECRET).toString();
  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(() => token);
};

UserSchema.statics.findByToken = function findUserByToken(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
};

UserSchema.methods.removeToken = function removeTokenFromUser(token) {
  const user = this;
  return user.update({
    $pull: {
      tokens: { token },
    },
  });
};

UserSchema.pre('save', function hashPass(next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.hash(user.password, 10, (err, hash) => {
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = { User };
