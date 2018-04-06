const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//  POST todos: Create new todo in DB
app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
  });
  todo.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(400).send(err));
});

//  GET todos: List all todos
app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => res.send({ todos }))
    .catch(err => res.status(400).send(err));
});

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});

module.exports = { app };
