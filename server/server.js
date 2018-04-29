const config = require('./config.json'),
  express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  contactRouter = require('./contact/contact-router'),
  fileRouter = require('./file/file-router'),
  mgConn = require('./mongoose-conn'),
  fs = require('fs'),
  path = require('path');


process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});


const app = express();

// app.use(express.static('dist'));

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use((req,res,next) => {
  req.user = {userName: 'dank'};
  next();
})

app.use('/api/contact', contactRouter);
app.use('/api/file', fileRouter);

/*
app.get('/', function(req, res, next) {
  fs.readFile('dist/index.html', 'utf8', (err, text) => {
    if (err) {
      next(err);
    }
    res.send(text);
  });
})
*/

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err);
});


const port = process.env.PORT || config.port;
app.listen(port, () => console.log(`listening on port: ${port}`))


