const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  };

  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  //  deleteMany
  // db.collection('Todos').deleteMany({ text: 'Eat lunch' })
  //   .then((result) => {
  //     console.log(result);
  //   })
  //  deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'})
  //   .then((result) => {
  //     console.log(result.result);
  //   });
  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({ completed: false })
  //   .then((result) => {
  //     console.log(result);
  //   })
  //
  // db.collection('Users').deleteMany({ name: 'Dom Lee' })
  // .then((result) => {
  //   console.log(result.result);
  // })

  db.collection('Users').deleteMany({
     _id: new ObjectID('5ac62f2a48061e4210f7fb13')
   })
  .then(result => console.log(result));
  //db.close();
});
