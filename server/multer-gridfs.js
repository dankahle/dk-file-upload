const config = require('./config.json'),
  mg = require('mongoose'),
  dbPromise = require('./mongoose-conn'),
  multer = require('multer'),
  multerGridFsStorage = require('multer-gridfs-storage');


const storage = multerGridFsStorage({
  db: dbPromise,
  file: (req, file) => {
    const a =  {
      filename: file.originalname,
      metadata: Object.assign({userId: req.user.userName}, req.body || {})// just toss in everythign they put in body
    };
    return a;
  }
});
const upload = multer({
  storage, limits: {
    fileSize: config.fileSizeMax,
    files: config.fileCountMax
  }
});
module.exports = upload;
