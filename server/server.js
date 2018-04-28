

const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  multer = require('multer'),
  morgan = require('morgan'),
  router = require('router');


const app = require('express');
app.use('/api/file', fileRouter);


