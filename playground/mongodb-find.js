const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  };

  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5ac6279e3da6d43c71de0da6')
  // }).toArray()
  //   .then(docs => {
  //     console.log('Todos');
  //     console.log(JSON.stringify(docs, null, 2));
  //   })
  //   .catch(err => console.log('Unable to fetch todos', err));

  // db.collection('Todos').find().count()
  //   .then(count => {
  //     console.log(`Todos: ${count}`);
  //   })
  //   .catch(err => console.log('Unable to fetch todos', err));

  db.collection('Users').find({ name: 'Dom Lee' }).toArray()
    .then(userList => {
      console.log('USERS');
      console.log(JSON.stringify(userList, null, 2));
    })
    .catch(err => console.log('Can\'t find user'));
});
