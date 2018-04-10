const validator = require('validator');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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

const User = mongoose.model('user', userSchema);

module.exports = { User };
