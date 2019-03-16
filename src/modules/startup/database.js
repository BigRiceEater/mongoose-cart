const mongoose = require('mongoose');

module.exports = function({ dbUser, dbPass, mongoUrl }, success, failure) {
  mongoose.Promise = global.Promise;

  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    auth: { authSource: 'admin' },
    user: dbUser,
    pass: dbPass
  });

  const db = mongoose.connection;
  db.on('error', failure);
  db.once('open', success);
};
