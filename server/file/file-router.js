const express = require('express'),
  fileRouter = express.Router(),
  Controller = require('./file-controller'),
  upload = require('../multer-gridfs')

const ctrl = new Controller();

module.exports = fileRouter
  // fileInfo handlers
  .get('/info', ctrl.getInfoMany.bind(ctrl))
  .get('/info/:id', ctrl.getInfoOne.bind(ctrl))

  // file handlers
  .delete('/:id', ctrl.remove.bind(ctrl))
  .get('/:id', ctrl.download.bind(ctrl))
  .post('/multiple', upload.array('fileUploadField'), ctrl.uploadMany.bind(ctrl))
  .post('/single', upload.single('fileUploadField'), ctrl.uploadOne.bind(ctrl))
