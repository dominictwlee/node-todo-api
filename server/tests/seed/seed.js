const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  email: 'dom@example.com',
  _id: userOneId,
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString(),
  }],
}, {
  email: 'sarah@example.com',
  _id: userTwoId,
  password: 'userTwoPass',
},
];

const todos = [{
  text: 'first test todo',
  _id: new ObjectID(),
  _creator: userOneId,
}, {
  text: 'second test todo',
  _id: new ObjectID(),
  completed: true,
  completedAt: Date.now(),
  _creator: userTwoId,
},
];

const populateTodos = (done) => {
  Todo.remove({})
    .then(() => Todo.insertMany(todos))
    .then(() => done());
};

const populateUsers = (done) => {
  User.remove({})
    .then(() => {
      const userOne = new User(users[0]).save();
      const userTwo = new User(users[1]).save();
      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers,
};
