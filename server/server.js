require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const path = require('path');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

//  POST todos: Create new todo in DB
app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({
    _creator: req.user._id,
    text: req.body.text,
    completed: req.body.completed,
    stateId: req.body.stateId,
  });
  todo.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err));
});

//  GET todos: List all todos
app.get('/todos', authenticate, (req, res) => {
  Todo.find({ _creator: req.user._id })
    .then(todos => res.send({ todos }))
    .catch(err => res.status(400).send(err));
});

//  GET todos: Query by ID
app.get('/todos/:id', authenticate, (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOne({ _id: id })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(err => res.status(400).send(err));
});

//  DELETE todos by ID
app.delete('/todos/:id', authenticate, (req, res) => {
  const { id } = req.params;

  Todo.findOneAndRemove({ stateId: id })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(err => res.status(400).send(err));
});

//  Patch todo by ID
app.patch('/todos/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  const body = (text === undefined) ? { completed } : { text, completed };

  if (typeof body.completed === 'boolean' && body.completed) {
    body.completedAt = Date.now();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findOneAndUpdate({ stateId: id, _creator: req.user._id }, { $set: body }, { new: true })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(err => res.status(400).send(err));
});

//  POST /users
app.post('/users', (req, res) => {
  const { email, password } = req.body;
  const body = { email, password };
  const user = new User(body);

  user.save()
    .then(() => user.generateAuthToken())
    .then(token => res.header('x-auth', token).send(user))
    .catch(err => res.status(400).send(err));
});

//  POST /users/login {email, password}

app.post('/users/login', (req, res) => {
  const { email, password } = req.body;
  User.findByCredentials(email, password)
    .then(user => user.generateAuthToken()
      .then(token => res.header('x-auth', token).send(user)))
    .catch(err => res.status(400).send(err));
});

//  DELETE /users/me/token
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});


//  Private GET Route
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});

module.exports = { app };
