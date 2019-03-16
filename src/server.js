const express = require('express');
const app = express();
const port = 9000;

const startup = require('./modules/startup/index');
startup();

const ApiRouter = require('./api/router');
app.use('/api', ApiRouter);

app.get('/', (req, res) => {
  res.send('Express is alive');
});

app.listen(port, () => console.log('Server now listening on port', port));
