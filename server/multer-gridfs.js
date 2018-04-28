const mg = require('mongoose'),
  mgConn = require('./mongoose-conn'),
  multer = require('multer'),
  multerGridFsStorage = require('multer-gridfs-storage');

const db = new Promise((resolve, reject) => {
  mgConn.then(() => {
    resolve(mg.connection.db);
  }, err => reject(err))
});

const storage = multerGridFsStorage({
  db: db,
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
  /*
    metadata: (req, file, cb) => {
      cb(null, {
        fileName: file.originalname,
        mimetype: file.mimetype,
        uploadType: req.body.uploadType
      });
    }
  */
});
const upload = multer({
  storage, limits: {
    fileSize: 500000000, //500mb should do it
    files: 100
  }
});
module.exports = upload;
