const mg = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/file-upload';
module.exports = mg.connect(mongoUri)
  .then(() => console.log(`mongoose connected on: ${mongoUri}`),
    err => console.log(`mongoose connection error: ${mongoUri}`, err));
