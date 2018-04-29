const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  contactRouter = require('./contact/contact-router'),
  fileRouter = require('./file/file-router'),
  mgConn = require('./mongoose-conn');


process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});


const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use((req,res,next) => {
  req.user = {userName: 'dank'};
  next();
})



app.use('/api/contact', contactRouter);
app.use('/api/file', fileRouter);

const port = 3005;
app.listen(port, () => console.log(`listening on port: ${port}`))


