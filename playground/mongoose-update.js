const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

const { ObjectID } = require('mongodb');

User.findByIdAndUpdate('5ac74e21115fb630056da180', { text: 'dom@gmail.com' }, { new: true })
  .then(result => console.log(result))
  .catch(err => console.log(err));
