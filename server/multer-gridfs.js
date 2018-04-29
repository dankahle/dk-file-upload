const mg = require('mongoose'),
  dbPromise = require('./mongoose-conn'),
  multer = require('multer'),
  multerGridFsStorage = require('multer-gridfs-storage');


const storage = multerGridFsStorage({
  db: dbPromise,
  file: (req, file) => {
    const a =  {
      filename: file.originalname,
      metadata: {
        userId: req.user.userName,
        directory: req.body.fileUploadDirectory
      }
    };
    return a;
  }
});
const upload = multer({
  storage, limits: {
    fileSize: 500000000, //500mb should do it
    files: 100
  }
});
module.exports = upload;
