

const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  multer = require('multer'),
  morgan = require('morgan'),
  router = require('router');

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

const mongoUri = 'mongodb://localhost:27017/file-upload';
mongoose.connect(config.mongoUri)
  .then(() => console.log(`mongoose connected on: ${mongoUri}`),
    err => console.log(`mongoose connection error: ${config.mongoUri}`, err));



const app = require('express');
app.use(bodyParser.json());


app.use('/api/contacts', fileRouter);


