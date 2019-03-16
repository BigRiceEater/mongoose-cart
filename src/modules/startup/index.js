const dbStartup = require('./database');

module.exports = function() {
  dbStartup(
    {
      dbUser: 'root',
      dbPass: 'theworldisanoyster',
      mongoUrl: 'mongodb://localhost:27017/cart'
    },
    () => console.info('Mongo connection okay'),
    () => console.error('No Mongo connection')
  );
};
