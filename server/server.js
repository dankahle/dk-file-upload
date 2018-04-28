

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

// config data sources
mongoose.connect(config.mongoUri)
  .then(() => console.log(`mongoose connected on: ${config.mongoUri}`),
    err => console.log(`mongoose connection error: ${config.mongoUri}`, err));



const app = require('express');
app.use('/api/file', fileRouter);


