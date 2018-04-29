const express = require('express'),
  fileRouter = express.Router(),
  Controller = require('./file-controller'),
  upload = require('../multer-gridfs')

const ctrl = new Controller();

module.exports = fileRouter
  .get('/', ctrl.getMany.bind(ctrl))
  .post('/', upload.single('fileUploadField'), ctrl.add.bind(ctrl))
  .get('/:id', ctrl.getOne.bind(ctrl))
  .put('/:id', ctrl.update.bind(ctrl))
  .delete('/:id', ctrl.remove.bind(ctrl))
