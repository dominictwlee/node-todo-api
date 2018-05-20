const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  _creator: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  stateId: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = { Todo };
