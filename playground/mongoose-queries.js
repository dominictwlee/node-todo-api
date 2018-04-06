const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

const { ObjectID } = require('mongodb');

const id = '5ac74e21115fb630056da180';

User.findById(id)
  .then((user) => {
    if (!user) {
      return console.log('User not found');
    }
    console.log(JSON.stringify(user, null, 2));
  })
  .catch(() => console.log('ID is invalid'))
// Todo.find({
//   _id: id,
// })
//   .then(todos => console.log('Todos:', todos));
//
// Todo.findOne({
//   _id: id,
// })
//   .then(todo => console.log('Todos:', todo));

// Todo.findById(id)
//   .then((todo) => {
//     if (!todo) {
//       return console.log('ID not found');
//     }
//     console.log('Todo by ID', todo);
//   })
//   .catch(err => console.log(err));
