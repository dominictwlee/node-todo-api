const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: 'String',
    required: true,
    validate: {
      validator: function emailValidate(value) {
        return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
      },
      message: '{VALUE} is not a valid email!',
    },
  },
});

const User = mongoose.model('user', userSchema);

module.exports = { User };
