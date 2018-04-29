const express = require('express'),
  contactRouter = express.Router(),
  Controller = require('./contact-controller'),
  upload = require('../multer-gridfs')

const ctrl = new Controller();

module.exports = contactRouter
  .get('/', ctrl.getMany.bind(ctrl))
  .post('/', ctrl.add.bind(ctrl))
  .get('/:id', ctrl.getOne.bind(ctrl))
  .put('/:id', ctrl.update.bind(ctrl))
  .delete('/:id', ctrl.remove.bind(ctrl))
