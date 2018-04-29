const ApiError = require('../api-error'),
  Repo = require('./file-repo'),
  schema = {},
  mg = require('mongoose'),
  dbPromise = require('../mongoose-conn'),
  Grid = require('gridfs-stream');

module.exports = class FileController {

  constructor(repo, schema) {
    this.repo = new Repo();
    this.schema = schema;
  }

  // file info gets
  getInfoMany(req, res, next) {
    if (!req.query.directory) {
      throw new ApiError('Directory required.', null, 400);
    }
    this.repo.getMany(req.body)
      .then(rules => res.send(rules))
      .catch(next);
  }

  getInfoOne(req, res, next) {
    this.repo.getOne(req.params.id)
      .then(item => {
        if (item) {
          res.send(item);
        } else {
          res.status(404).end();
        }
      })
      .catch(next)
  }

  // file upload/download/remove
  // upload/download
  download(req, res, next) {
    dbPromise.then(db => {
      var gfs = Grid(db, mg.mongo);
      gfs.findOne({_id: req.params.id}, function (err, file) {
        if (err) {
          return res.status(400).send(err);
        }
        else if (!file) {
          return res.status(404).send('Error on the database looking for the file.');
        }

        res.set('Content-Type', file.contentType);
        res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');

        var readstream = gfs.createReadStream({
          _id: req.params.id
        });

        readstream.on("error", function (err) {
          res.end();
        });
        readstream.pipe(res);
      });
    });
  }

  uploadMany(req, res, next) {
    return this.repo.getManyIds(req.files.map(file => file.id), req.body)
      .then(files => res.send(files))
      .catch(next);
  }

  uploadOne(req, res, next) {
    return this.repo.getOne(req.file.id)
      .then(file => res.send(file))
      .catch(next);
  }

  remove(req, res, next) {
    this.repo.getOne(req.params.id)
      .then(fileInfo => {
        dbPromise.then(db => {
          const gfs = Grid(db, mg.mongo);
          gfs.remove({_id: req.params.id}, function (err, gridStore) {
            if (err) {
              throw (err);
            }
            res.send(fileInfo);
          });
        });
      })
      .catch(next);
  }


}

