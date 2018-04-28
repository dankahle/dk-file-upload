const express = require('express'),
  router = express.Router(),
  Controller = require('./controller'),
  upload = require('./multer-gridfs')

const ctrl = new Controller();

module.exports = router
  .get('/', ctrl.getMany.bind(ctrl))
  .post('/', upload.single('fileUploadField'), ctrl.add.bind(ctrl))
  .get('/:id', ctrl.getOne.bind(ctrl))
  .put('/:id', ctrl.update.bind(ctrl))
  .delete('/:id', ctrl.remove.bind(ctrl))
