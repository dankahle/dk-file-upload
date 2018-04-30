const config = require('./config.json'),
  mg = require('mongoose'),
  dbPromise = require('./mongoose-conn'),
  multer = require('multer'),
  multerGridFsStorage = require('multer-gridfs-storage'),
  ApiError = require('./api-error');


const storage = multerGridFsStorage({
  db: dbPromise,
  file: (req, file) => {
    const metadata = {
      userId: req.user.userName,
      fileName: file.originalname
    }
    // in form-then-upload, we do the form in json like normal, then call upload with metadata in body
    // in upload-then-form, all come up in formdata at once, in that scenario, we don't want the entire form contents
    // going into metadata, but it's name/value, so can't just pass metadata:object right? value needs to be simple type?
    // in that mind, req.body.metadata won't work, but we'd need a solution there. Solution is: do form then upload separate, then
    // can pass in all the metadata you want in the body via fileService.upload(files, metadata) call
    // todo: need a solution for upload-then-form for metadata passing, this (below) won't work for name/value we need name/object which
    // can't happen. Maybe json.stringify the object in that case?
    let obj;
    if (req.body.metadata && typeof req.body.metadata === 'string') {
      try {
        obj = JSON.parse(req.body.metadata);
      } catch (e) {
        throw new ApiError('Failed to parse file upload metadata', e, 400);
      }
    } else {
      obj = req.body || {};
    }
    const rtn = Object.assign(metadata, obj);
    return {metadata: rtn};
  }
});
const upload = multer({
  storage, limits: {
    fileSize: config.fileSizeMax,
    files: config.fileCountMax
  }
});
module.exports = upload;
