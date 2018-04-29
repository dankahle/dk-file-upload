const mg = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/file-upload';
const dbPromise = mg.connect(mongoUri)
  .then(() => {
      console.log(`mongoose connected on: ${mongoUri}`);
      return mg.connection.db;
    },
    err => console.log(`mongoose connection error: ${mongoUri}`, err));

module.exports = dbPromise;

