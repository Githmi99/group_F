const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://tharushi:Tharushi123@stock0.amvvjur.mongodb.net/?retryWrites=true&w=majority&appName=Stock0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

module.exports = db;
