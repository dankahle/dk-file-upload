const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  router = require('./router'),
  mg = require('mongoose');

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

const mongoUri = 'mongodb://localhost:27017/file-upload';
mg.connect(mongoUri)
  .then(() => console.log(`mongoose connected on: ${mongoUri}`),
    err => console.log(`mongoose connection error: ${mongoUri}`, err));


const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());



app.use('/api/contact', router);

const port = 3005;
app.listen(port, () => console.log(`listening on port: ${port}`))


