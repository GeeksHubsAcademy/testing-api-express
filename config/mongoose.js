const mongoose = require('mongoose');

const db =
  process.env.NODE_ENV === 'test' ? 'movies-avantio-test' : 'movies-avantio';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/' + db, {
  useNewUrlParser: true,
});

module.exports = mongoose;
